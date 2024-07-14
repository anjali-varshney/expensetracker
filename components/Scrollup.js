import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

const Scrollup = () => {
    const [showscroll, setShowscroll] = useState(true)
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY >= 200)
                setShowscroll(true)
            else
                setShowscroll(false)
        });
    },)
    return (
        <div className={`${styles.home_scroll} ${showscroll ? styles.home_scroll_show : ''}`}>
            <i className={`fa-solid fa-arrow-up ${styles.home_scroll_icon}`} onClick={scrollToTop}></i>
        </div>
    )
}

export default Scrollup