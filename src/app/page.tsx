'use client';
import './globals.css';
import React, { useState } from 'react';

interface Category {
  name: string;
  expenses: number[];
}

function App() {
  const [exchangeRate, setExchangeRate] = useState<number>(4.97); // Default RON per EUR
  const [categories, setCategories] = useState<Category[]>([
    { name: 'Groceries', expenses: [] },
    { name: 'Eating Out', expenses: [] },
    { name: 'Transportation', expenses: [] },
    { name: 'Health', expenses: [] },
    { name: 'Utilities & Tax', expenses: [] },
    { name: 'Fun', expenses: [] },
    { name: 'Pers Dev', expenses: [] },
    { name: 'Gift', expenses: [] },
    { name: 'Subscriptions', expenses: [] },
    { name: 'Beauty', expenses: [] },
    { name: 'Travel', expenses: [] },
  ]);
  const [newCategoryName, setNewCategoryName] = useState<string>('');

  const addCategory = () => {
    if (newCategoryName.trim() === '') return;
    setCategories([...categories, { name: newCategoryName, expenses: [] }]);
    setNewCategoryName('');
  };

  const addExpense = (categoryIndex: number, amount: number) => {
    if (isNaN(amount) || amount <= 0) return;
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].expenses.push(amount);
    setCategories(updatedCategories);
  };

  const removeExpense = (categoryIndex: number, expenseIndex: number) => {
    const updatedCategories = [...categories];
    updatedCategories[categoryIndex].expenses.splice(expenseIndex, 1);
    setCategories(updatedCategories);
  };

  const removeCategory = (categoryIndex: number) => {
    const updatedCategories = categories.filter((_, index) => index !== categoryIndex);
    setCategories(updatedCategories);
  };

  const calculateCategorySumRON = (expenses: number[]): number => {
    return expenses.reduce((sum, exp) => sum + exp, 0);
  };

  const calculateCategorySumEUR = (sumRON: number): string => {
    return exchangeRate > 0 ? (sumRON / exchangeRate).toFixed(2) : '0.00';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-2xl rounded-2xl p-4">
        <h1 className="text-2xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Monthly Expenses Calculator
        </h1>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Exchange Rate (RON per EUR):
          </label>
          <input
            type="number"
            value={exchangeRate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setExchangeRate(parseFloat(e.target.value))
            }
            step="0.01"
            min="0"
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900"
          />
        </div>

        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-900 mb-1">
            Add New Category:
          </label>
          <div className="flex">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setNewCategoryName(e.target.value)
              }
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                  addCategory();
                }
              }}
              className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 text-gray-900"
            />
            <button
              onClick={addCategory}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Add
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-4 relative">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-gray-900">{category.name}</h3>
                <button
                  onClick={() => removeCategory(index)}
                  className="text-red-600 hover:text-red-800 transition duration-200 font-medium text-xs"
                >
                  X
                </button>
              </div>

              <div className="mb-2">
                <label className="block text-xs font-semibold text-gray-900 mb-1">
                  Add Expense (RON):
                </label>
                <div className="flex">
                  <input
                    type="number"
                    id={`expense-${index}`}
                    step="0.01"
                    min="0"
                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                      if (e.key === 'Enter') {
                        const input = e.target as HTMLInputElement;
                        const amount = parseFloat(input.value);
                        addExpense(index, amount);
                        input.value = '';
                      }
                    }}
                    className="flex-grow border border-gray-300 rounded-lg p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200 text-gray-900"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById(
                        `expense-${index}`
                      ) as HTMLInputElement | null;
                      if (input) {
                        const amount = parseFloat(input.value);
                        addExpense(index, amount);
                        input.value = '';
                      }
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-200 font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>

              <ul className="space-y-1 mb-2">
                {category.expenses.map((exp, expIndex) => (
                  <li
                    key={expIndex}
                    className="flex justify-between items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm text-sm"
                  >
                    <span className="text-gray-900">{exp.toFixed(2)} RON</span>
                    <button
                      onClick={() => removeExpense(index, expIndex)}
                      className="text-red-600 hover:text-red-800 transition duration-200 font-medium text-xs"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <p className="font-bold text-gray-900">
                  RON: {calculateCategorySumRON(category.expenses).toFixed(2)}
                </p>
                <p className="font-bold text-gray-900">
                  EUR: {calculateCategorySumEUR(calculateCategorySumRON(category.expenses))}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;