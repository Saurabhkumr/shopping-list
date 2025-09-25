import { useState } from "react";
import { Check, CreditCard as Edit3, Trash2, Package } from "lucide-react";

export const ShoppingItem = ({
  item,
  onUpdate,
  onDelete,
  onToggleComplete,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(item.name);
  const [editQuantity, setEditQuantity] = useState(item.quantity.toString());
  const [editDescription, setEditDescription] = useState(
    item.description || ""
  );

  const handleSave = () => {
    if (editName.trim()) {
      onUpdate(item.id, {
        name: editName.trim(),
        quantity: parseInt(editQuantity) || 1,
        description: editDescription.trim() || undefined,
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditName(item.name);
    setEditQuantity(item.quantity.toString());
    setEditDescription(item.description || "");
    setIsEditing(false);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Groceries: "bg-green-900 text-green-300 border-green-700",
      Household: "bg-blue-900 text-blue-300 border-blue-700",
      Electronics: "bg-purple-900 text-purple-300 border-purple-700",
      Clothing: "bg-pink-900 text-pink-300 border-pink-700",
      "Health & Beauty": "bg-orange-900 text-orange-300 border-orange-700",
      Other: "bg-gray-700 text-gray-300 border-gray-600",
    };
    return colors[category] || colors["Other"];
  };

  return (
    <div
      className={`rounded-xl border border-gray-700 bg-gray-800 transition-all duration-300 ${
        item.completed
          ? "opacity-60 shadow-none"
          : "shadow-sm hover:shadow-md hover:border-gray-600"
      }`}
    >
      <div className="p-4">
        {isEditing ? (
          // Editing mode
          <div className="space-y-4">
            <div className="flex gap-2">
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Item name"
                autoFocus
                className="flex-1 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              />
              <input
                type="number"
                value={editQuantity}
                onChange={(e) => setEditQuantity(e.target.value)}
                placeholder="Qty"
                min="1"
                className="w-20 rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
              />
            </div>
            <input
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              placeholder="Description (optional)"
              className="w-full rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none"
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md border border-gray-600 px-3 py-1.5 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md bg-yellow-400 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-yellow-300 transition"
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          // Display mode
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <button
                type="button"
                onClick={() => onToggleComplete(item.id)}
                className={`flex items-center justify-center rounded-full w-8 h-8 border-2 transition-all duration-200 ${
                  item.completed
                    ? "bg-green-500 border-green-500 text-white hover:bg-green-600"
                    : "border-gray-600 hover:border-yellow-400 hover:bg-yellow-400/10"
                }`}
              >
                {item.completed && <Check className="h-4 w-4" />}
              </button>

              <div className="flex items-center gap-2 flex-1">
                <Package className="h-4 w-4 text-gray-500" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`font-medium ${
                        item.completed
                          ? "line-through text-gray-500"
                          : "text-white"
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                    {item.quantity > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-md border bg-gray-700 text-gray-300 border-gray-600">
                        {item.quantity}x
                      </span>
                    )}
                  </div>
                  {item.description && (
                    <p
                      className={`text-sm ${
                        item.completed ? "text-gray-500" : "text-gray-400"
                      }`}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="p-1 rounded-md hover:bg-gray-700 transition"
              >
                <Edit3 className="h-4 w-4 text-gray-400 hover:text-yellow-400" />
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="p-1 rounded-md  hover:bg-gray-700 transition"
              >
                <Trash2 className="h-4 w-4 text-gray-400  hover:text-red-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
