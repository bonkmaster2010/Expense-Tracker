import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import DashChart from "../Extra/Recharts";
import '../Styles/dash.css';

function Dash() {

  // Accessing state from the location to get expenses and categories
  const location = useLocation();
  const { expenses, categories } = location.state || { expenses: [], categories: [] };

  // State for the total expenses, income, and budget
  let [total, setTotal] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : expenses;
  });

  let [income, setIncome] = useState(localStorage.getItem("income") || "");
  let [budget, setBudget] = useState(localStorage.getItem("budget") || "");

  // Persist expenses, income, and budget to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(total));
    localStorage.setItem("income", income);
    localStorage.setItem("budget", budget);
  }, [total, income, budget]);

  let totalEx = total.reduce((acc, cur) => acc + cur.price, 0);

  const handleIncomeChange = (e) => {
    setIncome(e.target.value);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  // Function to add a new expense and update categories dynamically
  const addExpense = (newExpense) => {
    const updatedExpenses = [...total, newExpense];
    setTotal(updatedExpenses);  // Update state with new expenses

    if (!categories.includes(newExpense.cate)) {
      categories.push(newExpense.cate);  // Add new category to the list
    }

    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // Prepare chart data by summing up expenses for each category
  const chartData = categories.map((category) => {
    const filteredExpenses = total.filter((expense) => expense.cate === category);
    const totalExpense = filteredExpenses.reduce((acc, cur) => acc + cur.price, 0);

    return {
      name: category,
      expense: totalExpense
    };
  });

  return (
    <>
         <div className="conts">
          <h1>Dashboard</h1>
      <div className="dashboard-container">
        {/* Input for income */}
        <input
          type="number"
          value={income}
          onChange={handleIncomeChange}
          placeholder="Enter your income"
        />
        
        {/* Input for budget */}
        <input
          type="number"
          value={budget}
          onChange={handleBudgetChange}
          placeholder="Enter your budget"
        />
        
        <p>Total Expenses: {totalEx}</p>

        {/* Display budget status */}
        {totalEx <= Number(budget) && <p>To reach your budget, you need: {budget - totalEx}</p>}
        {totalEx < Number(budget) && (
          <p id="high">You are under the budget!</p>
        )}
        {totalEx === Number(budget) && (
          <p id="neutral">You reached your budget!</p>
        )}
        {totalEx > Number(budget) && (
          <p id="low">You are over the budget!</p>
        )}
      </div>

      {/* Render the chart with the data */}
      <DashChart  chartData={chartData} />
    </div>
    </>
  );
}

export default Dash;