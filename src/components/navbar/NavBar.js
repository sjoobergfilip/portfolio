import React from "react";
import { NavLink } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import "../../index.css";

const NavBar = () => {
    return (
        <header className="bg-gray-800">
            <div className="container mx-auto flex justify-between">
                <nav className="flex">
                    <NavLink
                        to="/"
                        exact
                        activeClassName="nav-link-active"
                        className="home-name inflex-flex items-center py-6 px-3 mr-4 text-gray-100 hover:text-gray-5 text-3xl font-bold cursive tracking-widest"
                    >
                        LakeMountain
                    </NavLink>
                    <NavLink
                        to="/project"
                        activeClassName="nav-link-active"
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-gray-400 hover:text-gray-50"
                    >
                        Project
                    </NavLink>
                    <NavLink
                        to="/post"
                        activeClassName="nav-link-active"
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-gray-400 hover:text-gray-50"
                    >
                        Blog Post
                    </NavLink>
                    <NavLink
                        to="/about"
                        activeClassName="nav-link-active"
                        className="inline-flex items-center py-3 px-3 my-6 rounded text-gray-400 hover:text-gray-50"
                    >
                        About Me
                    </NavLink>
                </nav>
                <div className="mt-6">
                    <SocialIcon
                        url="https://www.linkedin.com/in/filip-sj%C3%B6berg-a86550140/"
                        className="mr-4"
                        target="_blank"
                        fgColor="#fff"
                        style={{ height: 35, width: 35 }}
                    />
                    <SocialIcon
                        url="https://github.com/sjoobergfilip"
                        className="mr-4"
                        target="_blank"
                        bgColor="white"
                        fgColor="black"
                        style={{ height: 35, width: 35 }}
                    />
                    <SocialIcon
                        url="https://twitter.com/sjobergfilip"
                        className="mr-4"
                        target="_blank"
                        fgColor="#fff"
                        style={{ height: 35, width: 35 }}
                    />
                </div>
            </div>
        </header>
    );
};

export default NavBar;
