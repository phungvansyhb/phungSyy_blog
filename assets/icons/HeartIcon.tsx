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
                d="M18 17.342V14.342H15V12.342H18V9.34204H20V12.342H23V14.342H20V17.342H18ZM11 21.342L7.825 18.492C6.625 17.4087 5.596 16.442 4.738 15.592C3.87933 14.742 3.171 13.942 2.613 13.192C2.05433 12.442 1.646 11.717 1.388 11.017C1.12933 10.317 1 9.58371 1 8.81704C1 7.25037 1.525 5.94604 2.575 4.90404C3.625 3.86271 4.93333 3.34204 6.5 3.34204C7.36667 3.34204 8.19167 3.52104 8.975 3.87904C9.75833 4.23771 10.4333 4.75037 11 5.41704C11.5667 4.75037 12.2417 4.23771 13.025 3.87904C13.8083 3.52104 14.6333 3.34204 15.5 3.34204C16.9167 3.34204 18.104 3.77104 19.062 4.62904C20.0207 5.48771 20.6167 6.49204 20.85 7.64204C20.55 7.52537 20.25 7.43771 19.95 7.37904C19.65 7.32104 19.3583 7.29204 19.075 7.29204C17.3917 7.29204 15.9583 7.87937 14.775 9.05404C13.5917 10.2294 13 11.6587 13 13.342C13 14.2087 13.175 15.0294 13.525 15.804C13.875 16.5794 14.3667 17.242 15 17.792C14.6833 18.0754 14.2707 18.438 13.762 18.88C13.254 19.3214 12.8167 19.7087 12.45 20.042L11 21.342Z"
                fill="#EC5990"
            />
        </svg>
    );
}