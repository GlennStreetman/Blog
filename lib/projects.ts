import buildProjects from "../lib/buildProjects";

export function getSortedProjectData() {
    console.log("build projects", buildProjects());
    return Object.values(buildProjects()).sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllProjectIds() {
    return Object.values(buildProjects()).map((register) => {
        return {
            params: {
                id: register.id,
            },
        };
    });
}
