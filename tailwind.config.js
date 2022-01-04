module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./posts/**/*..{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "var(--color-bg-primary-user, var(--color-bg-primary))",
                secondary: "var(--color-bg-secondar-user, var(--color-bg-secondary)",
            },
            textColor: {
                accent: "var(--color-text-accent-user, var(--color-text-accent)",
                primary: "var(--color-text-primary-user, var(--color-text-primary)",
                secondary: "var(--color-text-secondary-user, var(--color-text-secondary)",
            },
        },
    },
    plugins: [],
};

// add two classes customDark, customLight
//create function that allows user to append custom classes
//https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
