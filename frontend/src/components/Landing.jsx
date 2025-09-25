import React from "react";
import { ShoppingCart, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"></div>
        <div className="relative container mx-auto px-4 py-14 max-w-6xl">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="p-4 bg-yellow-400 rounded-3xl shadow-2xl">
                <ShoppingCart className="h-10 w-10 text-gray-900" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-yellow-400">
                Shopping List
              </h1>
            </div>

            {/* Hero Text */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              The smartest way to organize your shopping. Never forget an item
              again with our intuitive, feature-rich shopping list app.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
              <button
                onClick={() => navigate("/shoppinglist")}
                className="px-8 py-4 bg-yellow-400 text-gray-900 font-semibold rounded-xl hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-2"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Hero Image/Preview */}
            <div className="relative max-w-3xl mx-auto">
              <div className="bg-gray-800 rounded-2xl border border-gray-700 p-6 shadow-2xl">
                <div className="bg-gray-900 rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-yellow-400 rounded-lg">
                      <ShoppingCart className="h-6 w-6 text-gray-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-yellow-400">
                      Shopping List
                    </h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-gray-300 line-through">
                        Organic Bananas
                      </span>
                      <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                        Groceries
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                      <span className="text-white">Whole Wheat Bread</span>
                      <span className="text-xs px-2 py-1 bg-green-900 text-green-300 rounded">
                        Groceries
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                      <div className="w-6 h-6 border-2 border-gray-600 rounded-full"></div>
                      <span className="text-white">Laundry Detergent</span>
                      <span className="text-xs px-2 py-1 bg-blue-900 text-blue-300 rounded">
                        Household
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
