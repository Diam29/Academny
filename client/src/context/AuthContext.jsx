import { auth } from "../firebase/firebase.config.js";
import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, sendPasswordResetEmail } from "firebase/auth";

export const authContext = createContext()

export const useAuth = () => {
    const context = useContext(authContext)
    if (!context) console.log('No se ha creado el contexto')
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        const suscribed = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) {
                setUser(null)
            } else {
                setUser(currentUser)
            }
        })
        return () => suscribed()
    }, [])


    const register = async (email, password) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            setUser(response.user)
        } catch (error) {
            setError(error.message)
            throw error
        }
    }

    const login = async (email, password) => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
            setUser(response.user)
        } catch (error) {
            setError(error.message)
            console.log('soy mensaje de login context', error.message)
            throw error
        }
    }
    const loginWithGoogle = async () => {
        try {
            const responseGoogle = new GoogleAuthProvider();
            const authResult = await signInWithPopup(auth, responseGoogle);
            const user = authResult.user;
            setUser(user);
            return authResult;
        } catch (error) {
            console.error('Error al iniciar sesión con Google', error);
            throw error;
        }
    }

    const logout = async () => {
        const response = await signOut(auth)
        console.log('responseLogout', response)

    }

    const resetPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
    };
    return <authContext.Provider value={{
        register, login, loginWithGoogle, logout, resetPassword, error,
        setError: () => setError(null), user
    }}>{children}</authContext.Provider>
}