import React, { useState, useEffect } from "react";
import sanityClient from "../../client";
import { Link } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from '../loader/Loader'
import "./Project.css";

const Project = () => {
    const [projectData, setProjectData] = useState(null);
    const [filterData, setFilterData] = useState(null);
    const [activeAll, setActiveAll] = useState(true);
    const [activeUx, setActiveUx] = useState(false);
    const [activeFrontend, setActiveFrontend] = useState(false);
    const [activeIllustration, setActiveActiveIllustration] = useState(false);

    useEffect(() => {
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
              filtertype,
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
                setProjectData(data);
                setFilterData(data)
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        console.log('this is filterData',filterData)
        console.log('this is projectData',projectData)
    }, [filterData])

    const filterAll = () =>{
        setActiveAll(true)
        setActiveUx(false)
        setActiveFrontend(false)
        setActiveActiveIllustration(false)
        setFilterData(projectData)
    }
    const filterUx = () =>{
        setActiveAll(false)
        setActiveUx(true)
        setActiveFrontend(false)
        setActiveActiveIllustration(false)        
        const filteredArray = projectData.filter((item) =>{
            if(item.filtertype === 'uxDesing'){
                return item
            }
        })
        setFilterData(filteredArray)
    }
    const filterFrontend = () =>{
        setActiveAll(false)
        setActiveUx(false)
        setActiveFrontend(true)
        setActiveActiveIllustration(false)
        const filteredArray = projectData.filter((item) =>{
            if(item.filtertype === 'frontend'){
                return item
            }
        })
        setFilterData(filteredArray)
    }
    const filterIllustration = () =>{
        setActiveAll(false)
        setActiveUx(false)
        setActiveFrontend(false)
        setActiveActiveIllustration(true)
        const filteredArray = projectData.filter((item) =>{
            if(item.filtertype === 'illustration'){
                return item
            }
        })
        setFilterData(filteredArray)
    }

    if(!projectData){
        return <Loader />
    }

    return (
        <main className="bg-gray-800 min-h-screen lg:p-12">
            <section className="container mx-auto">
                <div>
                    <div className="flex lg:justify-end md:justify-end justify-center text-gray-50 mb-4">
                        <p onClick={filterAll} className={activeAll ? "filter-active mr-2" : "filter mr-2" }>All</p>
                        <p onClick={filterUx} className={activeUx ? "filter-active mr-2" : "filter mr-2" }>UX-design</p>
                        <p onClick={filterFrontend} className={activeFrontend ? "filter-active mr-2" : "filter mr-2" }>Frontend</p>
                        <p onClick={filterIllustration} className={activeIllustration ? "filter-active mr-2" : "filter mr-2" }>illustration's</p>
                    </div>
                </div>
                <section className="grid lg:grid-cols-3 md:grid-cols-2">
                        {filterData &&
                            filterData.map((project, index) => (
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
                                        className="opacity-0 hover:opacity-90 hover:bg-gray-900  transition-all duration-600 block relative h-full flex justify-start items-start pr-4 pb-4"
                                    >
                                        <div className="flex flex-col">
                                            <span className="text-gray-50 text-4xl uppercase pl-10 pt-10 underline project-title">
                                                {project.title}
                                            </span>
                                            <span className="text-gray-50 px-10 mt-5 uppercase project-info">
                                                {project.place}
                                            </span>
                                            <span className="text-gray-50 px-10 mt-1 uppercase project-info">
                                                {project.projectType}
                                            </span>
                                            <p className="mt-4 text-lg text-gray-50 leading-relaxed px-10 project-info italic">
                                                {project.shortDescription}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        ))}
                </section>
            </section>
        </main>
    );
};

export default Project;
