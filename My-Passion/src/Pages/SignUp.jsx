import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import auth from "../firebase/firebase";
import { updateProfile } from "firebase/auth";

const SignUp = () => {
    const {createUser, user, loading} = useContext(AuthContext);
    const location = useLocation()
    const navigate = useNavigate()
    useEffect(()=>{
        if(user){
            navigate('/')
        }
    },[navigate, user])
    

    const handleCreateUser = e => {
        e.preventDefault()
        const from = e.target;
        const name = from.name.value;
        const email = from.email.value;
        const photoUrl = from.photoUrl.value;
        const password = from.password.value;

        createUser(email, password)
            .then(res => {
                console.log(res.user);
                updateProfile(auth.currentUser, {
                    displayName: name,
                    photoURL: photoUrl
                })
                navigate(location?.state ? location.state : ('/'))
            })
            .catch(error => {
                console.log(error.message);
            })
    }
    if(user || loading) return
    return (
        <div className="py-24">
            <div className="container mx-auto max-w-md p-8 space-y-3 rounded-xl border-2">
                <h1 className="text-2xl font-bold text-center">Sign Up</h1>
                <form onSubmit={handleCreateUser} className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Name" className="block text-gray-400">Name</label>
                        <input type="text" required name="name" id="Name" placeholder="Name" className="w-full px-4 py-3 rounded-md border-gray-900   focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="Email" className="block text-gray-400">Email</label>
                        <input type="email" required name="email" id="Email" placeholder="Email" className="w-full px-4 py-3 rounded-md border-gray-900   focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="photoUrl" className="block text-gray-400">Photo Url</label>
                        <input type="text" required name="photoUrl" id="photoUrl" placeholder="Photo Url" className="w-full px-4 py-3 rounded-md border-gray-900   focus:border-violet-400" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="password" className="block text-gray-400">Password</label>
                        <input type="password" required name="password" id="password" placeholder="Password" className="w-full px-4 py-3 rounded-md border-gray-900   focus:border-violet-400" />
                        
                    </div>
                    <button className="block w-full p-3 text-center rounded-sm text-gray-900 bg-violet-400">Sign Up</button>
                </form>
                
               
                <p className="text-xs text-center sm:px-6 text-gray-400">Already I have an account?
                    <Link to={'/login'} className="underline text-blue-500">Sign in</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;