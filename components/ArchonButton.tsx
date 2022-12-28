import React from "react";
import { Tooltip } from "react-tooltip";

type Props = {
    icon?: React.ReactNode;
    color?: string;
    position?: { top?: number; left?: number; bottom?: number; right?: number };
    action?: Function;
    width?: number;
    height?: number;
    tooltip?: string;
};

export default function ArchonButton({
    icon,
    color,
    position,
    action,
    width,
    height,
    tooltip,
}: Props) {
    return (
        <>
            <button
                className="rounded-full shadow-lg fixed z-20 flex justify-center items-center  hover:animate-bounce"
                style={{
                    backgroundColor: color || "green",
                    top: position?.top,
                    right: position?.right,
                    left: position?.left,
                    bottom: position?.bottom,
                    width: width || 40 + "px",
                    height: height || 40 + "px",
                }}
                onClick={() => action && action()}
            >
                {icon}
            </button>
        </>
    );
}
