import React from 'react';

type Props = {
    className?: string;
};

export default function UploadIcon({ className }: Props) {
    return (
        <svg
            width="30"
            height="30"
            className={className}
            viewBox="0 0 30 30"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M2.5 15H5V21.25H25V15H27.5V21.25C27.5 22.6375 26.3875 23.75 25 23.75H5C4.33696 23.75 3.70107 23.4866 3.23223 23.0178C2.76339 22.5489 2.5 21.913 2.5 21.25V15ZM15 2.5L8.075 9.325L9.85 11.1L13.75 7.1875V18.75H16.25V7.1875L20.1625 11.1L21.9375 9.3125L15 2.5Z"
                fill="#CCCCCC"
            />
        </svg>
    );
}
