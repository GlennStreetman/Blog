import SourceTrail from "../components/sourceTrail";

export default function Projects() {
    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-accent font-heading ">Projects</h2>
            <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-weak text-primary ">
                <h6 className="text-secondary font-heading">Finndash</h6>
                <p>
                    A single page web application for designing dashboards, building & sharing dataset with GraphQL, and Excel Templating using Finnhub.io API
                    data. The front end uses React with Redux and is styled with MaterialUi. The back end is deployed using Docker-Compose. HTTP requests are
                    handled by Express. Account data is saved in Postgres. Caching is handled by MongoDB. Datasets can be shared using GraphQL. Testing is
                    performed using Jest & Testing Library. Hosted on AWS EC2.
                </p>
                <SourceTrail
                    tech={[
                        "language-typescript",
                        "language-React",
                        "language-Redux",
                        "language-Express",
                        "language-Postgres",
                        "language-MongoDB",
                        "language-GraphQL",
                        "language-MaterialUI",
                        "language-Jest",
                        "language-testingLibrary",
                        "language-docker",
                    ]}
                    post="finnDash"
                />
            </div>
            <div className="text-primary shadow rounded-md border-2 p-2 outline-4  hover:bg-weak">
                <h6 className="text-secondary font-heading">copy-excel-chart</h6>
                <p>
                    An NPN Package used to copy charts between excel spreadsheets using NodeJS. Uses AdmZip to unpack Excel templates into source XML files.
                    xml2js is then used to find and copy excel charts into destination files.
                </p>
                <SourceTrail tech={["language-javascript", "language-NPM"]} post="finnDash" />
            </div>
            <div className=" text-primary shadow rounded-md border-2 p-2 outline-4  hover:bg-weak ">
                <h6 className="text-secondary font-heading">Personal Blog</h6>
                <p>
                    A Next.js blog, styled with Tailwinds, where i keep track of my projects, and write the occasional blog post. Writing is some times the best
                    way to learn!
                </p>
                <SourceTrail tech={["language-javascript", "language-Next", "language-Tailwind"]} post="finnDash" />
            </div>
        </div>
    );
}

//need to add git links to all of the above.
