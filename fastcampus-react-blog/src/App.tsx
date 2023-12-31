import { useContext, useEffect, useState } from "react"
import "./App.css"
import Router from "./components/Router"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "firebaseApp"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Loader from "components/Loader"
import { ThemeContext } from "context/ThemeContext"

function App() {
  const auth = getAuth(app)
  const [init, setInit] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(!!auth?.currentUser)

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

  const { theme } = useContext(ThemeContext)

  return (
    <div className={theme === "light" ? "white" : "dark"}>
      {init ? <Router isAuthenticated={isAuthenticated}></Router> : <Loader />}
      <ToastContainer></ToastContainer>
    </div>
  )
}

export default App
