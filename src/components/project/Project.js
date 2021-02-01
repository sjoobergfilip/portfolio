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

    const onHover = project => {
        console.log(project);
    };

    const onLeave = () => {
        setHover(false);
    };

    useEffect(() => {
        setLoading(true);
        sanityClient
            .fetch(
                `*[_type == "project"]{
              title,
              date,
              place,
              shortDescription,
              projectType,
              link,
              tags,
              slug,
              imagesGallery,
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
                                        onMouseEnter={() => onHover(project)}
                                        onMouseLeave={onLeave}
                                        className="opacity-0 hover:opacity-90 hover:bg-gray-900  transition-all duration-600 block relative h-full flex justify-start items-start pr-4 pb-4"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-gray-50 text-4xl uppercase pl-10 pt-10 underline">
                                                {project.title}
                                            </span>
                                            <span className="text-gray-50 px-10 mt-5 uppercase">
                                                {project.place}
                                            </span>
                                            <span className="text-gray-50 px-10 mt-1 uppercase">
                                                {project.projectType}
                                            </span>
                                            <p className="mt-4 text-lg text-gray-50 leading-relaxed px-10 italic">
                                                {project.shortDescription}
                                            </p>
                                        </div>
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
