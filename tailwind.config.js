module.exports = {
    content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./posts/**/*..{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            backgroundColor: {
                primary: "var(--color-bg-primary-user, var(--color-bg-primary))",
                secondary: "var(--color-bg-secondary-user, var(--color-bg-secondary))",
                textPrimary: "var(--color-text-primary-user, var(--color-text-primary))",
                textSecondary: "var(--color-text-secondary-user, var(--color-text-secondary))",
                textAccent: "var(--color-text-accent-user, var(--color-text-accent))",
            },
            textColor: {
                primary: "var(--color-text-primary-user, var(--color-text-primary))",
                secondary: "var(--color-text-secondary-user, var(--color-text-secondary))",
                accent: "var(--color-text-accent-user, var(--color-text-accent))",
            },
            colors: {
                strong: "var(--color-hover-strong-user, var(--color-hover-strong))",
                weak: "var(--color-hover-weak-user, var(--color-hover-weak))",
            },
            keyframes: {
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
                ripple: {
                    "0%, 100%": { transform: "scale(4)", opactiy: 0 },
                },
            },
            animation: {
                wiggle: "wiggle 200ms ease-in-out",
                ripple: "ripple 600ms linear",
            },
        },
    },
    plugins: [],
};

// add two classes customDark, customLight
//create function that allows user to append custom classes
//https://stackoverflow.com/questions/1720320/how-to-dynamically-create-css-class-in-javascript-and-apply
