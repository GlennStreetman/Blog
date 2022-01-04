function UserPrefs() {
    if (typeof window !== "undefined" && localStorage) {
        return (
            <style jsx global>
                {`
                    .userDark {
                        --color-bg-primary-user: ${localStorage.backgroundPrimaryD};
                        --color-bg-secondary-user: ${localStorage.backgroundSecondaryD};
                        --color-text-primary-user: ${localStorage.textPrimaryD};
                        --color-text-secondary-user: ${localStorage.textSecondaryD};
                        --color-text-accent-user: ${localStorage.textAccentD};
                    }
                    .userLight {
                        --color-bg-primary-user: ${localStorage.backgroundPrimaryL};
                        --color-bg-secondary-user: ${localStorage.backgroundSecondaryL};
                        --color-text-primary-user: ${localStorage.textPrimaryL};
                        --color-text-secondary-user: ${localStorage.textSecondaryL};
                        --color-text-accent-user: ${localStorage.textAccentL};
                    }
                `}
            </style>
        );
    } else {
        return <></>;
    }
}

export default UserPrefs;

// localStorage.backgroundPrimaryD = '#A52A2A'
