import React from "react";
import { setCookie} from 'cookies-next'
import {useRouter} from 'next/router'
import dayjs from "dayjs";
type Props = {};

export default function Login({}: Props) {
    const router = useRouter()
    const inputRef = React.useRef<HTMLInputElement>(null);
    function handleCheckKey(){
        
        const input = inputRef.current
        if(input?.value === process.env.NEXT_PUBLIC_APP_KEY){
            setCookie('appKey', input?.value , {expires : dayjs().add(1,'day').toDate()})
            router.back()
        }else{
            input?.focus()
        }
    }
    return (
        <div className="w-full text-center mt-10">
            <input name="appKey" placeholder="enter app key" ref={inputRef} className='input'></input>
            <button className="btn btn-primary rounded-md font-bold" onClick={handleCheckKey}>Enter</button>
        </div>
    );
}
