import React, { useState, useEffect } from "react";

function getWindowDimensions() {
    const { width: width, height: height } = window?.visualViewport ? window?.visualViewport : 
    {
        width: Math.min(document.documentElement.clientWidth || 0, window.innerWidth || 0), 
        height:  Math.min(document.documentElement.clientHeight || 0, window.innerHeight || 0)
    };
    return {
        width,
        height,
    };
}

export const ScreenWidth = React.createContext();

function ScreenWidthComponent({ children }) {
    const [width, setWidth] = useState(0);
    useEffect(() => {
        setWidth(getWindowDimensions());
    }, []);

    useEffect(() => {
        //handle resize
        function handleResize() {
            setWidth(getWindowDimensions());
        }
        // console.log('vw', Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), 'vh', Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0))

        setTimeout(() => setWidth(getWindowDimensions(), 2000));
        setTimeout(() => setWidth(getWindowDimensions(), 10000));
        setTimeout(() => setWidth(getWindowDimensions(), 200000));

        if (window.visualViewport) {
            window.visualViewport.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        } else {
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
        
    }, []);

    return <ScreenWidth.Provider value={width}>{children}</ScreenWidth.Provider>;
}

export default ScreenWidthComponent;