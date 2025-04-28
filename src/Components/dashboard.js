import React, { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import DashChart from "../Extra/Recharts";
import "../Styles/dash.css";

function Dash() {
  const location = useLocation();
  const { expenses: initialExpenses = [], categories: initialCategories = [] } = location.state || {};

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : initialExpenses;
  });

  const [income, setIncome] = useState(() => localStorage.getItem("income") || "");
  const [budget, setBudget] = useState(() => localStorage.getItem("budget") || "");
  const [categories, setCategories] = useState(() => [...new Set(initialCategories)]);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("income", income);
    localStorage.setItem("budget", budget);
  }, [expenses, income, budget]);

  const totalExpenses = useMemo(() => 
    expenses.reduce((sum, { price }) => sum + price, 0)
  , [expenses]);

  const remainingBudget = useMemo(() => 
    budget ? Number(budget) - totalExpenses : null
  , [budget, totalExpenses]);

  const handleIncomeChange = (e) => setIncome(e.target.value);
  const handleBudgetChange = (e) => setBudget(e.target.value);

  const addExpense = (newExpense) => {
    setExpenses((prev) => [...prev, newExpense]);
    setCategories((prev) =>
      prev.includes(newExpense.cate) ? prev : [...prev, newExpense.cate]
    );
  };

  const chartData = useMemo(() => 
    categories.map((category) => {
      const total = expenses
        .filter((expense) => expense.cate === category)
        .reduce((sum, expense) => sum + expense.price, 0);

      return { name: category, expense: total };
    })
  , [expenses, categories]);

  return (
    <div className="conts">
      <h1>Dashboard</h1>

      <div className="dashboard-container">
        <div className="input-group">
          <input
            type="number"
            value={income}
            onChange={handleIncomeChange}
            placeholder="Enter your income"
            className="input-field"
          />
          <input
            type="number"
            value={budget}
            onChange={handleBudgetChange}
            placeholder="Enter your budget"
            className="input-field"
          />
        </div>

        <div className="summary">
          <p><strong>Income:</strong> {income || "-"}</p>
          <p><strong>Budget:</strong> {budget || "-"}</p>
          <p><strong>Total Expenses:</strong> {totalExpenses}</p>

          {budget && (
            <div className="budget-status">
              {remainingBudget > 0 && (
                <p id="high">✅ Under budget! ({remainingBudget} remaining)</p>
              )}
              {remainingBudget === 0 && (
                <p id="neutral">⚡ You've exactly met your budget!</p>
              )}
              {remainingBudget < 0 && (
                <p id="low">⚠️ Over budget by {Math.abs(remainingBudget)}!</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="chart-section">
        {expenses.length > 0 ? (
          <DashChart chartData={chartData} />
        ) : (
          <div className="no-expenses">
            <p>No expenses to show yet 📊</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dash;
