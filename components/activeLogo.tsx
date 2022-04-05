// import dynamic from "next/dynamic";
// import Image from "next/image";
import styles from "./activeLogo.module.css";
import { useState, useEffect } from "react";
// const DarkModeButton = dynamic(() => import("../components/darkModeButton"), { ssr: false });

function ActiveLogo() {
    const [darkStyle, setDarkStyle] = useState(styles.hidden);
    const [darkStyleOn, setDarkStyleOn] = useState(styles.hidden);
    const [lightStyle, setLightStyle] = useState(styles.hidden);
    const [lightStyleOn, setLightStyleOn] = useState(styles.hidden);
    // const [darkModeStatus, setDarkModeStatus] = useState("pass");

    useEffect(() => {
        function changeDarkMode() {
            console.log("running change dark mode");
            const lightSwitches = {
                darkOff: setDarkStyle,
                darkOn: setDarkStyleOn,
                lightOff: setLightStyle,
                lightOn: setLightStyleOn,
            };
            const mode = localStorage.siteDarkMode == "true" ? "darkOff" : "lightOff";
            // if (typeof window !== "undefined" && localStorage) {

            Object.entries(lightSwitches).forEach(([key, val]) => {
                if (mode === key) {
                    val(styles.visable);
                } else {
                    val(styles.hidden);
                }
            });
        }

        console.log("adding storage event listener");
        window.addEventListener("darkEvent", () => {
            console.log("storage event logged");
            changeDarkMode();
        });

        return () => {
            console.log("removing storage event listener");
            window.removeEventListener("darkEvent", changeDarkMode);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            if (localStorage.siteDarkMode == "true") {
                // console.log("setting dark", localStorage.siteDarkMode);
                setDarkStyle(styles.visable);
            } else {
                // console.log("setting light", localStorage.siteDarkMode);
                setLightStyle(styles.visable);
            }
        }
    }, []);

    const toggleLights = (on: any, num: string) => {
        // console.log("setting visable", on, num);
        const lightSwitches = {
            darkOff: setDarkStyle,
            darkOn: setDarkStyleOn,
            lightOff: setLightStyle,
            lightOn: setLightStyleOn,
        };

        Object.entries(lightSwitches).forEach(([key, val]) => {
            // console.log(key, val);
            if (on === key) {
                val(styles.visable);
            } else {
                val(styles.hidden);
            }
        });
    };

    return (
        <div className={styles.imgBox}>
            <div className={darkStyle}>
                <img id="darkOff" src="/gstreetDarkOff.png" alt="logo" onClick={() => toggleLights("darkOn", "1")} />
            </div>
            <div className={darkStyleOn}>
                <img id="darkOn" src="/gstreetDarkOn.png" alt="logo" onClick={() => toggleLights("darkOff", "2")} />
            </div>
            <div className={lightStyle}>
                <img id="lightOff" src="/gstreetLightOff.png" alt="logo" onClick={() => toggleLights("lightOn", "3")} />
            </div>
            <div className={lightStyleOn}>
                <img id="lightOn" src="/gstreetLightOn.png" alt="logo" onClick={() => toggleLights("lightOff", "4")} />
            </div>
        </div>
    );
}

export default ActiveLogo;

//h-full aspect-w-3 aspect-h-3 sm:aspect-w-3 sm:aspect-h-4 md:aspect-w-3 md:aspect-h-3 lg:aspect-h-2 lg:aspect-w-3
