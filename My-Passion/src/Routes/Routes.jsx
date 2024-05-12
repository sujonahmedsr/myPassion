import {
    createBrowserRouter,
} from "react-router-dom";
import MainRoots from "../Pages/MainRoots";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import JobDetails from "../Pages/JobDetails";
import AddJob from "../Pages/AddJob";
import UpdateJob from "../Pages/UpdateJob";
import BidRequests from "../Pages/BidRequests";
import AllJobs from "../Pages/AllJobs";
import MyPost from "../Pages/MyPost";
import MyBids from "../Pages/MyBids";
import PrivateRoutes from "../privateRoutes/PrivateRoutes";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainRoots></MainRoots>,
        errorElement: <Error></Error>,
        children: [
            {
                path: '/',
                element: <Home></Home>,
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/details/:id',
                element: <PrivateRoutes>
                    <JobDetails></JobDetails>
                </PrivateRoutes>
                ,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_KEY}/jobs/${params.id}`)
            },
            {
                path: '/AddPost',
                element: <PrivateRoutes>
                    <AddJob></AddJob>
                </PrivateRoutes>

            },
            {
                path: '/MyPost',
                element: <PrivateRoutes>
                    <MyPost></MyPost>
                </PrivateRoutes>

            },
            {
                path: '/myBids',
                element: <PrivateRoutes>
                    <MyBids></MyBids>
                </PrivateRoutes>

            },
            {
                path: '/update/:id',
                element: <PrivateRoutes>
                    <UpdateJob></UpdateJob>
                </PrivateRoutes>
                ,
                loader: ({ params }) => fetch(`${import.meta.env.VITE_API_KEY}/jobs/${params.id}`)
            },
            {
                path: '/BidsReq',
                element: <PrivateRoutes>
                    <BidRequests></BidRequests>
                </PrivateRoutes>

            },
            {
                path: '/allJobs',
                element: <PrivateRoutes>
                    <AllJobs></AllJobs>
                </PrivateRoutes>,
                loader: ()=> fetch('http://localhost:5000/jobsCount')

            }
        ]
    },
]);