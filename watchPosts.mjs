import { buildScript } from "./buildRegister.mjs";
import chokidar from "chokidar";

buildScript();
console.log("setting up watcher");

const watcher = chokidar.watch("./posts", {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
});

watcher
    .on("new", () => {
        console.log("new post added");
        buildScript();
    })
    .on("change", () => {
        console.log("post updated");
        buildScript();
    });
