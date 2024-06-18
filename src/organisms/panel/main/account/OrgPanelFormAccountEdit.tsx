import { MolFormAccountUpdate } from "@mols/panel/MolFormAccountUpdate";
import { MolUserProfilePhotoEdit } from "@mols/panel/MolUserProfilePhotoEdit";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement, useEffect, useState } from "react";
import { Profile } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelFormAccountEditProps {
    userName: string
    role: string
    createdAt: Date
    accountData: Profile
    onUpdateProfile: (data: Profile & { password: string }) => unknown
    onExcludeAccount: () => unknown
}

export const OrgPanelFormAccountEdit = (props: IOrgPanelFormAccountEditProps): ReactElement => {
    const md = useMediaQuery("(max-width: 768px)")

    const [profile, setProfile] = useState<Profile>(props.accountData)

    const onUpdateProfile = (data: Profile & { password: string }): void => {
        props.onUpdateProfile(data)
    }

    useEffect(() => {
        setProfile(props.accountData)
    }, [props.accountData])

    return (
        <>
            <div className="bg-white rounded-[16px] flex flex-col pt-[60px] pb-[64px] px-[43px] w-full md:w-fit h-full md:min-w-[812px]">
                <div className="flex flex-col-reverse gap-3 md:gap-0 md:flex-row w-full h-fit items-center">
                    <div className="w-fit flex flex-col md:flex-row gap-[24px] items-center">
                        <MolUserProfilePhotoEdit/>
                        <div className="flex h-fit flex-col md:text-start text-center gap-[8px]">
                            <div className="w-fit h-[37px] text-[#302A59] text-[32px] font-medium font-geo leading-[44.80px]">{props.userName.substring(0, 15)}{props.userName.length > 15 ? "..." : ""}</div>
                            <div className="text-[#A09FA5] text-base font-normal font-['Geologica'] leading-snug">{props.role}</div>
                        </div>
                    </div>
                    {!md && <>
                        <div className="md:mx-auto">
                            <svg width="1" height="47" viewBox="0 0 1 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect opacity="0.2" y="47" width="47" height="1" transform="rotate(-90 0 47)" fill="#A09FA5"/>
                            </svg>
                        </div>
                    </>}
                    <div className="md:ml-auto flex flex-row items-center gap-x-[12px] h-fit">
                        <>
                            <svg width="25" height="37" viewBox="0 0 25 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.7284 18.8891L13.9581 17.9957L9.95126 22.2432C9.14755 23.0957 7.71575 22.6555 7.52792 21.5L6.59439 15.736L1.31581 13.2368C0.257431 12.7363 0.233725 11.2388 1.27472 10.7036L4.21913 9.19048C4.21935 9.18913 4.22071 9.18958 4.22071 9.18958L6.46864 8.03345L7.21388 2.24239C7.36221 1.08129 8.77887 0.594991 9.60991 1.4197L13.7538 5.53447L19.4932 4.45329C20.643 4.23678 21.5431 5.4331 21.0155 6.47816L18.3829 11.691L20.6829 15.8966L21.1853 16.8141C21.7456 17.8417 20.8866 19.0672 19.7284 18.8891Z" fill="#C6B6C9"/>
                                <path d="M19.1276 5.67964L13.2044 7.57223L9.24437 2.64606C8.58876 1.99586 7.56808 2.16112 7.09375 2.83028L7.21363 1.90352C7.36196 0.742418 8.77862 0.256124 9.60966 1.08084L13.7535 5.1956L19.4929 4.11442C20.6427 3.89791 21.5428 5.09423 21.0152 6.13929L20.7463 6.67165C20.5522 6.0219 19.8957 5.53515 19.1276 5.67964Z" fill="#BF75CC"/>
                                <path d="M8.92853 23.1962C8.73911 23.1962 8.54767 23.168 8.35961 23.1104C7.65545 22.8943 7.145 22.3085 7.02715 21.5813L6.13584 16.0806L1.09905 13.6965C0.433501 13.3813 0.0124528 12.7282 0.000261528 11.9918C-0.0117039 11.2553 0.387671 10.5886 1.04261 10.252L5.99857 7.70451L6.7095 2.1776C6.80342 1.44703 7.29468 0.844916 7.99116 0.605833C8.68764 0.366749 9.4453 0.540587 9.96795 1.05962L13.9224 4.98587L19.3985 3.95413C20.1221 3.818 20.8468 4.09885 21.2893 4.68741C21.732 5.27598 21.8007 6.05012 21.4686 6.70754L18.9565 11.6816L21.63 16.5707C21.9833 17.2168 21.94 17.9928 21.5169 18.5956C21.0938 19.1984 20.3788 19.5029 19.6509 19.3905L14.1441 18.5385L10.3204 22.592C9.95011 22.9846 9.44756 23.1962 8.92853 23.1962ZM8.62217 1.51566C8.52238 1.51566 8.42101 1.53237 8.321 1.56691C7.98777 1.68114 7.76223 1.95793 7.71708 2.30741L6.93797 8.36397L1.50701 11.1555C1.19365 11.3165 1.0101 11.6231 1.01597 11.9751C1.02184 12.3272 1.21532 12.6273 1.53365 12.7781L7.05311 15.3906L8.02999 21.4185C8.08643 21.7662 8.321 22.0355 8.65761 22.1387C8.99445 22.2419 9.33965 22.1507 9.58121 21.8947L13.7716 17.4528L19.8063 18.3863C20.1544 18.4402 20.4829 18.3 20.6854 18.012C20.8879 17.7239 20.9075 17.3672 20.7387 17.0581L17.8089 11.7003L20.5619 6.24947C20.7206 5.93498 20.689 5.57918 20.4775 5.29765C20.2657 5.01612 19.9327 4.88699 19.5868 4.95223L13.5858 6.08286L9.25227 1.78025C9.07731 1.60687 8.85425 1.51566 8.62217 1.51566Z" fill="#32063D"/>
                                <rect x="11.7188" y="26.4964" width="1.28584" height="11.1769" rx="0.642919" transform="rotate(-26.4923 11.7188 26.4964)" fill="#491F50"/>
                                <rect x="14.8359" y="22.3401" width="1.28584" height="11.1769" rx="0.642919" transform="rotate(-26.4923 14.8359 22.3401)" fill="#491F50"/>
                                <rect x="20.9688" y="22.9329" width="1.28584" height="5.62486" rx="0.642919" transform="rotate(-26.4923 20.9688 22.9329)" fill="#491F50"/>
                            </svg>
                        </>
                        <div className="text-neutral-400 text-lg font-medium font-['Geologica'] leading-[25.20px]">Membro desde {props.createdAt.getFullYear()}</div>
                    </div>
                </div>
                <div className="w-full">
                    <MolFormAccountUpdate
                        onExcludeAccount={props.onExcludeAccount}
                        onUpdateProfile={onUpdateProfile}
                        data={profile}
                    />
                </div>
            </div>
        </>
    )
}