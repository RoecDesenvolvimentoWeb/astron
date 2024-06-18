import menuIcon from "@asset/menu-icon.svg";
import { AtomCloseBtn } from "@atom/AtomCloseBtn";
import { ILink, MolIconLink } from "@mols/panel/MolIconLink";
import { MolMenuLogo } from "@mols/panel/MolMenuLogo";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement, useEffect, useState } from "react";

interface IOrgPanelLateralMenuProps {
    className?: string;
}

const configLinks: ILink[] = [
    {
        path: "/panel/telegram/config",
        name: "Botões de início",
    },
    {
        path: "/panel/telegram/redirectbtns",
        name: "Botões Redirecionamento",
    },
    {
        path: "/panel/rewardtask",
        name: "Tarefas de recompensa",
    },
];
const botLinks: ILink[] = [
    {
        path: "/panel/plan",
        name: "Planos de pagamento",
    },
    {
        path: "/panel/signature",
        name: "Ativar assinatura",
    },
    {
        path: "/panel/bot/creation",
        name: "Criar novo bot",
    },
    {
        path: "/panel/bot/config",
        name: "Atualizar bot",
    },
    {
        path: "/panel/channelfree",
        name: "Canal Free",
    },
];
const alertLinks: ILink[] = [
    {
        path: "/panel/remarketing",
        name: "Adicionar novo alerta",
    },
];
const resultsLink: ILink[] = [
    {
        path: "/panel/member/report",
        name: "Membros",
    },
];
const accountLink: ILink[] = [
    {
        path: "/panel/account",
        name: "Editar meus dados",
    },
    {
        path: "/panel/payment/account",
        name: "Vincular contas",
    },
    {
        path: "/panel/terms",
        name: "Termos de uso",
    },
];

