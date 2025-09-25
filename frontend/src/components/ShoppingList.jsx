import { useState, useEffect } from "react";
import { Plus, ShoppingCart, Search, Filter } from "lucide-react";
import { ShoppingItem } from "./ShoppingItem.jsx";
import { AddItemForm } from "./AddItemForm.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getItems, addItem, updateItem, deleteItem } from "../api";

const CATEGORIES = [
  "All",
  "Groceries",
  "Household",
  "Electronics",
  "Clothing",
  "Health & Beauty",
  "Other",
];

export const ShoppingList = () => {
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch items from API
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        const mapped = data.map((item) => ({
          ...item,
          completed: item.purchased || false,
        }));
        setItems(mapped);
      } catch (err) {
        toast.error("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  // Add new item
  const handleAddItem = async (newItem) => {
    try {
      const created = await addItem(newItem);
      setItems((prev) => [
        { ...created, completed: created.purchased || false },
        ...prev,
      ]);
      setShowAddForm(false);
      toast.success(`${created.name} added!`);
    } catch {
      toast.error("Failed to add item.");
    }
  };

  // Update item
  const handleUpdateItem = async (id, updates) => {
    try {
      const updated = await updateItem(id, updates);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id
            ? { ...item, ...updates, completed: updated.purchased }
            : item
        )
      );
    } catch {
      toast.error("Failed to update item.");
    }
  };

  // Delete item
  const handleDeleteItem = async (id) => {
    try {
      console.log(id);
      const deleted = await deleteItem(id);
      setItems((prev) => prev.filter((item) => item.id !== id));
      toast.info(deleted.message);
    } catch {
      toast.error("Failed to delete item.");
    }
  };

  // Toggle complete
  const handleToggleComplete = async (id) => {
    const item = items.find((i) => i.id === id);
    if (!item) return;

    try {
      const updated = await updateItem(id, { purchased: !item.completed });
      setItems((prev) =>
        prev.map((i) =>
          i.id === id
            ? {
                ...i,
                completed: updated.purchased,
                purchased: updated.purchased,
              }
            : i
        )
      );

      updated.purchased
        ? toast.success(`${updated.name} marked as completed!`)
        : toast.warning(`${updated.name} added back to list.`);
    } catch {
      toast.error("Failed to update item.");
    }
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const activeItems = filteredItems.filter((item) => !item.completed);
  const completedItems = filteredItems.filter((item) => item.completed);

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar
          theme="dark"
        />

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-yellow-400 rounded-2xl shadow-lg">
              <ShoppingCart className="h-8 w-8 text-gray-900" />
            </div>
            <h1 className="text-4xl font-bold text-yellow-400">
              Shopping List
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            {loading
              ? "Loading items..."
              : items.length === 0
              ? "Your shopping list is empty. Add your first item!"
              : `${completedItems.length} of ${items.length} items completed`}
          </p>
        </div>

        {/* Search + Filter */}
        <div className="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              >
                {CATEGORIES.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-gray-700"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Add Item Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 rounded-xl text-gray-900 font-semibold bg-yellow-400 hover:bg-yellow-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Plus className="h-5 w-5 mr-2 inline" />
            Add Item
          </button>
        </div>

        {/* Add Item Form */}
        {showAddForm && (
          <AddItemForm
            onAddItem={handleAddItem}
            onCancel={() => setShowAddForm(false)}
            categories={CATEGORIES.slice(1)}
          />
        )}

        {/* Items */}
        <div className="space-y-6">
          {activeItems.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-white">
                Shopping List ({activeItems.length})
              </h2>
              <div className="grid gap-3">
                {activeItems.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                    onToggleComplete={() => handleToggleComplete(item.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {completedItems.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold mb-4 text-gray-500">
                Completed ({completedItems.length})
              </h2>
              <div className="grid gap-3">
                {completedItems.map((item) => (
                  <ShoppingItem
                    key={item.id}
                    item={item}
                    onUpdate={handleUpdateItem}
                    onDelete={handleDeleteItem}
                    onToggleComplete={() => handleToggleComplete(item.id)}
                  />
                ))}
              </div>
            </div>
          )}

          {!loading && filteredItems.length === 0 && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-12 text-center">
              <div className="mb-6">
                <ShoppingCart className="h-16 w-16 mx-auto text-gray-600" />
              </div>
              <h3 className="text-xl font-medium text-gray-300 mb-2">
                Your shopping list is empty
              </h3>
              <p className="text-gray-500 mb-6">
                Add your first item to get started!
              </p>
              <button
                onClick={() => setShowAddForm(true)}
                className="px-6 py-3 rounded-xl text-gray-900 font-semibold bg-yellow-400 hover:bg-yellow-300 transition-all duration-200"
              >
                <Plus className="h-5 w-5 mr-2 inline" />
                Add Item
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
