import React from "react";
import { LoadingIcon } from "assets/icons";


export default function PageLoading() {
    return (
        <div className="fixed w-screen h-screen flex justify-center items-center z-50">
            <div className="fixed w-screen h-screen bg-slate-300 dark:bgc-dark opacity-70"></div>
            <LoadingIcon className="w-[60px] h-[60px] animate-spin"/>
        </div>
    );
}
