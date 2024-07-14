import Head from 'next/head'
import { useRef, useState } from "react";
import styles from '../styles/Auth.module.css'
import { useRouter } from "next/router";
import Image from 'next/image'
import Logo from '../public/favicon-96x96.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const host = "http://localhost:5000";

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const [isVisible, setIsVisible] = useState({ name: false, email: false, password: false, confirmPassword: false });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.current.value !== confirmPassword.current.value) {
      toast.info(`Passwords does not match`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: name.current.value, email: email.current.value, password: password.current.value }),
    });
    const user = await response.json();
    localStorage.setItem("auth-token", user.authToken);
    if (user.isValid) {
      router.push('/');
    }
    else {
      let message = response.error;
      if (typeof response.error === 'object')
        message = response.error[0].msg;
      toast.info(`${message}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleFocus = (event) => {
    setIsVisible({ ...isVisible, [event.target.name]: true })
  }
  const handleBlur = (event) => {
    if (!event.target.value)
      setIsVisible({ ...isVisible, [event.target.name]: false })
  }
  return (
    <>
      <Head>
        <title>Expense Tracker | SignUp</title>
        <meta name="description" content="Signup page of ExpenseTracker" />
      </Head>
      <div className='section container'>
        <div className={styles.login}>
          <h2 className={styles.page_title}><span>Welcome to</span><Image src={Logo} alt="ExpenseTracker" /><span>Expense Tracker !!</span> </h2>
          <form onSubmit={handleSubmit} className={styles.signup_form}>
            <div className={styles.signup_form_div}>
              {isVisible.name && <label htmlFor="name" className={`${styles.signup_form_tag}`}>Name</label>}
              <input ref={name} className={styles.form_input} type="name" name="name" required placeholder={isVisible.name ? "" : "Name"} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div className={styles.signup_form_div}>
              {isVisible.email && <label htmlFor="email" className={`${styles.signup_form_tag}`}>Email</label>}
              <input ref={email} className={styles.form_input} type="email" name="email" required placeholder={isVisible.email ? "" : "Email address"} onFocus={handleFocus} onBlur={handleBlur} />
            </div>
            <div className={styles.signup_form_div}>
              {isVisible.password && <label htmlFor="password" className={`${styles.signup_form_tag}`}>Password</label>}
              <input ref={password} className={styles.form_input} type="password" name="password" placeholder={isVisible.password ? "" : "Password"} required onFocus={handleFocus} onBlur={handleBlur} minLength={8} />
            </div>
            <div className={styles.signup_form_div}>
              {isVisible.confirmPassword && <label htmlFor="confirmPassword" className={`${styles.signup_form_tag}`}>Confirm password</label>}
              <input ref={confirmPassword} className={styles.form_input} type="password" name="confirmPassword" placeholder={isVisible.confirmPassword ? "" : "Confirm password"} required onFocus={handleFocus} onBlur={handleBlur} minLength={8} />
            </div>
            <div className="button_wrapper">
              <button type="submit" className={styles.button}>Signup</button>
            </div>
            <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
          </form>
        </div>
      </div>
    </>
  )
}

export default Signup