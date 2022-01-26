/*
    @start
    id: materialConversion
    title: Considerations when migrating a project to Material UI
    date: 2022-01-25
    type: notes
    languages: language-MaterialUI
    project: Finndash
    @end
*/

import CodeBlock from "../components/codeBlock";

const body = function () {
    return (
        <div className="article">
            <h2>Quick notes on migrating my project, FinnDash, to Material UI</h2>
            <p>
                A few months back i wanted to try out using a component library. Up until this point i had always created my own bespoke components. Having a
                library of premade components could potentialy save time so it definitly had its allure. I looked around at what was available and decided on{" "}
                {MaterialUI}. Material UI offers a wide range of components that promises customization and accessability out of the box. Material UI is
                preconfigured to use {emotion} to style components or you can choose to switch over to {styled} components, if that is your preferense.
            </p>
            <h2>The first speed bump</h2>
            <p>
                The first problem i ran into was that i was still using React 16. The most recent version of Material UI, v5, requires react 17. No problem, i
                could use Material UI v4. I installed Material v4 and was quickly able to begin updating my project with beutiful premade components that really
                did make certain parts of my project look a bit more professional. Trying to make small tweaks to the components quickly became a problem
                though. Each Material UI component is normaly a grouping of nested React components. If you change styling on an outer component you might also
                need to pass styling updates down to the child components to get everything to look right. Material UI's {system} isnt availabe in v4 so i was
                stuck using the {legacyStyles} system. I quickly found this process to be fairly arduous task. See the example below where I'm creating a theme
                for a text field. Maybe life would be easier if i upgraded to Material v5.
            </p>
            <CodeBlock language="language-javascript" file="./buildRegister.mjs">{`const newTheme = createTheme({
    components: {
        MuiTextField: {
            styleOverrides: {
                root: {
                    color: "black",
                    input: {
                        paddingTop: "14.5px",
                        paddingBottom: "14.5px",
                    },
                    label: {
                        top: "-9px",
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: "35px",
                },
                input: {
                    position: "relative",
                    top: "-8px",
                },
            },
        },
    },
    palette: {
        primary: {
            main: "#ffffff",
            light: "#ffffff",
            dark: "#ffffff",
        },
    },
});`}</CodeBlock>
            <h2>Migrating to Material v5</h2>
            <p>
                Material UI components were proving to be a lot of work to customize. Upgrading to version 5, and gaining access to the new {system} looked like
                it might have some advantages. All i would need to do was upgrade from React 16 to 17 and then upgrade to Material UI v5! Of course this is
                easier said than done. My projects dependancy list is getting fairly large at this point and simply trying to 'npm install react@v17' was a no
                go. The dependcy tree wouldn't allow it. I created a backup of my package.json, deleted my package-lock.json and build folder, and installed
                react 17. I then got to go through the joys of having to figure out whcih of my old projects could easily be upgraded to be compatable with
                React 17 and which i might have to depricate. With much effort i was able to move just about everything over. To finish up i made sure my
                project run scripts still worked, everything fired up, and ALL of my tests were broken.
            </p>
            <h2>React 17 comes with a new verion of Jest, Jest 27!</h2>
            <p>
                And your old tests that ran with Jest 26 might not work! After some cajoling i found that the way i was using the done() keyword was no longer
                correct, which i used in all of my tests. I also found that my afterEach() tests were no longer necessary. Oh, and remember how all of those
                Material UI nested components. Yes, i would need to find a new way to test each of those components as well, which is not always easy. How do
                you select the popup created by a Material UI {autocomplete}? {test} and the correct answer will be specific to your exact implementation. So,
                after maticulously fixing over 60 individual integration tests and tweaking all of my backend route tests I was back up and running. All i had
                to do was rebuild my dependancy tree, troubleshoot all of the resulting dependancy problems, figure out how to redo a bunch of frontend
                itegration as well as backend route tests, and now im ready to find out if the new Material style system is any good.
            </p>
            <h2>Saving time using a component library!</h2>
            <p>
                So has Material UI made my life better? It has certainly built some character and the intention if this project is to learn some skills and gain
                experience, mission accomplished. Using Material UI as part of a brand new project would have been a much easier process, that is for sure.
                However, I'm glad i learned some leasons about migrating an existing project over to a component library on my own time. While some components
                certainly look very nice right out of the box the exact implementation of those components is no longer in your hands. Custom styling, testing,
                and compatability with your project dependancies become a bigger question mark and the solutions to those problems might not come with great
                documentation. For example, take a look at Material's {testDocs}. To me the documentation feels a bit sparse.
            </p>
            <h2>Conslusion</h2>
            <p>
                If you are going to use Material UI, or any other component library, for a project that is expected be deliverable, first build out a few
                components in a seperate testsandbox. Customize the components, write some tests, and make sure they place nice with the rest of your project..
                Understand what you are getting into and how the components fit into what you have already built. Down the road if you decide to ditch the
                component library you might find yourself with a bit of a mess.
            </p>
        </div>
    );
};

const MaterialUI = (
    <a href="https://mui.com/" target="_blank">
        Materia UI
    </a>
);

const emotion = (
    <a href="https://emotion.sh/docs/introduction" target="_blank">
        Emotion
    </a>
);

const styled = (
    <a href="https://styled-components.com/" target="_blank">
        Styled
    </a>
);

const system = (
    <a href="https://mui.com/system/basics/" target="_blank">
        MUI System
    </a>
);

const legacyStyles = (
    <a href="https://mui.com/styles/basics/" target="_blank">
        legacy styles
    </a>
);

const test = (
    <a href="https://stackoverflow.com/questions/60882089/how-to-test-material-ui-autocomplete-with-react-testing-library" target="_blank">
        No one is sure
    </a>
);

const autocomplete = (
    <a href="https://mui.com/components/autocomplete/" target="_blank">
        Autocomplete
    </a>
);

const testDocs = (
    <a href="https://mui.com/guides/testing/" target="_blank">
        test documentation
    </a>
);

export default body;
