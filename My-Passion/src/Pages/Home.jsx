import Banner from "./Banner";
import TabCategories from "./TabCategories";
// import TabCategories from "./TabCategories";

const Home = () => {
    return (
        <div className="font-lato py-20 container mx-auto px-3">
            <Banner></Banner>
            <div className="py-20 space-y-5">
                <div className="max-w-2xl mx-auto text-center space-y-5">
                    <h1 className="text-4xl font-bold">Browse Jobs By Categories</h1>
                    <p>Three categories available for the time being. They are Web Development, Graphics Design and Digital Marketing. Browse them by clicking on the tabs below.</p>
                </div>
                <TabCategories></TabCategories>
                
            </div>
        </div>
    );
};

export default Home;