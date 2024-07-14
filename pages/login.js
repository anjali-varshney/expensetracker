import Head from 'next/head'
import { useRef, useState } from "react";
import Link from "next/link";
import styles from '../styles/Auth.module.css'
import { useRouter } from "next/router";
import Image from 'next/image'
import Logo from '../public/favicon-96x96.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const host = "https://expensetracker-backend-phi.vercel.app";
    const email = useRef();
    const password = useRef();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState({ email: false, password: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: email.current.value, password: password.current.value }),
        });
        const response = await data.json();
        if (response.isValid) {
            localStorage.setItem("auth-token", response.authToken);
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
                theme: "dark",
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
                <title>NoteKeeper | Login</title>
                <meta name="description" content="Login page of NoteKeeper" />
            </Head>
            <div className='section container'>
                <div className={styles.login}>
                    <h2 className={styles.page_title}><Image src={Logo} alt="NoteKeeper" /><span>Welcome Back !!</span></h2>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.login_form_div}>
                            {isVisible.email && <label htmlFor="email" className={`${styles.login_form_tag}`}>Email</label>}
                            <input ref={email} className={styles.email} type="email" name="email" required placeholder={isVisible.email ? "" : "Email address"} onFocus={handleFocus} onBlur={handleBlur} />
                        </div>
                        <div className={styles.login_form_div}>
                            {isVisible.password && <label htmlFor="password" className={`${styles.login_form_tag}`}>Password</label>}
                            <input ref={password} className={styles.password} type="password" name="password" placeholder={isVisible.password ? "" : "Password"} onFocus={handleFocus} onBlur={handleBlur} required />
                        </div>
                        <div className="button_wrapper">
                            <button type="submit" className={styles.button}>Login</button>
                        </div>
                        <ToastContainer position="bottom-right" autoClose={2500} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" />
                    </form>
                    <p className={styles.signup}>
                        Don't have an account ? {" "}
                        <Link href="/signup"><span className={styles.signupword}>SignUp</span></Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Login