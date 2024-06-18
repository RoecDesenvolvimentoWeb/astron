import { ReactElement, useState } from "react";

interface IAtomExtraInfoProps {
    message: string
    className?: string
}

export const AtomExtraInfo = (props: IAtomExtraInfoProps): ReactElement => {
    const initialClassName = (props.className ?? "") + " "
    const [isActive, setIsActive] = useState(false)
    const onHoverIs = (active: boolean): void => {
        setIsActive(active)
    }
    return (
        <>
            <div
                onMouseEnter={(): void => {onHoverIs(true)}}
                onMouseLeave={(): void => {onHoverIs(false)}}
                className={initialClassName + "relative z-10 w-fit"}
            >
                {(isActive && props.message) && <p className="absolute left-8 bottom-[-1rem] px-2 py-2 min-w-[300px] shadow-lg border-2 bg-white text-black font-geo text-sm md:text-base font-light rounded-md">{props.message}</p>}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path className={"hover:fill-[#3b3b3c] fill-[#76747E]"} fill-rule="evenodd" clip-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22C6.477 22 2 17.523 2 12ZM12 13C11.7348 13 11.4804 12.8946 11.2929 12.7071C11.1054 12.5196 11 12.2652 11 12V8C11 7.73478 11.1054 7.48043 11.2929 7.29289C11.4804 7.10536 11.7348 7 12 7C12.2652 7 12.5196 7.10536 12.7071 7.29289C12.8946 7.48043 13 7.73478 13 8V12C13 12.2652 12.8946 12.5196 12.7071 12.7071C12.5196 12.8946 12.2652 13 12 13ZM10.5 16C10.5 15.6022 10.658 15.2206 10.9393 14.9393C11.2206 14.658 11.6022 14.5 12 14.5H12.01C12.4078 14.5 12.7894 14.658 13.0707 14.9393C13.352 15.2206 13.51 15.6022 13.51 16V16.01C13.51 16.4078 13.352 16.7894 13.0707 17.0707C12.7894 17.352 12.4078 17.51 12.01 17.51H12C11.6022 17.51 11.2206 17.352 10.9393 17.0707C10.658 16.7894 10.5 16.4078 10.5 16.01V16Z"/>
                </svg>
            </div>
        </>
    )
}