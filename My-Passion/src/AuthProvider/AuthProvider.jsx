import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext(null)
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const createUser = (email, password) =>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }


    const googleProvider = new GoogleAuthProvider()

    const googleSign = () =>{
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }


    const userLogOut = () => {
        signOut(auth)
        .then(() => {
            console.log('log Out success full');
            
        })
        .catch((error) => {
            console.log(error);
        });
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            const userEmail = currentUser?.email || user?.email
            const loggeUser = { email : userEmail}
            
            setUser(currentUser);
            console.log(currentUser);
            setLoading(false)
            
            if(currentUser){
                axios.post(`${import.meta.env.VITE_API_KEY}/jwt`, loggeUser, {withCredentials: true})
                .then(res => {
                    console.log(res.data);
                })
            }else{
                axios.post(`${import.meta.env.VITE_API_KEY}/logOut`, loggeUser, {withCredentials: true})
                .then(res =>{
                    console.log(res.data);
                })
            }
        })
        return () => {
            unsubscribe()
        }
    },[])



    const authInfo = {
        user,
        loading,
        createUser,
        userLogOut,
        googleSign
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;