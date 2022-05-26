import postsRegister from "../lib/buildRegister";

export function getSortedPostsData() {
    return Object.values(postsRegister()).sort(({ date: a }, { date: b }) => {
        if (a < b) {
            return 1;
        } else if (a > b) {
            return -1;
        } else {
            return 0;
        }
    });
}

export function getAllPostIds() {
    return Object.values(postsRegister()).map((register) => {
        return {
            params: {
                id: register.id,
            },
        };
    });
}
