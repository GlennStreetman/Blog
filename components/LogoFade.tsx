import styles from "./LogoFade.module.css";
import { useState, useEffect } from "react";
import Image from "next/image";

function LogoFade() {
    const [darkStyle, setDarkStyle] = useState(styles.hidden);
    const [darkStyleFadeIn, setDarkStyleFadeIn] = useState(styles.hidden);
    const [lightStyle, setLightStyle] = useState(styles.hidden);
    const [lightStylefadeIn, setLightStylefadeIn] = useState(styles.hidden);

    useEffect(() => {
        function changeDarkMode() {

            if (localStorage.siteDarkMode == "true") 
            {
                setDarkStyle(styles.visable)
                setDarkStyleFadeIn(styles.fadeIn)
                setLightStyle(styles.hidden)
                setLightStylefadeIn(styles.hidden)
                
            } else {
                setDarkStyle(styles.hidden)
                setDarkStyleFadeIn(styles.hidden)
                setLightStyle(styles.visable)
                setLightStylefadeIn(styles.fadeIn)
                
            }

        }

        window.addEventListener("darkEvent", () => {
            changeDarkMode();
        });

        return () => {
            window.removeEventListener("darkEvent", changeDarkMode);
        };
    }, []);

    useEffect(() => {
        let fadeTimer
        if (typeof window !== "undefined" && localStorage) {
            if (localStorage.siteDarkMode == "true") {
                setDarkStyle(styles.visable);
                setDarkStyleFadeIn(styles.hidden)
                fadeTimer = setTimeout(()=>{ setDarkStyleFadeIn(styles.fadeIn)}, 100)
            } else {
                setLightStyle(styles.visable);
                setLightStylefadeIn(styles.hidden)
                fadeTimer = setTimeout(()=>{ setLightStylefadeIn(styles.fadeIn)}, 100)
            }
        }
        return ()=>{clearTimeout(fadeTimer)}
    }, []);



    return (
        <div className={styles.imgBox}>
            <div className={darkStyle}>
                <Image 
                    width={1080} 
                    height={1080} 
                    layout="responsive" 
                    src="/gstreetDarkOff.png" 
                    alt="logo" 
                />
            </div>
            <div className={darkStyleFadeIn}>
                <Image
                    width={1080}
                    height={1080}
                    layout="responsive"
                    id="darkOn"
                    src="/gstreetDarkOn.png"
                    alt="logo"
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
                />
            </div>
            <div className={lightStylefadeIn}>
                <Image
                    width={1080}
                    height={1080}
                    layout="responsive"
                    id="lightOn"
                    src="/gstreetLightOn.png"
                    alt="logo"
                />
            </div>
        </div>
    );
}

export default LogoFade;
