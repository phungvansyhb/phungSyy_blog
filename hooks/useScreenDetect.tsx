import React, { useDebugValue, useEffect } from "react";

function checkResize(innerWidth: number) {
    if (innerWidth >= 640 && innerWidth < 1024) {
        return "tablet";
    } else if (innerWidth >= 1024 && innerWidth < 1280) {
        return "laptop";
    } else if (innerWidth >= 1280) {
        return "desktop";
    } else {
        return "mobile";
    }
}

export default function useScreenDetect() {
    const [screen, setScreen] = React.useState<"mobile" | "tablet" | "laptop" | "desktop">();
    function updateTypeScreen() {
        const innerWidth = window.innerWidth;
        setScreen(checkResize(innerWidth));
    }
    useEffect(() => {
        window.addEventListener("resize", updateTypeScreen);
        return () => {
            window.removeEventListener("resize", updateTypeScreen);
        };
    }, []);
    useDebugValue(screen, () => `${window.innerWidth}: ${screen}`);
    return screen;
}
