import React, { useState, useEffect } from "react";
import "./Styles/main.css";

function App() {
  // State for expenses and various input fields
  const [cont, setCont] = useState(() => {
    // Load expenses from localStorage if available
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const [name, setName] = useState("");
  const [cate, setCate] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  useEffect(() => {
    // Save expenses to localStorage whenever they change
    localStorage.setItem("expenses", JSON.stringify(cont));
  }, [cont]);

  // Function to add a new expense
  function add() {
    // Check if all fields are filled
    if (!name || !cate || !date || !price) {
      alert("Please fill all inputs");
      return;
    }

    // Ensure price is a valid number
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice) || numericPrice <= 0) {
      alert("Please enter a valid price");
      return;
    }

    // Add the new expense to the list and reset input fields
    setCont((prev) => [...prev, { name, cate, date, price: numericPrice }]);
    setName("");
    setCate("");
    setDate("");
    setPrice("");
  }

  // Function to remove an expense by index
  function remove(index) {
    setCont(cont.filter((_, i) => i !== index));
  }

  // Filter expenses by category
  const filteredExpenses = filterCategory === "All" ? cont : cont.filter((item) => item.cate === filterCategory);

  return (
    <>
      {/* Expense Input Controls */}
      <div className="expense-inputs">
        <div className="controls">
          {/* Input fields for adding a new expense */}
          <input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} required />
          <input id="Cate" placeholder="Category" value={cate} onChange={(e) => setCate(e.target.value)} required />
          <input id="date" placeholder="YY/MM/DD" value={date} onChange={(e) => setDate(e.target.value)} required />
          <input id="price" placeholder="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
          {/* Add button to trigger add function */}
          <button onClick={add}>Add</button>
        </div>
      </div>

      {/* Filter Section */}
      <div className="filter">
        {/* Dropdown to select category filter */}
        <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="All">All</option>
          {/* Dynamically generate category options from the list of expenses */}
          {[...new Set(cont.map((item) => item.cate))].map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Expense List */}
      <div className="expense-cont">
        {/* Map through filtered expenses and display each item */}
        {filteredExpenses.map((item, index) => (
          <div className="cont" key={index}>
            {/* Display expense details */}
            <div className="labels">
              <h3>Name</h3>
              <p>{item.name}</p>
            </div>
            <div id="Cate" className="labels">
              <h3>Category</h3>
              <p>{item.cate}</p>
            </div>
            <div id="date" className="labels">
              <h3>Date</h3>
              <p>{item.date}</p>
            </div>
            <div id="price" className="labels">
              <h3>Price</h3>
              <p>{item.price}</p>
            </div>
            {/* Button to delete the expense */}
            <button id="delete" onClick={() => remove(index)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
