import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import '../Styles/Layout.css'

export default function Layout() {

  const [expenses, setExpenses] = useState(() => {
    const savedExpenses = localStorage.getItem("expenses");
    return savedExpenses ? JSON.parse(savedExpenses) : [];
  });

  const categories = [...new Set(expenses.map((item) => item.cate))];

  return (
    <>
      <nav>
        <NavLink className='links' to="/">Expenses</NavLink>
        <NavLink className='links' state={{expenses, categories}} to="/dashboard">Dashboard</NavLink>
      </nav>
      <Outlet />
    </>
  );
}
