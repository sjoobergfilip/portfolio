import React, { useEffect, useState } from "react";
import sanityClient from "../../client";
import LazyHero from "react-lazy-hero";
import Patter from "./patter-01.png";
import "./about.css";
import Loader from '../loader/Loader'

const About = () => {

    const [author, setAuthor] = useState(null);
    useEffect(() => {
        sanityClient
            .fetch(
                `*[_type == "author"]{
              name,
              "bio": bio[0].children[0].text,
              "authorImage": image.asset->url
          }`
            )
            .then(data => setAuthor(data[0]))
            .catch(console.error);
    }, []);

    if (!author) {
        return <Loader />;
    }

    return (
        <main className="relative bg-gray-800 min-h-screen">
            <LazyHero color="#1D2938" imageSrc={Patter}>
                <h2 className="text-left text-xl lowercase text-gray-50 slogan">
                    Hello
                </h2>
                <h2 className="text-left text-4xl text-gray-50 slogan">
                    My name is {author.name}
                </h2>
                <h2 className="text-3xl text-gray-50 slogan text-left">
                    I'm a frontend developer and UX/UI designer
                </h2>
            </LazyHero>
            <div className="pt-10 lg:px-56 container mx-auto relative"></div>
            <div className="p-10 lg:pt-10 container mx-auto relative lg:px-56">
                <p className="text-gray-50 m-auto ">{author.bio}</p>
            </div>
        </main>
    );
};

export default About;
