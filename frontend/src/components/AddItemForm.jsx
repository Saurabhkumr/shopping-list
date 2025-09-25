import { useState } from "react";
import { Plus, X } from "lucide-react";

export const AddItemForm = ({ onAddItem, onCancel, categories }) => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [category, setCategory] = useState(categories[0] || "Other");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    onAddItem({
      name: name.trim(),
      quantity: parseInt(quantity) || 1,
      category,
      description: description.trim() || undefined,
    });

    // Reset form
    setName("");
    setQuantity("1");
    setCategory(categories[0] || "Other");
    setDescription("");
  };

  return (
    <div className="mb-6 rounded-xl border border-gray-700 bg-gray-800 shadow-lg animate-in slide-in-from-top-4 duration-300">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        <h2 className="text-lg font-semibold flex items-center gap-2 text-white">
          <Plus className="h-5 w-5 text-yellow-400" />
          Add New Item
        </h2>
        <button
          type="button"
          onClick={onCancel}
          className="p-1 rounded-md hover:bg-gray-700 transition text-gray-400 hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {/* Item name + Quantity */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="sm:col-span-2">
            <label
              htmlFor="itemName"
              className="block text-sm font-medium text-gray-300"
            >
              Item Name *
            </label>
            <input
              id="itemName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Organic bananas"
              required
              autoFocus
              className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-300"
            >
              Quantity
            </label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-300"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat} className="bg-gray-700">
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-300"
          >
            Description (optional)
          </label>
          <input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g., Get the ripe ones"
            className="mt-1 w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 rounded-md border border-gray-600 px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="flex-1 flex items-center justify-center gap-2 rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="h-4 w-4" />
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
};
