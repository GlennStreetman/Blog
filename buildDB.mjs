import Client from "pg";
import dotenv from "dotenv";
// import versionControl from "./comments/databaseVersionControl.js";
import path from "path";
import fs from "fs";

dotenv.config();

let devDB = new Client.Client({
    sslmode: "disable",
    user: process.env.pguser,
    host: process.env.pghost,
    database: process.env.pgdatabase,
    password: process.env.pgpassword,
    port: process.env.pgport,
});

const runUpdateQuery = async (updateQuery, version, db) => {
    return new Promise(async (resolve, reject) => {
        db.query(updateQuery, (err, rows) => {
            if (err) {
                console.log("Problem setting up Postgres database ", err);
                resolve(false);
            } else {
                console.log(`Version: ${version} of postgres schema setup complete`);
                resolve(true);
            }
        });
    });
};

const getVersion = async (db) => {
    // const __dirname = dirname(fileURLToPath(import.meta.url));
    return new Promise(async (resolve, reject) => {
        // console.log('getting version')
        const versionQuery = "SELECT version FROM VERSION";
        db.query(versionQuery, async (err, rows) => {
            let version;
            if (err) {
                console.log("No version table found, setting up postgres database.");
                const createDB1 = fs.readFileSync(path.resolve(`./comments/db/1.0_create.sql`));
                const buildDB = createDB1.toString();
                console.log(buildDB);
                await runUpdateQuery(buildDB, "1.0", db);
                version = "1.0";
            } else if (rows.rowCount === 0) {
                const createDB1 = fs.readFileSync(path.resolve(`./comments/db/1.0_create.sql`));
                const updateQuery = createDB1.toString();
                console.log(updateQuery);
                await runUpdateQuery(updateQuery, "1.0", db);
                version = "1.0";
            } else {
                // console.log(`getVersion ${rows.rows[0].version}`, rows.rows);
                version = typeof rows.rows[0].version === "string" ? rows.rows[0].version : 0;
            }
            // console.log("version found", version);
            resolve(version);
        });
    });
};

const versionControl = async function (db, arg) {
    const envVersionString = process.env.version ? process.env.version : "1.0";
    const envVersion = parseFloat(envVersionString);
    const dbVersionString = await getVersion(db);
    const dbVersion = typeof dbVersionString === "string" ? parseFloat(dbVersionString) : false;
    if (envVersion && envVersion === dbVersion) {
        //base case: DB up to date.
        console.log(`database schema up to date. v${dbVersion}`);
        if (arg === true) {
            console.log("test mode flag true, exiting");
            process.exit(0);
        }
    } else if (envVersion && typeof dbVersion === "number" && envVersion > dbVersion) {
        //env version greater, run update recursive
        console.log(`Upgrading postgres schema from v${dbVersion}`);
        const getUpdateQuery = fs.readFileSync(path.resolve(`./build/server/db/postgresVersions/${dbVersionString}_upgrade.sql`));
        const updateQuery = getUpdateQuery.toString();
        console.log(updateQuery);
        await runUpdateQuery(updateQuery, `${dbVersion}_upgrade`, db);
        return versionControl(db);
    } else if (envVersion && typeof dbVersion === "number" && envVersion < dbVersion) {
        //env version lesser, run downgrade recursive
        console.log(`Downgrading postgres schema from v${dbVersion}`);
        const getUpdateQuery = fs.readFileSync(path.resolve(`./build/server/db/postgresVersions/${dbVersionString}_downgrade.sql`));
        const updateQuery = getUpdateQuery.toString();
        console.log(updateQuery);
        await runUpdateQuery(updateQuery, `${dbVersion}_upgrade`, db);
        return versionControl(db);
    } else {
        return false;
    }
};

function connectPostgres(arg = false) {
    devDB
        .connect()
        .then(() => {
            console.log("----Connected to Postgres----");
            versionControl(devDB, arg);
        })
        .catch((err) => {
            console.log("ERROR ON PG LOGIN", err);
            devDB = new Client.Client();
            setTimeout(() => {
                connectPostgres();
            }, 5000);
            return true;
        });
}

connectPostgres();

console.log("script running");
