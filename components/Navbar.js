import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import authContext from '@/context/auth/authContext'

import Logo from '../public/favicon-32x32.png'
import styles from '../styles/Navbar.module.css'

const Navbar = () => {
  const router = useRouter();
  const context = useContext(authContext);
  const { user } = context

  const handleLogout = () => {
    localStorage.removeItem("auth-token");
    router.push("/login");
    router.reload();
  }
  const [authToken, setAuthToken] = useState()
  useEffect(() => {
    setAuthToken(localStorage.getItem("auth-token"));
  }, [router.query])
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt="NoteKeeper" priority="high" />
        <Link href="/">Expenses</Link>
      </div>
      <div className={styles.user}>
        <span className={`${styles.username} ${styles.mobile}`} >
          <Link href="https://anjali-varshney.github.io/anjalivarshney/" target="_blank">
            Visit{" "}anjalivarshney.com !
          </Link>
        </span>
        {authToken ?
          <>
            <span className={styles.username}>Hi, {user ? user.split(' ')[0] : "User"}</span>
            <button className={`${styles.button}`} onClick={handleLogout}>Logout</button>
          </>
          :
          <>
            <Link href="/login"><button className={styles.button}>Login</button></Link>
            <Link href="/signup"><button className={styles.button}>SignUp</button></Link>
          </>}
      </div>
    </header>
  )
}

export default Navbar