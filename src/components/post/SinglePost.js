import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import sanityClient from "../../client";
import LazyHero from "react-lazy-hero";
import BlockContent from "@sanity/block-content-to-react";
import Loader from '../loader/Loader'

const SinglePost = () => {
    const [post, setPost] = useState(null);
    const { slug } = useParams();

    useEffect(() => {
        sanityClient
            .fetch(
                `*[slug.current == "${slug}"]{
              title,
              slug,
              mainImage{
                  asset->{
                      _id,
                      url
                  }
              },
              body,
              

          }`
            )
            .then(data => setPost(data[0]))
            .catch(console.error);
    }, [slug]);

    if (!post) return <Loader />
    return (
        <main className="bg-gray-800 min-h-screen">
            <LazyHero color="#1D2938" imageSrc={post.mainImage.asset.url}>
                <h1 className="text-gray-50 text-4xl uppercase project-title">
                    {post.title}
                </h1>
            </LazyHero>
            <div className=" lg:px-30 py-12 lg:py-20 prose max-w-900 m-auto text-gray-50 flex flex-col">
                <BlockContent
                    blocks={post.body}
                    projectId="qbil2d7s"
                    dataset="production"
                />
            </div>
        </main>
    );
};

export default SinglePost;
