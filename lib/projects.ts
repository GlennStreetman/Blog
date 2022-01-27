import { projectRegister } from "../registers/projectRegister";

export function getSortedProjectData() {
    return Object.values(projectRegister).sort(({ date: a }, { date: b }) => {
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
    return Object.values(projectRegister).map((register) => {
        return {
            params: {
                id: register.id,
            },
        };
    });
}
