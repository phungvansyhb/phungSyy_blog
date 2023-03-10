import React from "react";

type Props = { className: string };

export default function LighThemeIcon({ className }: Props) {
    return (
        <svg
            // width="24"
            // height="24"
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
                fill="#FFC700"
            />
            <path
                d="M12 19C12.83 19 13.5 18.33 13.5 17.5H10.5C10.5 18.33 11.17 19 12 19ZM9 15H15V16.5H9V15ZM12 5C9.24 5 7 7.24 7 10C7 11.64 7.8 13.09 9.03 14H14.98C15.6055 13.5372 16.114 12.9344 16.4648 12.2398C16.8156 11.5452 16.9988 10.7781 17 10C17 7.24 14.76 5 12 5ZM14.43 12.5H9.57C9.23264 12.1767 8.964 11.7886 8.78014 11.3591C8.59629 10.9295 8.501 10.4673 8.5 10C8.5 8.07 10.07 6.5 12 6.5C13.93 6.5 15.5 8.07 15.5 10C15.5 10.95 15.11 11.84 14.43 12.5Z"
                fill="#FFC700"
            />
        </svg>
    );
}