export const OrgPanelLateralMenu = ({
    className,
}: IOrgPanelLateralMenuProps): ReactElement => {
    const [isHovering, setIsHovering] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const deviceMatches = useMediaQuery("(max-width: 768px)");
    const showMenu = deviceMatches ? isActive : true;

    const resetStatusOnClickInMobile = (): void => {
        if (deviceMatches) setIsActive(false);
    };

    const logout = (): void => {
        localStorage.removeItem("session-auth");
        location.href = "/login";
    };

    useEffect(() => {
        if (isActive) {
            document.body.style.overflowY = "hidden";
        } else {
            document.body.style.overflowY = "auto";
        }
    }, [isActive]);

    const wrapperDivProps = !deviceMatches
        ? {
            onMouseOverCapture: (): void => {
                setIsHovering(true);
                setIsActive(true);
            },
            onMouseOutCapture: (): void => {
                setIsHovering(false);
                setIsActive(false);
            },
            // Desktop rules
            className:
          "h-screen flex flex-col items-start justify-top pt-[42px] px-4 pb-8 gap-[50px] w-fit max-w-fit bg-white shadow-lg " +
          className,
        }
        : {
        // Mobile rules
            className:
          "w-screen h-screen fixed top-0 right-0 z-[90] flex flex-col items-start justify-top pt-[22px] px-4 gap-[20px] bg-white shadow-lg " +
          className,
        };
    return (
        <>
            <div className="flex flex-col z-[90] md:h-screen md:w-fit min-w-[60px] max-md:h-[60px] max-md:items-center max-md:justify-center max-md:drop-shadow-md  max-md:bg-white max-md:rounded-[25px]">
                {deviceMatches && (
                    <div
                        onClick={(): void => {
                            setIsActive(!isActive);
                            setIsHovering(!isActive);
                        }}
                        className={
                            "cursor-pointer h-fit flex-1 w-fit md:absolute z-50 right-0 ml-2 md:mt-14 mr-2 max-md:flex-none"
                        }
                    >
                        <img width={"26px"} height={"20px"} src={menuIcon} />
                    </div>
                )}
                {showMenu && (
                    <div {...wrapperDivProps}>
                        {deviceMatches ? (
                            <div className="w-full flex flex-row justify-between px-[16px]">
                                <div className="w-[59px] text-zinc-700 text-xl font-medium font-['Geologica'] leading-relaxed">
                  Menu
                                </div>
                                <AtomCloseBtn
                                    onClick={(): void => {
                                        setIsActive(false);
                                    }}
                                />
                            </div>
                        ) : (
                            <MolMenuLogo
                                logo={
                                    deviceMatches ? "hover" : isHovering ? "hover" : "nohover"
                                }
                            />
                        )}
                        <div
                            className={
                                "flex justify-start flex-col overflow-x-hidden overflow-y-auto overscroll-contain w-full px-2 pb-8 items-center max-md:px-[50px]"
                            }
                        >
                            <div className="h-full w-fit min-w-[250px] md:min-w-0 gap-[32px] flex flex-col ">
                                <MolIconLink
                                    onClick={resetStatusOnClickInMobile}
                                    path={"/panel"}
                                    iconIsLink={true}
                                    Icon={
                                        <svg
                                            width="29"
                                            height="29"
                                            viewBox="0 0 29 29"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clip-path="url(#clip0_827_928)">
                                                <path
                                                    d="M10.9701 19.4971H17.9966"
                                                    stroke-width="2.2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                                <path
                                                    d="M6.94566 5.68029C6.92567 5.69638 6.90625 5.71317 6.88744 5.73061C6.39867 6.18389 5.95864 6.57419 5.55802 6.92729C5.50343 6.97541 5.44935 7.02303 5.39582 7.07016C5.06061 7.36532 4.74699 7.64145 4.46462 7.90211C3.80851 8.50776 3.24252 9.09916 2.81572 9.84391C1.96367 11.3307 1.79996 13.2097 1.79996 16.57C1.79996 19.0963 1.94699 21.0879 2.34918 22.6356C2.75886 24.2122 3.45459 25.4074 4.59408 26.2253C5.69848 27.0181 7.08734 27.3578 8.67242 27.5212C10.2468 27.6834 12.1694 27.6834 14.4292 27.6834H14.4831H14.5369C16.7967 27.6834 18.7193 27.6834 20.2937 27.5212C21.8788 27.3578 23.2676 27.0181 24.372 26.2253C25.5115 25.4074 26.2072 24.2122 26.6169 22.6356C27.0191 21.0879 27.1661 19.0963 27.1661 16.57C27.1661 13.2099 27.0027 11.3309 26.1511 9.84409C25.7245 9.09929 25.1586 8.50786 24.5026 7.90218C24.2199 7.64124 23.906 7.36481 23.5705 7.06931C23.5173 7.02246 23.4635 6.97514 23.4093 6.92732C23.0087 6.57421 22.5686 6.1839 22.0799 5.73061C22.0611 5.71322 22.0418 5.69649 22.0218 5.68045C21.783 5.48808 21.5065 5.2551 21.2034 4.99965C20.4847 4.39404 19.6162 3.6622 18.7441 3.0461C17.5166 2.17901 15.9914 1.31675 14.4492 1.31675C12.9022 1.31675 11.3886 2.18631 10.1762 3.05554C9.34827 3.64911 8.51134 4.36057 7.8147 4.95277C7.48935 5.22934 7.1946 5.4799 6.94566 5.68029Z"
                                                    stroke-width="2.2"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_827_928">
                                                    <rect width="29" height="29" fill="white" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    }
                                    message={"Dashboard"}
                                    showMessage={isHovering}
                                />
                                <MolIconLink
                                    onClick={resetStatusOnClickInMobile}
                                    iconIsLink={false}
                                    Icon={
                                        <svg
                                            width="30"
                                            height="29"
                                            viewBox="0 0 30 29"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M15 11.4795C16.6686 11.4795 18.0208 12.8318 18.0208 14.5003C18.0208 16.1689 16.6686 17.5212 15 17.5212C13.3314 17.5212 11.9792 16.1689 11.9792 14.5003C11.9792 12.8318 13.3314 11.4795 15 11.4795Z"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M24.8697 8.76088C24.0437 7.32024 22.2152 6.82729 20.7861 7.65921C19.5431 8.38132 17.9895 7.47779 17.9895 6.03238C17.9895 4.36973 16.6504 3.021 14.9997 3.021C13.349 3.021 12.0099 4.36973 12.0099 6.03238C12.0099 7.47779 10.4564 8.38132 9.2145 7.65921C7.78419 6.82729 5.95572 7.32024 5.12977 8.76088C4.305 10.2015 4.79441 12.0432 6.22472 12.8739C7.46661 13.5972 7.46661 15.4031 6.22472 16.1264C4.79441 16.9583 4.305 18.8 5.12977 20.2394C5.95572 21.6801 7.78419 22.173 9.21331 21.3423H9.2145C10.4564 20.619 12.0099 21.5225 12.0099 22.968C12.0099 24.6306 13.349 25.9793 14.9997 25.9793C16.6504 25.9793 17.9895 24.6306 17.9895 22.968C17.9895 21.5225 19.5431 20.619 20.7861 21.3423C22.2152 22.173 24.0437 21.6801 24.8697 20.2394C25.6956 18.8 25.205 16.9583 23.7759 16.1264H23.7747C22.5328 15.4031 22.5328 13.5972 23.7759 12.8739C25.205 12.0432 25.6956 10.2015 24.8697 8.76088Z"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    }
                                    message={"Configurações"}
                                    showMessage={isHovering}
                                    links={configLinks}
                                />
                                <MolIconLink
                                    onClick={resetStatusOnClickInMobile}
                                    iconIsLink={true}
                                    path="/panel/bot/creation"
                                    Icon={
                                        <svg
                                            width="34"
                                            height="34"
                                            viewBox="0 0 34 34"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M25.1501 19.8335C25.5687 19.8335 25.9832 19.9159 26.3699 20.0761C26.7566 20.2363 27.108 20.4711 27.404 20.7671C27.7 21.0631 27.9348 21.4145 28.095 21.8012C28.2551 22.1879 28.3376 22.6024 28.3376 23.021V24.3017C28.3378 25.0674 28.1724 25.8242 27.8528 26.5201C27.5332 27.216 27.067 27.8346 26.486 28.3335C24.2689 30.2375 21.0942 31.1668 17 31.1668C12.9058 31.1668 9.73533 30.2375 7.5225 28.3335C6.94232 27.8349 6.47665 27.217 6.15733 26.5219C5.83801 25.8267 5.67257 25.0709 5.67233 24.3059V23.0196C5.67271 22.1744 6.0087 21.3641 6.60643 20.7666C7.20416 20.1691 8.0147 19.8335 8.85983 19.8335H25.1501ZM25.1501 21.9585H8.85842C8.57662 21.9585 8.30637 22.0704 8.10712 22.2697C7.90786 22.469 7.79592 22.7392 7.79592 23.021V24.3059C7.79592 25.2338 8.2025 26.1164 8.90658 26.7227C10.6887 28.2556 13.3747 29.0418 17 29.0418C20.6267 29.0418 23.3155 28.2527 25.1033 26.7185C25.4515 26.4191 25.7309 26.048 25.9223 25.6306C26.1138 25.2133 26.2128 24.7594 26.2126 24.3002V23.0182C26.2126 22.7364 26.1006 22.4661 25.9014 22.2669C25.7021 22.0676 25.4319 21.9557 25.1501 21.9557V21.9585ZM16.8583 2.842L17 2.8335C17.2568 2.83351 17.5048 2.92649 17.6983 3.09525C17.8918 3.26401 18.0177 3.49713 18.0526 3.7515L18.0625 3.896L18.0611 4.95708H23.0194C23.8648 4.95708 24.6755 5.2929 25.2733 5.89068C25.8711 6.48845 26.2069 7.2992 26.2069 8.14458V14.5267C26.2069 15.372 25.8711 16.1828 25.2733 16.7806C24.6755 17.3783 23.8648 17.7142 23.0194 17.7142H10.9777C10.1324 17.7142 9.32162 17.3783 8.72385 16.7806C8.12607 16.1828 7.79025 15.372 7.79025 14.5267V8.146C7.79025 7.72729 7.87274 7.31268 8.03302 6.92587C8.19329 6.53905 8.42821 6.1876 8.72435 5.89159C9.02048 5.59559 9.37204 5.36083 9.75893 5.20072C10.1458 5.04062 10.5605 4.95831 10.9792 4.9585L15.9375 4.95708V3.896C15.9376 3.63903 16.0307 3.39079 16.1998 3.19726C16.3688 3.00373 16.6023 2.87802 16.8569 2.84341L17 2.8335L16.8555 2.84341L16.8583 2.842ZM23.0208 7.0835H10.9792C10.6974 7.0835 10.4271 7.19544 10.2279 7.39469C10.0286 7.59395 9.91667 7.8642 9.91667 8.146V14.5267C9.91667 15.1132 10.3927 15.5892 10.9792 15.5892H23.0208C23.3026 15.5892 23.5729 15.4772 23.7721 15.278C23.9714 15.0787 24.0833 14.8085 24.0833 14.5267V8.146C24.0833 7.8642 23.9714 7.59395 23.7721 7.39469C23.5729 7.19544 23.3026 7.0835 23.0208 7.0835ZM13.8125 9.2085C14.0508 9.19896 14.2886 9.23766 14.5116 9.32228C14.7346 9.40691 14.9382 9.53571 15.1102 9.70095C15.2822 9.8662 15.419 10.0645 15.5125 10.2839C15.606 10.5033 15.6542 10.7394 15.6542 10.9779C15.6542 11.2164 15.606 11.4525 15.5125 11.6719C15.419 11.8913 15.2822 12.0896 15.1102 12.2549C14.9382 12.4201 14.7346 12.5489 14.5116 12.6335C14.2886 12.7182 14.0508 12.7569 13.8125 12.7473C13.3555 12.729 12.9232 12.5346 12.6064 12.2048C12.2895 11.875 12.1125 11.4353 12.1125 10.9779C12.1125 10.5205 12.2895 10.0809 12.6064 9.75104C12.9232 9.42121 13.3555 9.22679 13.8125 9.2085ZM20.1762 9.2085C20.4145 9.19896 20.6523 9.23766 20.8753 9.32228C21.0983 9.40691 21.3019 9.53571 21.4739 9.70095C21.6459 9.8662 21.7827 10.0645 21.8762 10.2839C21.9696 10.5033 22.0178 10.7394 22.0178 10.9779C22.0178 11.2164 21.9696 11.4525 21.8762 11.6719C21.7827 11.8913 21.6459 12.0896 21.4739 12.2549C21.3019 12.4201 21.0983 12.5489 20.8753 12.6335C20.6523 12.7182 20.4145 12.7569 20.1762 12.7473C19.7191 12.729 19.2869 12.5346 18.97 12.2048C18.6531 11.875 18.4762 11.4353 18.4762 10.9779C18.4762 10.5205 18.6531 10.0809 18.97 9.75104C19.2869 9.42121 19.7191 9.22679 20.1762 9.2085Z"
                                                stroke-width={"0.1"}
                                            />
                                        </svg>
                                    }
                                    message={"Bots"}
                                    showMessage={isHovering}
                                    links={botLinks}
                                />
                                <MolIconLink
                                    onClick={resetStatusOnClickInMobile}
                                    iconIsLink={false}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="31"
                                            height="31"
                                            viewBox="0 0 31 31"
                                        >
                                            <g clip-path="url(#clip0_832_1118)">
                                                <path
                                                    d="M15.5 26.3639H15.5001C16.9153 26.3623 18.3236 26.1681 19.6863 25.7868L24.4102 28.7937C24.4102 28.7937 24.4103 28.7937 24.4103 28.7938C24.5554 28.8868 24.7228 28.9391 24.895 28.9452C25.0673 28.9514 25.2381 28.911 25.3894 28.8285C25.5407 28.7459 25.6671 28.6242 25.7552 28.476C25.8433 28.3279 25.89 28.1587 25.8903 27.9863V27.9862V22.2334C26.963 21.1966 27.8197 19.9574 28.4109 18.5873C29.0077 17.2042 29.3218 15.7156 29.3347 14.2092L29.3347 14.209C29.3782 7.49322 23.137 2.05283 15.5 2.05283C7.86275 2.05283 1.62223 7.49325 1.62223 14.2084C1.62223 20.9235 7.86275 26.3639 15.5 26.3639ZM24.2943 21.1173L24.2943 21.1173L24.2928 21.1187C24.1962 21.2083 24.119 21.3168 24.0661 21.4375C24.0132 21.5582 23.9857 21.6885 23.9853 21.8203V21.8206V26.2367L20.3673 23.9321L20.3671 23.9319C20.2496 23.8577 20.1175 23.8098 19.9798 23.7915C19.8421 23.7733 19.702 23.7851 19.5693 23.8262L19.5692 23.8262C18.2517 24.2354 16.8798 24.443 15.5001 24.4417H15.5C8.89242 24.4417 3.54445 19.8398 3.54445 14.2084C3.54445 8.57698 8.89242 3.97505 15.5 3.97505C22.1073 3.97505 27.4551 8.57659 27.4556 14.2077C27.436 15.5154 27.145 16.8049 26.6009 17.9942C26.0567 19.1838 25.2713 20.2473 24.2943 21.1173Z"
                                                    stroke-width="0.2"
                                                />
                                                <path
                                                    d="M16.1796 17.583C15.9994 17.7633 15.7549 17.8645 15.5 17.8645L16.1796 17.583ZM16.1796 17.583C16.3598 17.4028 16.4611 17.1583 16.4611 16.9034M16.1796 17.583L16.4611 16.9034M16.4611 16.9034V7.30203M16.4611 16.9034V7.30203M16.4611 7.30203C16.4611 7.04713 16.3598 6.80266 16.1796 6.62242M16.4611 7.30203L16.1796 6.62242M16.1796 6.62242C15.9994 6.44218 15.7549 6.34092 15.5 6.34092M16.1796 6.62242L15.5 6.34092M15.5 6.34092C15.2451 6.34092 15.0006 6.44218 14.8204 6.62242M15.5 6.34092L14.8204 6.62242M14.8204 6.62242C14.6401 6.80266 14.5389 7.04713 14.5389 7.30203M14.8204 6.62242L14.5389 7.30203M14.5389 7.30203V16.8852M14.5389 7.30203V16.8852M14.5389 16.8852C14.5365 17.0127 14.5594 17.1394 14.6065 17.2579C14.6536 17.3767 14.724 17.485 14.8135 17.5763C14.903 17.6676 15.0098 17.7401 15.1277 17.7896C15.2456 17.8391 15.3721 17.8646 15.5 17.8645L14.5389 16.8852Z"
                                                    stroke-width="0.2"
                                                />
                                                <path
                                                    d="M15.5 21.9462C16.1878 21.9462 16.7453 21.3887 16.7453 20.7009C16.7453 20.0132 16.1878 19.4557 15.5 19.4557C14.8123 19.4557 14.2547 20.0132 14.2547 20.7009C14.2547 21.3887 14.8123 21.9462 15.5 21.9462Z"
                                                    stroke-width="0.2"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_832_1118">
                                                    <rect width="31" height="31" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    }
                                    message={"Alertas"}
                                    showMessage={isHovering}
                                    links={alertLinks}
                                />
                                <MolIconLink
                                    onClick={resetStatusOnClickInMobile}
                                    iconIsLink={false}
                                    Icon={
                                        <svg
                                            width="27"
                                            height="27"
                                            viewBox="0 0 27 27"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M24.66 7.4475C24.5458 7.17261 24.3274 6.95416 24.0525 6.84C23.9172 6.78235 23.772 6.75178 23.625 6.75H18C17.7016 6.75 17.4155 6.86853 17.2045 7.07951C16.9935 7.29048 16.875 7.57663 16.875 7.875C16.875 8.17337 16.9935 8.45952 17.2045 8.67049C17.4155 8.88147 17.7016 9 18 9H20.9137L14.625 15.2887L10.9237 11.5763C10.8192 11.4708 10.6947 11.3871 10.5576 11.33C10.4205 11.2729 10.2735 11.2435 10.125 11.2435C9.97648 11.2435 9.82944 11.2729 9.69234 11.33C9.55525 11.3871 9.43083 11.4708 9.32624 11.5763L2.57624 18.3263C2.4708 18.4308 2.3871 18.5553 2.32999 18.6924C2.27287 18.8294 2.24347 18.9765 2.24347 19.125C2.24347 19.2735 2.27287 19.4206 2.32999 19.5576C2.3871 19.6947 2.4708 19.8192 2.57624 19.9237C2.68083 20.0292 2.80525 20.1129 2.94234 20.17C3.07944 20.2271 3.22648 20.2565 3.37499 20.2565C3.52351 20.2565 3.67055 20.2271 3.80764 20.17C3.94473 20.1129 4.06916 20.0292 4.17374 19.9237L10.125 13.9612L13.8262 17.6737C13.9308 17.7792 14.0553 17.8629 14.1923 17.92C14.3294 17.9771 14.4765 18.0065 14.625 18.0065C14.7735 18.0065 14.9205 17.9771 15.0576 17.92C15.1947 17.8629 15.3192 17.7792 15.4237 17.6737L22.5 10.5862V13.5C22.5 13.7984 22.6185 14.0845 22.8295 14.2955C23.0405 14.5065 23.3266 14.625 23.625 14.625C23.9234 14.625 24.2095 14.5065 24.4205 14.2955C24.6315 14.0845 24.75 13.7984 24.75 13.5V7.875C24.7482 7.72799 24.7176 7.58275 24.66 7.4475Z"
                                                stroke-width={"0.1"}
                                            />
                                        </svg>
                                    }
                                    message={"Resultados"}
                                    showMessage={isHovering}
                                    links={resultsLink}
                                />
                                <>
                                    {!isHovering && <div className={"pt-4"} />}
                                    <div
                                        className={
                                            "w-full h-[1px] max-h-[1px] min-w-full bg-[#D4D6D5]"
                                        }
                                    />
                                </>
                                <MolIconLink
                                    onClick={resetStatusOnClickInMobile}
                                    iconIsLink={false}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="29"
                                            height="29"
                                            viewBox="0 0 29 29"
                                            fill="none"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M14.3121 26.1748C9.8512 26.1748 6.04166 25.4807 6.04166 22.7005C6.04166 19.9204 9.82704 17.354 14.3121 17.354C18.7731 17.354 22.5826 19.8956 22.5826 22.6757C22.5826 25.4547 18.7973 26.1748 14.3121 26.1748Z"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M14.3034 13.5014C17.2309 13.5014 19.6036 11.1287 19.6036 8.20119C19.6036 5.27373 17.2309 2.8999 14.3034 2.8999C11.376 2.8999 9.00211 5.27373 9.00211 8.20119C8.99225 11.1188 11.3485 13.4915 14.2661 13.5014C14.2793 13.5014 14.2913 13.5014 14.3034 13.5014Z"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    }
                                    message={"Minha conta"}
                                    showMessage={isHovering}
                                    links={accountLink}
                                />
                                <MolIconLink
                                    className="pb-24 md:pb-0"
                                    onClick={(): void => {
                                        resetStatusOnClickInMobile();
                                        logout();
                                    }}
                                    iconIsLink={true}
                                    Icon={
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="29"
                                            height="29"
                                            viewBox="0 0 29 29"
                                            fill="none"
                                        >
                                            <path
                                                d="M26.3308 14.646H11.7812"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M22.7944 11.1221L26.3324 14.6456L22.7944 18.1691"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                            <path
                                                d="M19.7681 9.21942C19.3693 4.89359 17.7501 3.32275 11.3097 3.32275C2.72936 3.32275 2.72936 6.114 2.72936 14.4998C2.72936 22.8857 2.72936 25.6769 11.3097 25.6769C17.7501 25.6769 19.3693 24.1061 19.7681 19.7803"
                                                stroke-width="2"
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                            />
                                        </svg>
                                    }
                                    message={"Logout"}
                                    showMessage={isHovering}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
