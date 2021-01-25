import React, { useState, useEffect, useRef } from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import "./Project.css";

const Project = () => {
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(null);
    const [hover, setHover] = useState(false);

    const projectRef = React.useRef(null);

    const onHover = e => {
        console.log("my refIs", projectRef.current.id);
        console.log("e.target is:", e.target.id);
        if (projectRef.current.id === e.target.id) {
            console.log("success");
            setHover(true);
        }
    };

    const onLeave = () => {
        setHover(false);
        console.log("I'm leaving this imgs, my ref is:");
    };

    useEffect(() => {
        setLoading(true);
        sanityClient
            .fetch(
                `*[_type == "project"]{
              title,
              date,
              place,
              description,
              projectType,
              link,
              tags,
              slug,
                mainImage{
                    asset->{
                        _id,
                        url
                    },
                    alt
                }
          }`
            )
            .then(data => {
                console.log(data);
                setProjectData(data);
                setLoading(false);
            })
            .catch(console.error);
    }, []);

    return (
        <main className="bg-gray-800 min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center text-gray-50">
                    My project
                </h1>
                <h2 className="text-lg text-gray-50 flex justify-center mb-12">
                    Welcome to my projects
                </h2>
                <section className="grid lg:grid-cols-3 md:grid-cols-2">
                    {loading ? (
                        <Loader
                            type="Rings"
                            color="white"
                            height={100}
                            width={100}
                        />
                    ) : (
                        projectData &&
                        projectData.map((project, index) => (
                            <Link
                                to={"/project/" + project.slug.current}
                                key={project.slug.current}
                            >
                                <article
                                    className="block h-64 relative rounded shadow leading-snug bg-white"
                                    key={index}
                                >
                                    <img
                                        src={project.mainImage.asset.url}
                                        alt={project.mainImage.alt}
                                        className="w-full h-full rounded-r object-cover absolute"
                                    />
                                    <div
                                        onMouseEnter={onHover}
                                        onMouseLeave={onLeave}
                                        ref={projectRef}
                                        className="block relative h-full flex justify-start items-start pr-4 pb-4"
                                        id={project.slug.current}
                                    >
                                        {hover && (
                                            <h3 className="text-red-200">
                                                {project.title}
                                            </h3>
                                        )}
                                    </div>
                                </article>
                            </Link>
                        ))
                    )}
                </section>
            </section>
        </main>
    );
};

export default Project;
