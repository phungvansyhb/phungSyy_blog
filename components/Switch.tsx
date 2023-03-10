import React, { useEffect, useRef, useState } from "react";

type Props = {
    defaultChecked?: boolean;
    onChecked?: Function;
    checkedLabel?: React.ReactNode;
    unCheckedLabel?: React.ReactNode;
};

export default function Switch({
    defaultChecked ,
    onChecked,
    checkedLabel,
    unCheckedLabel,
}: Props) {
    const [checked, setChecked] = useState(defaultChecked);

    return (
        <label className="inline-flex relative items-center cursor-pointer ">
            <input
                type="checkbox"
                value=""
                className="sr-only peer"
                defaultChecked={defaultChecked}
                onChange={(e) => {
                    setChecked(e.target.checked);
                    if (onChecked) onChecked(e.target.checked);
                }}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[22%] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span className="ml-3 mobile:ml-1 text-sm font-medium text-gray-900 dark:text-gray-300 ">
                {checked ? checkedLabel||'checked' : unCheckedLabel||'unchecked'}
            </span>
        </label>
    );
}
