import styles from "./LogoHover.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

function LogoHover() {
    const [darkStyle, setDarkStyle] = useState(styles.hidden);
    const [darkStyleOn, setDarkStyleOn] = useState(styles.hidden);
    const [lightStyle, setLightStyle] = useState(styles.hidden);
    const [lightStyleOn, setLightStyleOn] = useState(styles.hidden);

    useEffect(() => {
        function changeDarkMode() {
            const lightSwitches = {
                darkOff: setDarkStyle,
                darkOn: setDarkStyleOn,
                lightOff: setLightStyle,
                lightOn: setLightStyleOn,
            };
            const mode = localStorage.siteDarkMode == "true" ? "darkOff" : "lightOff";

            Object.entries(lightSwitches).forEach(([key, val]) => {
                if (mode === key) {
                    val(styles.visable);
                } else {
                    val(styles.hidden);
                }
            });
        }

        window.addEventListener("darkEvent", () => {
            changeDarkMode();
        });

        return () => {
            window.removeEventListener("darkEvent", changeDarkMode);
        };
    }, []);

    useEffect(() => {
        if (typeof window !== "undefined" && localStorage) {
            if (localStorage.siteDarkMode == "true") {
                setDarkStyle(styles.visable);
            } else {
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
                <Image width={1080} height={1080} layout="responsive" src="/gstreetDarkOff.png" alt="logo" onMouseOver={() => toggleLights("darkOn", "1")} />
            </div>
            <div className={darkStyleOn}>
                <Image
                    width={1080}
                    height={1080}
                    layout="responsive"
                    id="darkOn"
                    src="/gstreetDarkOn.png"
                    alt="logo"
                    onMouseLeave={() => toggleLights("darkOff", "2")}
                />
            </div>
            <div className={lightStyle}>
                <Image
                    width={1080}
                    height={1080}
                    layout="responsive"
                    id="lightOff"
                    src="/gstreetLightOff.png"
                    alt="logo"
                    onMouseOver={() => toggleLights("lightOn", "3")}
                />
            </div>
            <div className={lightStyleOn}>
                <Image
                    width={1080}
                    height={1080}
                    layout="responsive"
                    id="lightOn"
                    src="/gstreetLightOn.png"
                    alt="logo"
                    onMouseLeave={() => toggleLights("lightOff", "4")}
                />
            </div>
        </div>
    );
}

export default LogoHover;
