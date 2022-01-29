/*
    @start
    id: FinnDash
    project: FinnDash
    description: A single page web application for designing dashboards, building & sharing dataset with GraphQL, and Excel Templating using Finnhub.io API data. The front end uses React with Redux and is styled with MaterialUi. The back end is deployed using Docker-Compose. HTTP requests are handled by Express. Account data is saved in Postgres. Caching is handled by MongoDB. Datasets can be shared using GraphQL. Testing is performed using Jest & Testing Library. Hosted on AWS EC2.
    repo: https://github.com/GlennStreetman/finnHub-Dashboard
    languages: language-typescript,language-React,language-Redux,language-Express,language-Postgres,language-MongoDB,language-GraphQL,language-MaterialUI,language-Jest,language-testingLibrary,language-docker
    @end
*/

import CodeBlock from "../components/codeBlock";

const body = function () {
    return (
        <div className="article">
            <h1>Description</h1>
            <p>
                FinnDash is a single page web application that adds a graphical user interface to Finnhub.io’s freemium financial API. It allows users, that do
                not come from a technical background, to rapidly specify groupings of API calls, which become datasets. Datasets can then be reviewed using
                Finndash’s user arranged widget system. Groupings of widgets become dashboards. Dashboard datasets. can then be pushed directly into excel
                templates or shared using GraphQL. In the background, FinnDash freshens Finnhub.io API data at it becomes stale.
            </p>
            <h1>Technologies:</h1>

            <h2>React: </h2>
            <p>
                I knew when I started working on FinnDash one its primary features would be private user designed dashboards. Search engine optimization would
                not be a concern as almost the entire app would be hidden behind a login. The responsiveness of a single page web application and the
                elimination of page reloads would be a big benefit to the user. Finnhub.io’s REST API returns JSON data and Reacts JSX templating is excellent
                at converting JSON data into user interfaces. As a result, I decided use create-react-app for this project.
            </p>
            <h2>Redux & Redux Tool Kit: </h2>
            <p>
                Users of FinnDash can rapidly specify thousands of API calls, associated with any number of dashboards, that can return large chunks of JSON
                data. The data then needs to somehow be stored on the client side or cached as needed. The data that is stored on the client side then needs to
                be converted into human readable and configurable user interfaces using derived state. As the user updates API data filters and reconfigures how
                widgets display data FinnDash needs to fire of actions that freshen data based on updated filters and derives new state based on updated user
                configurations. Redux is a heavy-duty solution to global state management and is easily up to this task. Using Redux I was able to lift
                dashboard configurations & API data up into global a global Redux state container. Derived state could consistently be updated using Redux’s
                action reducer model and composable asynchronous updates to global state could be created using Redux Thunks. After dashboard and API state was
                lifted out of Reacts component tree the need for prop drilling was greatly reduced and individual react component state could focus much more
                heavily on the view portion of the application, leaving the data model in Redux. One benefit of Redux, that should not be overlooked, is that
                all data store updates are handled using Immer’s immutable state updates. Using immutable state updates avoids object reference update reference
                errors and avoids desynchronization between store state and what react renders. Updating deeply nested object state, and consistently creating
                new object references, is prone to error. Immer almost completely eliminates these hard to troubleshoot errors.
            </p>
            <h2>Typescript:</h2>
            <p>
                As FinnDash grew in complexity debugging simple errors started eating up more and more time. Tracking down undefined reference errors started
                eating up more time and remembering all the parameters a function required when it was called was creating more and more mental overhead.
                Typescript greatly reduced time spent debugging reference errors, made it easier to shared functions, and has more often than not created a more
                enjoyable developer experience. Using typescript to define function interfaces and return values has been a huge time saver and regularly
                catches errors while coding.
            </p>
            <h2>Express:</h2>
            <p>
                All of FInnhub’s route handling, database interactions, session/cookie management, file upload/download & parsing is handled by Express. I found
                Express to be a bit frustrating at time. It has very little included out of the box and doesn’t support some things, like es6 imports, out of
                the box. Session management, cookies, environmental variables, all require packages to be added to Express. If you come from a python
                background, and have used Flask or Bottle, Express should feel fairly familiar.
            </p>
            <h2>Postgres:</h2>
            <p>
                User account and dashboard data is saved in Postgres. When Finndash’s Express backend first starts it compares the schema version, saved as an
                environmental variable, to the schema version saved in the database. If Express detects a difference in version, it sequentially runs the
                associated upgrade/downgrade scripts to build the correct schema. One big advantage of this is that when Finndash’s git repo is cloned to a new
                environment Express will build out the correct schema the first time the application is started up.
            </p>
            <h2>MongoDB:</h2>
            <p>
                MongoDB is used to cache API JSON data returned by Finnhub.io. MongoDB promises to quickly and efficiently deal with large collections of JSON
                data that are frequently updated, which is exactly what I’m doing with Finnhub.io’s API data. Avoiding any bottlenecking, by separating user
                login database requests from API data caching also might have some advantages if this project ever became more than a hobby Application.
            </p>

            <h2>GraphQL:</h2>
            <p>
                Empowering users, from a non-technical background, to share data specifications & API data, with both technical and non-technical team members,
                is one of the driving goals of FinnDash. GraphQL makes it easy to create links to datasets, pivots data, and communicate data specifications
                between team members. After a dashboard is created, the data stored in MongoDB, becomes accessible through GraphQL to team members. Team members
                can share links to their data sets and pivot the view, specifying which widgets & which securities, they want to share. Talking about GraphQL
                datasets is easier than managing, updating, and sharing groups of API endpoint query strings.
            </p>

            <h2>Material UI:</h2>
            <p>
                Material UI components are used for many of Finndash’s forms and components. Read more about the experience of converting a project to Material
                UI here.
            </p>
            <h2>Jest & Testing Library:</h2>
            <p>
                Tests are written using testing library and run with Jest. Backend tests and performed using a mock server and session store, that import the
                routes to be tested. Database connections are not mocked out so that any database interactions can be verified. A separatee docker volume is
                specified to avoid contaminating the production database. Frontend tests are isolated from any HTTP requests using a mock HTTP server. HTTP
                requests are intercepted using a web worker and mock data is returned. By mocking HTTP responses tests can be performed against consistent HTTP
                return data. Each frontend test loads the component being tested into a fresh version of the app so that integration tests can be performed.
                Each frontend test loads the target component and interacts with the components various functionalities so that all of the component’s views and
                resulting side effects can be tested. This testing approach currently allows for integration tests for the front and back end separately but
                leaves the application open to end-to-end issues. Down the road end-to-end tests could be added, with any mocks removed, or a different testing
                approach, like cypress could be added.
            </p>
            <h2>Infrastructure and Deployment</h2>
            <p>
                The best way to deploy FinnDash is currently using Docker Compose and Make. “Make prod” will currently build and deploy the entire environment
                assuming the host system has Docker & Make properly setup. A demo of this application is currently running on an AWS EC2 Ubuntu Server. This
                does leave the door open for problems with deployments because images change over time. A Virtual Machine template build using a something like
                Packer could help streamline the deployment.
            </p>
        </div>
    );
};

export default body;
