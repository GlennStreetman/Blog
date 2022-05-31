import postsRegister from "../lib/buildRegister";

export async function getSortedPostsData() {
    return new Promise(async (res, rej) => {
        const posts = await postsRegister();
        const sorted = Object.values(posts).sort(({ date: a }, { date: b }) => {
            if (a < b) {
                return 1;
            } else if (a > b) {
                return -1;
            } else {
                return 0;
            }
        });
        res(sorted);
    });
}

export async function getAllPostIds() {
    return new Promise(async (res, rej) => {
        const posts = await postsRegister();
        const IDs = Object.values(posts).map((register) => {
            return {
                params: {
                    id: register.id,
                },
            };
        });
        res(IDs);
    });
}
