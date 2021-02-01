import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import LazyHero from "react-lazy-hero";

const SingleProject = () => {
    const [project, setProject] = useState(null);
    const { slug } = useParams();

    const builder = imageUrlBuilder(sanityClient);
    function urlFor(source) {
        return builder.image(source);
    }

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
            projectType,
            place,

          }`
            )
            .then(data => setProject(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!project) return <div>Loading</div>;

    return (
        <main className="bg-gray-800 min-h-screen">
            <LazyHero color="#1D2938" imageSrc={project.mainImage.asset.url}>
                <h1 className="text-gray-50 text-4xl uppercase">
                    {project.title}
                </h1>
                <div className="flex justify-center">
                    <p className="text-gray-50 mr-7">{project.projectType}</p>
                    <p className="text-gray-50">{project.place}</p>
                </div>
                <a
                    className="text-gray-50 mr-7 underline flex justify-center text-center hover:text-yellow-300"
                    href={project.link}
                >
                    {project.link}
                </a>
            </LazyHero>
        </main>
    );
};

export default SingleProject;
