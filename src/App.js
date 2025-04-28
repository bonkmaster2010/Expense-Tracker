import React, { useState, useEffect } from "react";
import "./Styles/main.css";

function App() {
  // State for expenses and inputs
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date"); // Sort by date or price

  // Save expenses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  // Add a new expense
  const addExpense = () => {
    if (!name || !category || !date || !price) {
      alert("Please fill all inputs");
      return;
    }

    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }

    const newExpense = { name, category, date, price: numericPrice };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    // Reset inputs
    setName("");
    setCategory("");
    setDate("");
    setPrice("");
  };

  // Remove an expense by index
  const removeExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  // Filtered expenses based on selected category
  const filteredExpenses = filterCategory === "All"
    ? expenses
    : expenses.filter((expense) => expense.category === filterCategory);

  // Sort expenses
  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "price") {
      return b.price - a.price;
    }
    return new Date(b.date) - new Date(a.date);
  });

  // Unique category options for filter dropdown
  const categoryOptions = ["All", ...new Set(expenses.map((e) => e.category))];

  return (
    <div className="app-container">
      {/* Expense Input Controls */}
      <div className="expense-inputs">
        <div className="controls">
          <input
            value={name}
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            value={category}
            placeholder="Category"
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <input
            value={date}
            placeholder="YY/MM/DD"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            value={price}
            placeholder="Price"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button onClick={addExpense}>Add</button>
        </div>
      </div>

      {/* Filter and Sort Section */}
      <div className="filter-sort">
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          {categoryOptions.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="date">Sort by Date</option>
          <option value="price">Sort by Price</option>
        </select>
      </div>

      {/* Expense Table */}
      <div className="expense-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Date</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedExpenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.name}</td>
                <td>{expense.category}</td>
                <td>{expense.date}</td>
                <td>${expense.price.toFixed(2)}</td>
                <td>
                  <button onClick={() => removeExpense(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
