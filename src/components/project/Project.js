import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Project = () => {
    const [projectData, setProjectData] = useState(null);
    const [loading, setLoading] = useState(null);

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
                <section className="grid grid-cols-2 gap-8">
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
                                key={project.slug}
                            >
                                <article className="relative rounded-lg shadow-xl bg-white p-16">
                                    <h3 className="text-gray-800 text-3xl font-bold mb-2 hover:text-red-700">
                                        {project.title}
                                    </h3>
                                    <div className="text-gray-500 text-xs space-x-4">
                                        <span>
                                            <strong className="font-bold">
                                                Finished on
                                            </strong>
                                            :{" "}
                                            {new Date(
                                                project.date
                                            ).toLocaleDateString()}
                                        </span>
                                        <span>
                                            <strong className="font-bold">
                                                Company
                                            </strong>
                                            : {project.place}
                                        </span>
                                        <span>
                                            <strong className="font-bold">
                                                Type
                                            </strong>
                                            : {project.projectType}
                                        </span>
                                        <p className="my-6 text-lg text-gray-700 leading-relaxed">
                                            {project.description}
                                        </p>
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
