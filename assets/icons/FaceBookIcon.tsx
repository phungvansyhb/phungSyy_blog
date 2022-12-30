import React from "react";

type Props = {
    className: string;
};

export default function EditIcon({ className }: Props) {
    return (
        <svg
            // width="24"
            // height="25"
            className={className}
            viewBox="0 0 24 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2.38208C6.5 2.38208 2 6.87208 2 12.4021C2 17.4021 5.66 21.5521 10.44 22.3021V15.3021H7.9V12.4021H10.44V10.1921C10.44 7.68208 11.93 6.30208 14.22 6.30208C15.31 6.30208 16.45 6.49208 16.45 6.49208V8.96208H15.19C13.95 8.96208 13.56 9.73208 13.56 10.5221V12.4021H16.34L15.89 15.3021H13.56V22.3021C15.9164 21.9299 18.0622 20.7276 19.6099 18.9121C21.1576 17.0967 22.0054 14.7877 22 12.4021C22 6.87208 17.5 2.38208 12 2.38208Z"
                fill="#EC5990"
            />
        </svg>
    );
}
