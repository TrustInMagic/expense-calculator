'use client';
import React, { useState } from 'react';

interface Category {
  name: string;
  expenses: number[];
}

function App() {
  const [exchangeRate, setExchangeRate] = useState<number>(4.97);
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

  const handleAddExpenseClick = (categoryIndex: number) => {
    const input = document.getElementById(`expense-${categoryIndex}`) as HTMLInputElement | null;
    const checkbox = document.getElementById(`split-${categoryIndex}`) as HTMLInputElement | null;

    if (!input) return;

    let amount = parseFloat(input.value);
    if (checkbox?.checked) {
      amount = amount / 2;
    }

    addExpense(categoryIndex, amount);
    input.value = '';
  };

  const handleExpenseKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    categoryIndex: number
  ) => {
    if (e.key === 'Enter') {
      handleAddExpenseClick(categoryIndex);
    }
  };

  const handleExchangeRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExchangeRate(parseFloat(e.target.value));
  };

  const handleNewCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewCategoryName(e.target.value);
  };

  const handleNewCategoryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addCategory();
    }
  };

  const calculateCategorySumRON = (expenses: number[]): number => {
    return expenses.reduce((sum, exp) => sum + exp, 0);
  };

  const calculateCategorySumEUR = (sumRON: number): string => {
    return exchangeRate > 0 ? (sumRON / exchangeRate).toFixed(2) : '0.00';
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #eff6ff, #f3f4f6)',
        padding: '1rem',
      }}
    >
      <div
        style={{
          maxWidth: '72rem',
          margin: '0 auto',
          background: 'white',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderRadius: '1rem',
          padding: '1rem',
        }}
      >
        <h1
          style={{
            fontSize: '1.5rem',
            fontWeight: '800',
            color: '#111827',
            marginBottom: '1rem',
            letterSpacing: '-0.025em',
          }}
        >
          Monthly Expenses Calculator
        </h1>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.25rem',
            }}
          >
            Exchange Rate (RON per EUR):
          </label>
          <input
            type="number"
            value={exchangeRate}
            onChange={handleExchangeRateChange}
            step="0.01"
            min="0"
            style={{
              width: '100%',
              border: '1px solid #d1d5db',
              borderRadius: '0.5rem',
              padding: '0.5rem',
              color: '#111827',
              outline: 'none',
            }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '0.25rem',
            }}
          >
            Add New Category:
          </label>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={newCategoryName}
              onChange={handleNewCategoryChange}
              onKeyDown={handleNewCategoryKeyDown}
              style={{
                flexGrow: 1,
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                padding: '0.5rem',
                marginRight: '0.5rem',
                color: '#111827',
                outline: 'none',
              }}
            />
            <button
              onClick={addCategory}
              style={{
                background: '#2563eb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer',
                fontWeight: '500',
              }}
            >
              Add
            </button>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              style={{
                background: '#f9fafb',
                border: '1px solid #e5e7eb',
                borderRadius: '0.75rem',
                padding: '1rem',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem',
                }}
              >
                <h3
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '700',
                    color: '#111827',
                  }}
                >
                  {category.name}
                </h3>
                <button
                  onClick={() => removeCategory(index)}
                  style={{
                    color: '#dc2626',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '0.75rem',
                  }}
                >
                  X
                </button>
              </div>

              <div style={{ marginBottom: '0.5rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.75rem',
                    fontWeight: '600',
                    color: '#111827',
                    marginBottom: '0.25rem',
                  }}
                >
                  Add Expense (RON):
                </label>
                <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
                  <input
                    type="number"
                    id={`expense-${index}`}
                    step="0.01"
                    min="0"
                    onKeyDown={e => handleExpenseKeyDown(e, index)}
                    style={{
                      flexGrow: 1,
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      marginRight: '0.5rem',
                      color: '#111827',
                      outline: 'none',
                    }}
                  />
                  <button
                    onClick={() => handleAddExpenseClick(index)}
                    style={{
                      background: '#16a34a',
                      color: 'white',
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '500',
                    }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <input
                    type="checkbox"
                    id={`split-${index}`}
                    style={{
                      marginRight: '0.5rem',
                      height: '1rem',
                      width: '1rem',
                      cursor: 'pointer',
                    }}
                  />
                  <label
                    htmlFor={`split-${index}`}
                    style={{
                      fontSize: '0.75rem',
                      color: '#111827',
                      cursor: 'pointer',
                    }}
                  >
                    Split (divide by 2)
                  </label>
                </div>
              </div>

              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 0.5rem 0',
                }}
              >
                {category.expenses.map((exp, expIndex) => (
                  <li
                    key={expIndex}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '0.5rem',
                      padding: '0.5rem',
                      boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
                      fontSize: '0.875rem',
                      marginBottom: '0.25rem',
                    }}
                  >
                    <span style={{ color: '#111827' }}>{exp.toFixed(2)} RON</span>
                    <button
                      onClick={() => removeExpense(index, expIndex)}
                      style={{
                        color: '#dc2626',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        fontWeight: '500',
                        fontSize: '0.75rem',
                      }}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                <p style={{ fontWeight: '700', color: '#111827', margin: 0 }}>
                  RON: {calculateCategorySumRON(category.expenses).toFixed(2)}
                </p>
                <p style={{ fontWeight: '700', color: '#111827', margin: 0 }}>
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
