import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { AuthContextProvider } from "context/AuthContext"
import { ThemeProvider } from "context/ThemeContext"

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <ThemeProvider>
    <AuthContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthContextProvider>
  </ThemeProvider>,
)
