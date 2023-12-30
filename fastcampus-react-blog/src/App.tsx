import { useEffect, useState } from "react"
import "./App.css"
import Router from "./components/Router"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app, db } from "firebaseApp"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "components/Loader"

function App() {
  const auth = getAuth(app)
  const [init, setInit] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth?.currentUser)
  console.log(db)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
      setInit(true)
    })
  }, [auth])

  return (
    <>
      {init ? <Router isAuthenticated={isAuthenticated}></Router> : <Loader />}
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
