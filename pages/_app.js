import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Scrollup from '@/components/Scrollup'
import AuthState from '@/context/auth/authState'
import ExpenseState from '@/context/expense/expenseState'
import '@/styles/globals.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    router.events.on('routeChangeStart', () => setProgress(60));
    router.events.on('routeChangeComplete', () => setProgress(100));
  }, [router.events])

  return <>
    <AuthState>
      <ExpenseState>
        <LoadingBar
          color='#f11946'
          // color='black'
          progress={progress}
          height={3}
          waitingTime={400}
          onLoaderFinished={() => setProgress(0)}
        />
        <Navbar />
        <Component {...pageProps} />
        <Footer />
        <Scrollup />
      </ExpenseState>
    </AuthState>
  </>
}
