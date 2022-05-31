import buildProjects from "../lib/buildProjects";

export async function getSortedProjectData() {
    const projects = await buildProjects();
    return Object.values(projects).sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export async function getAllProjectIds() {
    const projects = await buildProjects();
    return Object.values(projects).map((register) => {
        return {
            params: {
                id: register.id,
            },
        };
    });
}
