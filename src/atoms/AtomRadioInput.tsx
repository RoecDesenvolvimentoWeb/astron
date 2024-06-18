import { ReactElement } from "react";

interface IAtomRadioInputProps {
    state: boolean
    onStateChange?: (isActive: boolean) => unknown
    onClick?: () => unknown
}

export const AtomRadioInput = (props: IAtomRadioInputProps): ReactElement => {
    const inactiveElement = (
        <svg onClick={(): void => {
            props.onClick?.()
        }} className="cursor-pointer" width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.5" y="0.5" width="24.6712" height="24.6712" rx="12.3356" fill="#FEFEFE"/>
            <rect x="0.5" y="0.5" width="24.6712" height="24.6712" rx="12.3356" stroke="#76747E"/>
        </svg>
    )
    const activeElement = (
        <svg onClick={(): void => {
            props.onClick?.()
        }} className="cursor-pointer" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.1709" y="0.5" width="24.6712" height="24.6712" rx="12.3356" fill="#FEFEFE"/>
            <circle cx="13.5065" cy="12.8356" r="8.83562" fill="url(#paint0_linear_967_4979)"/>
            <rect x="1.1709" y="0.5" width="24.6712" height="24.6712" rx="12.3356" stroke="#76747E"/>
            <defs>
                <linearGradient id="paint0_linear_967_4979" x1="22.3421" y1="12.8356" x2="4.6709" y2="12.8356" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#572463"/>
                    <stop offset="1" stop-color="#D95DCA"/>
                </linearGradient>
            </defs>
        </svg>
    )
    return (
        <>
            {
                props.state ? activeElement : inactiveElement
            }
        </>
    )
}