import React, { useState, useEffect } from "react";
import Dash from "./Components/dashboard";
import "./Styles/main.css";

function App() {
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

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

    const newExpense = {
      name: name.trim(),
      category: category.trim(),
      date,
      price: numericPrice,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

    setName("");
    setCategory("");
    setDate("");
    setPrice("");
  };

  const removeExpense = (index) => {
    setExpenses((prevExpenses) => prevExpenses.filter((_, i) => i !== index));
  };

  const filteredExpenses =
    filterCategory === "All"
      ? expenses
      : expenses.filter(
          (expense) =>
            expense.category.toLowerCase() === filterCategory.toLowerCase()
        );

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "price") {
      return b.price - a.price;
    }
    return new Date(b.date) - new Date(a.date);
  });

  const categoryOptions = [
    "All",
    ...new Set(expenses.map((e) => e.category.trim())),
  ];

  return (
    <div className="app-container">
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

      <div className="filter-sort">
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
        >
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

      {/* Render the Dash Component */}
      <div className="chart-container">
        <h2>Category Expense Breakdown</h2>
        <Dash expenses={expenses} />
      </div>
    </div>
  );
}

export default App;
