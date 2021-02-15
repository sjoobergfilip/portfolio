import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../../client";
import LazyHero from "react-lazy-hero";
import BlockContent from "@sanity/block-content-to-react";
import "./Project.css";
import Loader from '../loader/Loader'

const SingleProject = () => {
    const [project, setProject] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[slug.current == "${slug}"]{
              title,
              _id,
              slug,
              mainImage{
                  asset->{
                      _id,
                      url
                  }
              },
              body,
              place,
              mainDescription,
              mainImage{
                asset->{
                    _id,
                    url
                },
                alt
            }, 
            link,
            github,
            projectType,
            place,

          }`
            )
            .then(data => setProject(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!project) return <Loader />
    return (
        <main className="bg-gray-800 min-h-screen">
            <LazyHero color="#1D2938" imageSrc={project.mainImage.asset.url}>
                <h1 className="text-gray-50 text-4xl uppercase project-title">
                    {project.title}
                </h1>
                <div className="flex justify-center">
                    <p className="text-gray-50 mr-7 italic project-info ">
                        {project.projectType}
                    </p>
                    <p className="text-gray-50 italic project-info ">{project.place}</p>
                </div>
                <a
                    className="text-gray-50 mr-7 underline flex justify-center text-center hover:text-yellow-300"
                    href={project.link}
                    target="_blank"
                    rel="noreferrer"
                >
                    {project.link}
                </a>
            </LazyHero>
            <div className=" lg:px-30 py-12 lg:py-20 prose max-w-900 m-auto text-gray-50 flex flex-col">
                <BlockContent
                    blocks={project.body}
                    projectId="qbil2d7s"
                    dataset="production"
                />
                <a className="github" href={project.github} target="_blank" rel="noreferrer">
                    {project.github}
                </a>
                <a className="github" href={project.link} target="_blank" rel="noreferrer">
                    {project.link}
                </a>
            </div>
        </main>
    );
};

export default SingleProject;
