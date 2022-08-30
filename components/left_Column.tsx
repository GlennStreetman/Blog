import React from "react";
import Head from "next/head";
import Header, { siteTitle } from "../components/Header";
import Link from "next/link";
import SourceTrail from "../components/sourceTrail";
import HoverSurface from "../components/hoverSurface";
import dynamic from "next/dynamic";
import styles from "./left_Column.module.css";
import iconButton from '../components/iconButton'
import {IoLogoYoutube} from 'react-icons/io'

interface props {
    allProjectData: any;
    allStingers: any;
}

function Left_Column(p: props) {
    const sortedProjects = p.allProjectData.sort((a,b)=> a.priority - b.priority)
    const projects = sortedProjects.map((el) => {
        const youtube = el.youtube ? <div className='absolute top-3 right-3 z-50'><a className='' href={el.youtube}><IoLogoYoutube className='text-2xl hover:text-3xl text-[#e43534]' /></a></div> : <></>
        const DynamicBody = dynamic(() => import(`../projectStingers/${el.id}.mdx`));
        return (

        <section className='relative' key={el.id}>
            {youtube}
            <HoverSurface>
                <>
                <Link href={`/projects/${el.id}`} passHref>
                    <a>
                        <div className="text-secondary tracking-wide font-heading">{el.project}</div>
                        <article className={styles.article}>
                        <DynamicBody />
                        </article>
                        {/* <div className="text-primary">{el.description}</div> */}
                        <div className="flex gap-2 my-auto">
                            <SourceTrail
                                tech={
                                    el?.languages
                                        ? el.languages.split(",").map(function (item) {
                                              return item.trim();
                                          })
                                        : []
                                }
                                post={`post-${el.id}`}
                            />
                        </div>
                    </a>
                </Link>
                
                </>
            </HoverSurface>
        </section>

    )})

    return (
        <>
            <Header home />
            <Head>
                <title>{siteTitle}</title>
                <meta name="description" content="Glenn Streetmans Web Blog, Projects, and notes." />
            </Head>
            <div className="space-y-2">
                <h2 className="text-accent font-heading text-2xl tracking-wider">Projects</h2>
                <div className="flex flex-col space-y-2">
                {projects}
                </div>
            </div>
        </>
    );
}

export default Left_Column;
