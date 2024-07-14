import React from 'react'
import Link from 'next/link'
import styles from '../styles/Navbar.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div >Feedback : <Link href="mailto:anjalivarshney019@gmail.com" target="_blank">anjalivarshney019@gmail.com</Link></div>
      <div>Follow <Link href="https://anjali-varshney.github.io/anjalivarshney/" target="_blank">github.io/anjalivarshney</Link></div>
      <div className={styles.copyright}>&copy; 2023 Expense Tracker | All rights reserved</div>
    </footer>
  )
}

export default Footer