import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const MainRoots = () => {
    return (
        <div>
            {/* navbar  */}
            <Navbar></Navbar>
            {/* outlate  */}
            <Outlet></Outlet>
            {/* footer  */}
            <Footer></Footer>
        </div>
    );
};

export default MainRoots;