import React from "react";
import Head from "next/head";
import Header, { siteTitle } from "../components/Header";
import Projects from "./projects";

function Left_Column() {
    return (
        <>
            <Header home />
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content="Glenn Streetmans Web Blog, Projects, and notes." />
            </Head>
            <Projects />
        </>
    );
}

export default Left_Column;
