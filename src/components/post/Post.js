import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import sanityClient from "../../client";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

const Post = () => {
    const [postData, setPostData] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        setLoading(true);
        sanityClient
            .fetch(
                `*[_type == "post"]{
                title,
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
                setLoading(false);
                setPostData(data);
            })
            .catch(console.error);
    }, []);

    return (
        <main className="bg-gray-800 min-h-screen p-12">
            <section className="container mx-auto">
                <h1 className="text-5xl flex justify-center cursive text-gray-50">
                    Blog Posts Page
                </h1>
                <h2 className="text-lg text-gray-50 flex justify-center mb-12">
                    Welcome to my page of blog posts
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        <Loader
                            type="Rings"
                            color="white"
                            height={100}
                            width={100}
                        />
                    ) : (
                        postData &&
                        postData.map((post, index) => (
                            <article>
                                <Link
                                    to={"/post/" + post.slug.current}
                                    key={post.slug.current}
                                >
                                    <span
                                        className="block h-64 relative rounded shadow leading-snug bg-white border-l-8 border-blue-100"
                                        key={index}
                                    >
                                        <img
                                            src={post.mainImage.asset.url}
                                            alt={post.mainImage.alt}
                                            className="w-full h-full rounded-r object-cover absolute"
                                        />
                                        <span className="block relative h-full flex justify-end items-end pr-4 pb-4">
                                            <h3 className="text-gray-50 text-lg font-blog px-3 py-4 bg-blue-400 bg-opacity-75 rounded">
                                                {post.title}
                                            </h3>
                                        </span>
                                    </span>
                                </Link>
                            </article>
                        ))
                    )}
                </div>
            </section>
        </main>
    );
};

export default Post;
