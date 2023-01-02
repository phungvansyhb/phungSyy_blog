import React, { useDebugValue, useEffect, useState } from "react";

type Props = {};

export default function useHeadingData() {
    const [nestedHeadings, setNestedHeadings] = useState<HTMLHeadingElement[] |[]>([]);

    useEffect(() => {
        if (typeof window !== "undefined") {
            // console.log("hello", document);
            // console.log(document.getElementById('my-post'));
            const post = document.getElementById('my-post')
            console.log(post);
            
            const headingElements = Array.from(post!.getElementsByTagName("h2"));
            // const newNestedHeadings = getNestedHeadings(headingElements);
            setNestedHeadings(headingElements);
        }
    }, []);

    return { nestedHeadings };
}
