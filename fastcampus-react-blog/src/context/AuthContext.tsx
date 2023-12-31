import { User, getAuth, onAuthStateChanged } from "firebase/auth"
import { app } from "firebaseApp"
import { PropsWithChildren, createContext, useEffect, useState } from "react"

const AuthContext = createContext({
  user: null as User | null,
})

export const AuthContextProvider = ({ children }: PropsWithChildren<{}>) => {
  const auth = getAuth(app)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user)
      }
    })
  }, [auth])

  return (
    <AuthContext.Provider value={{ user: currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
