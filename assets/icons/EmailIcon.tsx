import React from "react";

type Props = { className: string };

export default function EmailIcon({ className }: Props) {
    return (
        <svg
            // width="32"
            // height="32"
            className={className}
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M28 6H4C3.46957 6 2.96086 6.21071 2.58579 6.58579C2.21071 6.96086 2 7.46957 2 8V24C2 24.5304 2.21071 25.0391 2.58579 25.4142C2.96086 25.7893 3.46957 26 4 26H28C28.5304 26 29.0391 25.7893 29.4142 25.4142C29.7893 25.0391 30 24.5304 30 24V8C30 7.46957 29.7893 6.96086 29.4142 6.58579C29.0391 6.21071 28.5304 6 28 6V6ZM25.8 8L16 14.78L6.2 8H25.8ZM4 24V8.91L15.43 16.82C15.5974 16.9361 15.7963 16.9984 16 16.9984C16.2037 16.9984 16.4026 16.9361 16.57 16.82L28 8.91V24H4Z"
                fill="#EC5990"
            />
        </svg>
    );
}
