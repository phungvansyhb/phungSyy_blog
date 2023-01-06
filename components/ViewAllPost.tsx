import { LoadingIcon, MedalIcon } from "assets/icons";
import React, { useState } from "react";
import ListCategory from "./ListCategory";
import { KeyDb, Post } from "models/blog";
import { useQuery } from "react-query";
import { getListDocs } from "services/fireBase.service";
import { BlogItem } from "./BlogItem";
import { useRouter } from "next/router";

type Props = {};

export default function ViewAllPost({}: Props) {
    const router = useRouter();
    const { cateName } = router.query;
    const { data, isLoading } = useQuery(
        ["getAllPost", cateName],
        () =>
            getListDocs({
                key: KeyDb.POST,
                orderKey: "updateAt",
                orderDirection: "desc",
                whereClause: cateName
                    ? [
                          ["category", "==", cateName],
                          ["isPublic", "==", true],
                      ]
                    : [["isPublic", "==", true]],
            }),
        {}
    );
    function renderAllPost() {
        if (isLoading)
            return (
                <div className="w-full flex justify-center">
                    <LoadingIcon className="w-6 h-6 animate-spin" />
                </div>
            );
        if (Array.isArray(data)) {
            return (data as Post[]).map((item, index) => (
                <BlogItem key={index} {...item} type="all" />
            ));
        }
        return <></>;
    }
    return (
        <section>
            <h2 className="flex text-sub-header gap-2 text-primary dark:text-white mb-6">
                Let pick a topic <MedalIcon className="w-6 h-6" />
            </h2>
            <ListCategory />
            <div className="flex flex-col gap-8 mobile:gap-4 mt-8 mobile:mt-4">
                {renderAllPost()}
            </div>
        </section>
    );
}
