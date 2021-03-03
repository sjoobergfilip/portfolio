import "./home.css";
import { SocialIcon } from "react-social-icons";
const Home = () => {
    return (
        <main className="container-home lg:px-14">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 w-auto p-12 gap-2 flex justify-center justify-items-center   ">
                <div className="flex justify-center flex-col">
                    <h1 className="hero-name text-gray-50 text-6xl">
                        Frontend developer and UX/UI designer
                    </h1>
                    <p className="text-gray-50 my-5 cursive">
                        My name is Filip and I am a huge sport fan with a big
                        passion for graphics designs and new technology.
                    </p>
                </div>
                <div className="mt-7 flex justify-center mb-4 lg:invisible md:invisible sm:invisible visible">
                    <SocialIcon
                        url="https://www.linkedin.com/in/filip-sj%C3%B6berg-a86550140/"
                        className="mr-4"
                        target="_blank"
                        fgColor="#fff"
                        style={{ height: 50, width: 50 }}
                    />
                    <SocialIcon
                        url="https://github.com/sjoobergfilip"
                        className="mr-4"
                        target="_blank"
                        bgColor="white"
                        fgColor="black"
                        style={{ height: 50, width: 50 }}
                    />
                    <SocialIcon
                        url="https://twitter.com/sjobergfilip"
                        className="mr-4"
                        target="_blank"
                        fgColor="#fff"
                        style={{ height: 50, width: 50 }}
                    />
                </div>
            </div>
        </main>
    );
};

export default Home;
