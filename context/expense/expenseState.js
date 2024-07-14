import { useState } from "react";
import ExpenseContext from "./expenseContext";
import moment from "moment";

const ExpenseState = (props) => {
  const host = "http://localhost:5000";

  const [expenses, setExpenses] = useState([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [categories, setCategories] = useState([]);
  const [dates, setDates] = useState([])

  const fetchExpenses = async () => {
    const response = await fetch(`${host}/api/expenses/fetchexpenses`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      }
    });
    const data = await response.json();
    setExpenses(data.expenses);
    const formattedTotalExpenses = data.totalExpenses.toLocaleString("en-US");
    setCategories(["All", ...new Set(data.expenses.map((expense) => expense.category))]);
    setDates(["All", ...new Set(data.expenses.map((expense) => {
      const formattedDate = moment(expense.date).format("ddd, DD MMM")
      return formattedDate;
    }
    ))])
    setTotalExpenses(formattedTotalExpenses);
    return data.expenses;
  }

  const addExpense = async (name, amount, category, mode) => {
    const response = await fetch(`${host}/api/expenses/addexpense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ name, amount, category, mode })
    });
    const expense = await response.json();
    setExpenses([...expenses, expense]);
  }

  const editExpense = async (id, name, amount, category) => {
    const response = await fetch(`${host}/api/expenses/updateexpense/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      },
      body: JSON.stringify({ name, amount, category })
    });
    const data = await response.json();

    const updatedExpenses = expenses.map((expense) => {
      if (expense._id === id) {
        {
          expense.title = title;
          expense.description = description;
          expense.tag = tag;
        }
      }
      return expense;
    })
    setExpenses(updatedExpenses)
  }

  const deleteExpense = async (id) => {
    const response = await fetch(`${host}/api/expenses/deleteexpense/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("auth-token"),
      }
    });
    const data = await response.json();
    const filteredExpenses = notes.filter((expense) => { return expense._id !== id })
    setNotes(filteredExpenses)
  }

  return (
    <ExpenseContext.Provider value={{ expenses, setExpenses, addExpense, editExpense, deleteExpense, fetchExpenses, totalExpenses, categories, dates }}>
      {props.children}
    </ExpenseContext.Provider>
  )
}

export default ExpenseState