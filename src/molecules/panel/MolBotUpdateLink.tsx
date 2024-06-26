import { ReactElement } from "react";

interface IMolBotUpdateLinkProps {
    onUpdateLink: () => unknown
}

export const MolBotUpdateLink = ({ onUpdateLink }: IMolBotUpdateLinkProps): ReactElement => {
    return (
        <>
            <div onClick={onUpdateLink} className="cursor-pointer flex flex-row gap-x-2 items-center min-[900px]:sticky min-[900px]:left-[50%]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.9331 13.041C19.7442 14.481 19.167 15.8424 18.2632 16.9792C17.3595 18.116 16.1633 18.9854 14.803 19.4941C13.4427 20.0027 11.9696 20.1315 10.5417 19.8666C9.1138 19.6017 7.78492 18.9531 6.69761 17.9904C5.6103 17.0276 4.80557 15.787 4.36973 14.4017C3.93389 13.0164 3.88338 11.5385 4.22362 10.1266C4.56385 8.71476 5.282 7.42214 6.30104 6.3874C7.32007 5.35266 8.60156 4.61483 10.0081 4.25304C13.9071 3.25304 17.9431 5.26004 19.4331 9.00004" stroke="#D25AC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M20 4V9H15" stroke="#D25AC4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                <div className="text-pink-400 text-lg font-medium font-['Geologica'] leading-[25.20px]">Atualizar link</div>
            </div>
        </>
    )
}