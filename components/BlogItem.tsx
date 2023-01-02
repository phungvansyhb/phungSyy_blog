import { ReadMoreIcon } from "assets/icons";
import { Post } from "models/blog";
import React from "react";
import { useRouter } from "next/router";
import { toSlug } from "utils/toSlug";

export const BlogItem = ({
    category,
    content,
    title,
    updateAt,
    type,
    id,
    description,
}: Post & { type: "slide" | "all" | "related" }) => {
    const router = useRouter();
    function navigateDetail() {
        router.push({
            pathname: "/blog/" + id,
        });
    }
    return (
        <div
            className={`min-w-[300px] ${type === "related" && "w-1/4"} h-max 
            dark:border-slate-800 border
              ${type !== "slide" && "light-item-shadow"} dark:shadow-2xl
             bg-white dark:bgc-deep-dark 
               rounded-lg py-3 px-6 flex flex-col gap-3 ${type === "slide" && "mx-4"}`}
        >
            <div className="text-info dark:text-white">{updateAt}</div>
            <div
                className="text-sub-header  dark:text-white cursor-pointer 
                    first-letter:uppercase
                "
                onClick={navigateDetail}
            >
                {title}
            </div>
            <button className="btn-primary btn w-max text-xs dark:text-white">#{category}</button>
            <div className="line-clamp-2 text-start dark:text-white">{description}</div>
            <div
                className="font-bold flex gap-3 items-center dark:text-white cursor-pointer"
                onClick={navigateDetail}
            >
                Read More <ReadMoreIcon className={"w-6 h-6"} />
            </div>
        </div>
    );
};
