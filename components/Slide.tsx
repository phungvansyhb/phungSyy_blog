import { LoadingIcon, PlayBackIcon, PlayNextIcon, ReadMoreIcon } from "assets/icons";
import { KeyDb, Post } from "models/blog";
import React from "react";
import { useQuery } from "react-query";
import { useSpringCarousel } from "react-spring-carousel";
import { ReactSpringCarouselItem } from "react-spring-carousel/dist/types/types";
import { getListDocs } from "services/fireBase.service";
type Props = {};

const ItemBlog = ({ category, content, title, updateAt }: Post) => (
    <div className="min-w-[300px] h-max border rounded-lg shadow-xl py-3 px-6 flex flex-col gap-3">
        <div className="text-info">{updateAt}</div>
        <div className="text-sub-header">{title}</div>
        <button className="btn-primary btn w-max">#{category}</button>
        <button className="line-clamp-4 text-start">{content}</button>
        <div className="font-bold flex gap-3 items-center">
            Read More <ReadMoreIcon className={"w-6 h-6"} />
        </div>
    </div>
);

export default function Slide({}: Props) {
    const { data, isLoading } = useQuery(
        "getAllPost",
        () =>
            getListDocs({
                key: KeyDb.POST,
                orderKey: "updateAt",
                count: 5,
                orderDirection: "desc",
            }),
        {
        
        }
    );
    const { carouselFragment, slideToPrevItem, slideToNextItem } = useSpringCarousel({
        withLoop: true,
        itemsPerSlide: function(){
            if(isLoading) return 1
            else if(Array.isArray(data)){
                return data.length > 3 ? 3 : data.length
            }
        }(),
        disableGestures: true,
        items: Array.isArray(data)
            ? (data as Post[]).map((post, key) => ({
                  id: `slide-${key}`,
                  renderItem: <ItemBlog {...post} />,
              }))
            : [{ id: "holder-slide", renderItem: <div className="w-full h-full justify-center items-center"><LoadingIcon className="w-8 h-8 animate-spin"/></div> }],
    });
    return (
        <div className="flex gap-8">
            <button
                onClick={() => {
                    console.log("prev");

                    slideToPrevItem();
                }}
            >
                <PlayBackIcon className="w-9 h-9" />
            </button>

            <div className="flex-grow overflow-hidden">{carouselFragment}</div>
            <button onClick={slideToNextItem}>
                <PlayNextIcon className="w-9 h-9" />
            </button>
        </div>
    );
}
