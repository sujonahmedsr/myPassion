import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";

const Navbar = () => {
    const { user, userLogOut } = useContext(AuthContext);
    const handleSignOut = ()=>{
        userLogOut()
    }
    return (
        <div className="bg-base-100 border-b shadow fixed left-0 right-0 font-lato z-10">
            <div className="navbar container mx-auto">
                <div className="flex-1">
                    <Link to={'/'} className="text-2xl font-bold cursor-pointer">My <span>Passion</span></Link>
                </div>
                <div className="flex-none space-x-5">
                    <ul className="flex items-center space-x-5">
                        <Link to={'/'}><li>Home</li></Link>
                        <Link to={'/allJobs'}><li>All Jobs</li></Link>
                        {
                            user ?
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Tailwind CSS Navbar component" src={user.photoURL}/>
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-64 space-y-3">
                                        <li>
                                            <h1 className="text-xl">{user.displayName}</h1>
                                        </li>
                                        <Link to={'/AddPost'}><li>Add Post</li></Link>
                                        <Link to={'/MyPost'}><li>My Posted Jobs</li></Link>
                                        <Link to={'/MyBids'}><li>My Bids</li></Link>
                                        <Link to={'/BidsReq'}><li>Bid Requests</li></Link>
                                        <li className="bg-blue-600 font-bold text-white text-xl rounded-full p-2" onClick={handleSignOut}><a>Logout</a></li>
                                    </ul>
                                </div>
                                :
                                <Link to={'/login'}><li>Login</li></Link>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;