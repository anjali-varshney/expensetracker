import React, { useContext, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router';
import Head from 'next/head'
import moment from 'moment';
import ExpenseCard from '@/components/ExpenseCard';
import authContext from '@/context/auth/authContext';
import expenseContext from '@/context/expense/expenseContext';
// import styles from '@/styles/Home.module.css'
import styles from '../styles/Expense.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Quotes } from '@/components/Quotes'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default function Home() {
  const context = useContext(expenseContext);
    const { expenses, fetchExpenses, addExpense, totalExpenses, categories, dates } = context;

    const userContext = useContext(authContext);
    const { user, fetchUser } = userContext;

    const router = useRouter();
    const name = useRef();
    const amount = useRef();
    const category = useRef();
    const [mode, setMode] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedDate, setSelectedDate] = useState(null);
    const [filteredExpenses, setFilteredExpenses] = useState(expenses);
    const [newExpense, setNewExpense] = useState(true);
    const [filteredTotalExpenses, setFilteredTotalExpenses] = useState(0);
    const [titleQuote, setTitleQuote] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        let categoryValue = category.current.value;
        let capitalizedCategory = categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1);
        addExpense(name.current.value, amount.current.value, capitalizedCategory, mode).then((result) => {
            toast.success('Expense added successfully !', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            setNewExpense(!newExpense)
        })
        e.target.reset();
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            async function fetchData() {
                const expensesResponse = await fetchExpenses();
                setFilteredExpenses(expensesResponse)
                const userResponse = await fetchUser();
            }
            fetchData()
        }
        else
            router.push("/login");
    }, [router.events, newExpense])

    useEffect(() => {
        let formattedSelectedDate = moment(selectedDate).format("ddd, DD MMM");
        if (selectedCategory === "All" && selectedDate == null)
            setFilteredExpenses(expenses);
        else if (selectedCategory !== "All" && selectedDate == null)
            setFilteredExpenses(expenses.filter((expense) => expense.category === selectedCategory));
        else if (selectedCategory === "All" && selectedDate !== null)
            setFilteredExpenses(expenses.filter((expense) => moment(expense.date).format('ddd, DD MMM') === formattedSelectedDate))
        else if (selectedCategory !== "All" && selectedDate !== null)
            setFilteredExpenses(expenses.filter((expense) => { return expense.category === selectedCategory && moment(expense.date).format('ddd, DD MMM') === formattedSelectedDate }));
        else
            setFilteredExpenses(expenses)
    }, [selectedCategory, selectedDate])

    useEffect(() => {
        setFilteredTotalExpenses(filteredExpenses.reduce((accumulator, { amount }) => accumulator + parseInt(amount), 0))
    }, [filteredExpenses])

    useEffect(() => {
        const randomIndex = Math.floor(Math.random() * Quotes.length);
        setTitleQuote(Quotes[randomIndex])
    }, [titleQuote])
  return (
    <>
      <Head>
        <title>Expenses | {user ? user : "Personal Cloud Diary !"}</title>
        <meta name="description" content="Expense Tracker generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="section container">
        <h2 className={styles.section_title}>{titleQuote}</h2>
        <form onSubmit={handleSubmit} className={`${styles.form}`}>
          <div className={`${styles.form_div}`}>
            <input ref={name} type="text" name="name" className={`${styles.form_input}`} required autoComplete="off" />
            <label htmlFor="name">Expense</label>
          </div>
          <div className={`${styles.form_div}`}>
            <input ref={amount} type="number" name="amount" id="amount" inputMode='numeric' className={`${styles.form_input}`} required autoComplete="off" />
            <label htmlFor="amount">Amount</label>
          </div>
          <div className={`${styles.form_div}`}>
            <input ref={category} type="text" name="category" className={`${styles.form_input}`} autoComplete="off" required />
            <label htmlFor="category">Category</label>
          </div>
          <div className={`${styles.button_group}`}>
            <button type='button' onClick={() => setMode("UPI")} className={` ${mode === "UPI" ? styles.selected : ''} ${styles.choice_button}`} name='mode' value='UPI'>UPI</button>
            <button type='button' onClick={() => setMode("Cash")} className={` ${mode === "Cash" ? styles.selected : ''} ${styles.choice_button}`} name='mode' value='Cash'>Cash</button>
          </div>
          <div className='button_wrapper'>
            <button className={`button button_flex`}>
              Add Expense
            </button>
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          </div>
        </form>
        <span className={styles.total_expense}>
          Total : &#8377; {totalExpenses}
        </span>
        {/* <Chart data={data} /> */}
        <div className={styles.filters_container}>
          <div className={styles.dropdown_menu}>
            <label className={styles.dropdown_label} htmlFor="categoriesDropdown">Category</label>
            <select id="categoriesDropdown" className={styles.dropdown_menu_select} onChange={(event) => { setSelectedCategory(event.target.value) }}>
              {categories.map((category, index) => {
                return <option className='dropdownOptions' value={category} key={index}>{category}</option>
              })}
            </select>
          </div>
          <div className={styles.dropdown_menu}>
            <label className={styles.dropdown_label} htmlFor="dateDropdown">Date</label>
            {/* <select id="dateDropdown" className={styles.dropdown_menu_select} onChange={(event) => { setSelectedDate(event.target.value) }}>
                    <option value={moment(Date.now).format("ddd, DD MMM")}>Today</option>
                    <option value={null} >All</option>
                {/* <select id="dateDropdown" className={styles.dropdown_menu_select} onChange={(event) => { setSelectedDate(event.target.value) }}>
                    <option value={moment(Date.now).format("ddd, DD MMM")}>Today</option>
                    <option value={null} >All</option>
                    {dates.map((date, index) => {
                        return <option value={date} key={index}>{date}</option>
                    })}
                </select> */}
            <DatePicker isClearable={true} id="dateDropdown" placeholderText='All' className={`${styles.dropdown_menu_select} ${styles.datepicker}`} focusSelectedMonth='true' allowSameDay='true' selected={selectedDate} onChange={(date) => setSelectedDate(date)} dateFormat="dd MMMM" highlightDates={[new Date()]} />
          </div>
        </div>
        {(selectedCategory !== "All" || selectedDate !== null) &&
          <div className={styles.filters_section}>
            <div className={styles.filter_total_expense}>Filtered Expenses : <strong>&#8377; {filteredTotalExpenses.toLocaleString()}</strong></div>
            <div className={styles.clear_filters} onClick={() => { setSelectedDate(null); setSelectedCategory("All"); }}>Reset</div>
          </div>
        }
        <div className={`${styles.card_container}`}>
          {filteredExpenses.map((expense) => {
            return <ExpenseCard expense={expense} key={expense._id} />
          })}
        </div>
      </div>
    </>
  )
}