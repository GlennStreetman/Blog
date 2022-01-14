export default function Projects() {
    return (
        <div className="flex flex-col space-y-2">
            <h2 className="text-accent font-heading ">Projects</h2>
            <div className="shadow rounded-md border-2 p-2 outline-4 hover:bg-weak text-primary ">
                <h6 className="text-secondary font-heading">Finndash:</h6>
                <p>
                    A Web App for designing dashboards and generate Excel Templates for your Finnhub.io API data. The front end uses React with Redux and styled
                    with MaterialUi. The back end is deployed using Docker-Compose. Requests are handled by Express. Account data is saved in Postgres. Caching
                    is handled by MongoDB. Testing is performed using Jest.
                </p>
            </div>
            <div className="text-primary shadow rounded-md border-2 p-2 outline-4  hover:bg-weak">
                <h6 className="text-secondary font-heading">copy-excel-chart:</h6>
                <p>
                    An NPN Package used to copy charts between excel spreadsheets using NodeJS. Uses AdmZip to unpack Excel templates into source XML files.
                    xml2js is then used to find and copy excel charts into destination files.
                </p>
            </div>
            <div className=" text-primary shadow rounded-md border-2 p-2 outline-4  hover:bg-weak ">
                <h6 className="text-secondary font-heading">Personal Blog:</h6>
                <p>
                    A Next.js blog, styled with Tailwinds, where i keep track of my projects, add daily notes, and write the occasional blog post. Writing is
                    some times the best way to learn!
                </p>
            </div>
        </div>
    );
}

//need to add git links to all of the above.
