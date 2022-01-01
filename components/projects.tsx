export default function Projects() {
    return (
        <>
            <h2>
                <b>Projects</b>
            </h2>
            <div>
                <p>
                    <h6>
                        <b>Finndash:</b>
                    </h6>
                    A Web App for designing dashboards and generate Excel Templates for your Finnhub.io API data. The front end uses React with Redux. The back
                    end is deployed using Docker-Compose. Requests are handled by Express. Account data is saved in Postgres. Caching is handled by MongoDB.
                    Testing is performed using Jest.
                </p>
            </div>
            <div>
                <p>
                    <h6>
                        <b>copy-excel-chart:</b>
                    </h6>
                    An NPN Package to copy charts between excel spreadsheets using NodeJS. Uses AdmZip to unpack Excel templates into source XML files. xml2js
                    is then used to find and copy excel charts into destination files.
                </p>
            </div>
            <div>
                <p>
                    <h6>
                        <b>Personal Blog:</b>
                    </h6>
                    A Next.js blog styled with Tailwinds where i keep track of my projects, keep daily notes, and write the occasional blog post. Writing is
                    some times the best way to learn!
                </p>
            </div>
        </>
    );
}

//need to add git links to all of the above.
