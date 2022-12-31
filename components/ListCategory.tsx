import { LoadingIcon } from "assets/icons";
import { KeyDb } from "models/blog";
import React from "react";
import { useQuery } from "react-query";
import { getListDocs } from "services/fireBase.service";
import { useRouter } from "next/router";

export default function ListCategory() {
    const router = useRouter();
    const { cateName } = router.query;

    const { data, isLoading } = useQuery(
        "getAllCategory",
        () =>
            getListDocs({
                key: KeyDb.CATEGORY,
            }),
        { initialData: [] }
    );
    if (isLoading) return <LoadingIcon className="w-6 h-6" />;
    if (Array.isArray(data))
        return (
            <div className="flex gap-4 mobile:gap-2 flex-wrap">
                 <button
                        onClick={() =>
                            router.push({
                                query: { cateName: ''},
                            })
                        }
                        key={-1}
                        className={`btn ${
                             !cateName ? "btn-primary" : "btn-cancel"
                        } rounded-2xl font-medium hover:animate-bounce`}
                    >
                        All
                    </button>
                {data.map((item, index) => (
                    <button
                        onClick={() =>
                            router.push({
                                query: { cateName:   item.name },
                            })
                        }
                        key={index}
                        className={`btn ${
                            item.name === cateName ? "btn-primary" : "btn-cancel"
                        } rounded-2xl font-medium hover:animate-bounce`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        );
    else return <></>;
}
