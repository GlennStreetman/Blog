import React from "react";
import Link from "next/link";
import Date from "./date";
import SourceTrail from "../components/sourceTrail";
import SourceTrailClicky from "../components/sourceTrail_clicky";
import HoverSurface from "../components/hoverSurface";
import { useState, useEffect } from "react";
import AccentButton from "../components/accentButton";
import Track from "../components/Track";

interface props {
    allPostsData: any;
}

function countFilterMatches(list, filter) {
    if (filter !== "") {
    const totalCount = list.reduce((prev, curr) => {
        const match = curr.languages.split(",").some((currEl) => {
            return currEl.trim() === filter.trim();
        });
        if (match) prev = prev + 1;
        return prev;
    }, 0);
    return totalCount;
} else {
    return list.length
}
}

export default function Right_Column(p: props) {
    const [index, setIndex] = useState(1);
    const [currentFilter, setCurrentFilter] = useState("");
    const [posts, setPosts] = useState([]);
    const [filters, setFilters] = useState(new Set());
    const [openFilters, setOpenFilters] = useState(false);
    const postPerPage = 10;

    useEffect(() => {
        if (p?.allPostsData?.length && p.allPostsData.length > 0) {
            if (currentFilter === "") {
                const startSlice = (index - 1) * postPerPage;
                const endSlice = startSlice + postPerPage;
                setPosts(p.allPostsData.slice(startSlice, endSlice));
            } else {
                //filtered
                const startSlice = (index - 1) * postPerPage;
                const endSlice = startSlice + postPerPage;
                const filteredPosts = p.allPostsData.reduce((prev, curr) => {
                    curr.languages.split(",").some((el) => {
                        if (currentFilter.trim() === el.trim()) prev.push(curr);
                    });

                    return prev;
                }, []);
                setPosts(filteredPosts.slice(startSlice, endSlice));
            }
        }
    }, [currentFilter, index]);

    useEffect(() => {
        //set starting filter list.
        if (p?.allPostsData?.length && p.allPostsData.length > 0) {
            let allFilters = new Set();
            p.allPostsData.reduce((prev, curr) => {
                curr.languages.split(",").forEach((el) => prev.add(el.trim()));
                return prev;
            }, allFilters);
            setFilters(allFilters);
        }
    }, [p.allPostsData]);

    const filterLabel = () => {
        if (!openFilters && currentFilter === "") return "Add Filter";
        if (!openFilters && currentFilter !== "") return "Filter: ";
        if (openFilters) return "Set Filter: ";
    };

    const filterIcon = !openFilters ? currentFilter : "";

    const showTrack = ()=>{
        if (p?.allPostsData?.length && p.allPostsData.length > 0 && countFilterMatches(p.allPostsData, currentFilter) > postPerPage) {
            return (<Track
                index={index}
                totalLength={currentFilter === "" ? p.allPostsData.length : countFilterMatches(p.allPostsData, currentFilter)}
                divisor={postPerPage}
                callback={setIndex}
            />)
        } else {
            return <></>
        }
    }

    return (
        <div className="space-y-2">
            <h2 className="text-accent font-heading text-2xl tracking-wider px-2">Journal</h2>
            <h3 className="flex flex-row gap-2">
                <AccentButton
                    text={filterLabel()}
                    callback={() => {
                        setOpenFilters(!openFilters);
                    }}
                    icon={filterIcon}
                />
                {openFilters && filters.size > 0 ? (
                    <SourceTrailClicky
                        // @ts-ignore
                        tech={[...filters]}
                        thisKey={`filtersMap`}
                        callback={(el) => {
                            setCurrentFilter(el);
                            setIndex(1);
                            setOpenFilters(false);
                        }}
                    />
                ) : (
                    <></>
                )}
            </h3>

            <div className="flex flex-col space-y-2">
                {posts.map((el) => (
                    <section key={el.id}>
                        <HoverSurface>
                            <Link href={`/posts/${el.id}`} passHref>
                                <a>
                                    <div className="text-secondary tracking-wide font-heading">{el.title}</div>
                                    {el.oneliner ? <div className="text-primary font-extralight text-sm tracking-wide ">{el.oneliner}</div> : <></>}
                                    <div className="flex gap-2 my-auto">
                                        <small className="text-primary">
                                            <Date dateString={el.date} />
                                        </small>
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
                        </HoverSurface>
                    </section>
                ))}
                {showTrack()}
            </div>
        </div>
    );
}
