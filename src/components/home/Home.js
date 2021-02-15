import './home.css'
const Home = () => {
    return (
        <main className="container-home lg:px-14">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 w-auto p-12 gap-2 flex justify-center justify-items-center   ">
                <div className="flex justify-center flex-col">
                    <h1 className="hero-name text-gray-50 text-6xl">
                        Frontend developer and UX/UI designer
                    </h1>
                    <p className="text-gray-50 my-5 cursive">
                        My name is Filip an i'm a UX/UI designer and a Frontend developer, how have work at fitness24seven and some experience from frilanc project
                    </p>
                </div>
            </div>
        </main>
    );
};

export default Home;
