import { ReactElement } from "react";

interface IMolLoadMoreRedirectBtnProps {
    onLoadMore: () => unknown
}

export const MolLoadMoreRedirectBtn = ({ onLoadMore }: IMolLoadMoreRedirectBtnProps): ReactElement => {
    return (
        <>
            <div className="w-full py-[40px] h-[32.4px] flex items-center justify-center bg-white border-y-[1px] border-solid border-[#E5E6E5]">
                <svg onClick={onLoadMore} className="cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                    <path d="M16.1875 32.375C7.26125 32.375 0 25.1138 0 16.1875C0 7.26125 7.26125 0 16.1875 0C25.1138 0 32.375 7.26125 32.375 16.1875C32.375 25.1138 25.1138 32.375 16.1875 32.375ZM16.1875 2.3125C8.53312 2.3125 2.3125 8.53312 2.3125 16.1875C2.3125 23.8419 8.53312 30.0625 16.1875 30.0625C23.8419 30.0625 30.0625 23.8419 30.0625 16.1875C30.0625 8.53312 23.8419 2.3125 16.1875 2.3125Z" fill="#E7DFE9"/>
                    <path d="M16.1875 24.2812C15.54 24.2812 15.0312 23.7725 15.0312 23.125V9.25C15.0312 8.6025 15.54 8.09375 16.1875 8.09375C16.835 8.09375 17.3438 8.6025 17.3438 9.25V23.125C17.3438 23.7725 16.835 24.2812 16.1875 24.2812Z" fill="#E7DFE9"/>
                    <path d="M23.125 17.3438H9.25C8.6025 17.3438 8.09375 16.835 8.09375 16.1875C8.09375 15.54 8.6025 15.0312 9.25 15.0312H23.125C23.7725 15.0312 24.2812 15.54 24.2812 16.1875C24.2812 16.835 23.7725 17.3438 23.125 17.3438Z" fill="#E7DFE9"/>
                </svg>
            </div>
        </>
    )
}