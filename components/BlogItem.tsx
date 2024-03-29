import Link from 'next/link';
import React from 'react';
import { ReadMoreIcon } from 'assets/icons';
import { ReturnPost } from 'models/blog';
import { convertTimestampFirebase } from 'utils/DayJs';
import { useRouter } from 'next/router';
import EyeIcon from 'assets/icons/EyeIcon';

export const BlogItem = ({
    category,
    title,
    updateAt,
    createAt,
    type,
    id,
    description,
    path,
    view
}: ReturnPost & {
    type: 'slide' | 'all' | 'related';
}) => {
    const router = useRouter();
    function navigateDetail() {
        router.push({
            pathname: '/' + path,
        });
    }
    return (
        <div
            className={`min-w-[300px] ${type === 'related' && 'w-1/4 tablet:w-1/2 mobile:w-full'} 
            dark:border-slate-800 border w-full h-full
              ${type !== 'slide' && 'light-item-shadow'} dark:shadow-2xl
             bg-white dark:bgc-deep-dark 
               rounded-lg py-3 px-6 flex flex-col gap-3 ${type === 'slide' && 'mx-4'}`}
        >
            <div className='flex justify-between'>
                <div className="text-info dark:text-white first-letter:uppercase">
                    {convertTimestampFirebase({ date: createAt })}
                </div>
                <div className='dark:text-white font-semibold text-xs flex gap-2'><div>{view || 0}</div> <EyeIcon className='w-4 h-4' /> </div>
            </div>


            <Link
                className="text-sub-header  dark:text-white cursor-pointer 
                    first-letter:uppercase"
                href={'/' + path}
            >
                {title}
            </Link>
            <button className="btn-primary btn w-max text-xs dark:text-white">#{category}</button>
            <div className="line-clamp-2 text-start dark:text-white">{description}</div>
            <div
                className="font-bold flex gap-3 items-center dark:text-white cursor-pointer"
                onClick={navigateDetail}
            >
                Read More <ReadMoreIcon className={'w-6 h-6'} />
            </div>
        </div>
    );
};
