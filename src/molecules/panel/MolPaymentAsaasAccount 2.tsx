import { AtomBtn } from "@atom/AtomBtn";
import { ReactElement, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface IMolPaymentAsaasAccountProps {
    icon: ReactNode;
    accountName: string;
    isBinded: boolean;
    href: string;
    onUnbind: () => unknown;
}

export const MolPaymentAsaasAccount = (
    props: IMolPaymentAsaasAccountProps
): ReactElement => {
    const width = window.innerWidth;

    const navigate = useNavigate()

    const reloadPage = (): void => {
        window.location.reload();
    };

    useEffect(() => {
        const handleResize = (): void => {
            const newWidth = window.innerWidth;
            if (
                (width <= 768 && newWidth > 768) ||
        (width > 768 && newWidth <= 768)
            ) {
                reloadPage();
            }
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [width]);

    const handleVincularConta = (): void => {
        window.location.href = "/panel/asaas/account";
    };

    const handleBindExistentAccount = (): void => {
        navigate("/panel/asaas/account/bind_update?type=bind")
    }

    const handleUpdateExistentAccount = (): void => {
        navigate("/panel/asaas/account/bind_update?type=update")
    }

    return (
        <>
            <div className="max-w-[600px] min-w-[600px] min-h-fit max-md:flex-col max-md:w-full max-md:min-w-full md:max-h-[216px] rounded-[16px] bg-white flex flex-row">
                <div className="h-full max-md:w-full w-1/4 min-w-[194px] min-h-[216px] rounded-l-lg flex items-center justify-center bg-[#B4C7FF] max-md:rounded-t-lg max-md:rounded-r-lg max-md:rounded-br-none max-md:rounded-bl-none">
                    {props.icon}
                </div>
                <div className="h-full max-md:rounded-b-lg flex-1 flex flex-col py-[27px] max-md:bg-white px-[40px] gap-y-[18px] justify-center">
                    <div className="flex flex-col gap-y-[8px] w-full max-md:items-center max-md:justify-center">
                        <div className="w-[350px] max-md:w-full text-gray-800 text-xl font-medium font-['Geologica'] leading-relaxed max-md:text-center">
              Vincule sua conta ao Asaas
                        </div>
                        <div className="w-[333px] max-md:w-full text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight max-md:text-center">
              Seus ganhos são depositados imediatamente a cada venda. Tenha
              acesso instantâneo aos seus recebimentos
                        </div>
                        {width <= 768 ? (
                            !props.isBinded ? (
                                <>
                                    <AtomBtn
                                        onClick={handleVincularConta}
                                        className="ml-auto bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 w-full md:w-[239px] h-[52px] mr-[40px] flex-row flex items-center justify-center gap-x-[8px]"
                                    >
                                        <span>Criar conta</span>
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g clipPath="url(#clip0_1081_952)">
                                                <path
                                                    d="M12.5 7.21429L1.5 7.21429M12.5 7.21429L7.78571 11.9286M12.5 7.21429L7.78571 2.5"
                                                    stroke="#F5F5F5"
                                                    strokeWidth="1.57143"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_1081_952">
                                                    <rect
                                                        width="13"
                                                        height="13"
                                                        fill="white"
                                                        transform="translate(13.5 0.5) rotate(90)"
                                                    />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </AtomBtn>
                                    <AtomBtn
                                        onClick={handleBindExistentAccount}
                                        className="ml-auto text-lilas-lv5 border-[1px] border-lilas-lv5 w-full md:w-[239px] h-[52px] mr-[40px] flex-row flex items-center justify-center gap-x-[8px]"
                                    >
                                        <span>Vincular conta existente</span>
                                    </AtomBtn>
                                </>
                            ) : (
                                <>
                                    <div className="flex flex-row gap-x-[6px] max-md:order-first">
                                        <svg
                                            width="13"
                                            height="10"
                                            viewBox="0 0 13 10"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M12.7333 0.599716C12.3777 0.244106 11.8011 0.244106 11.4455 0.599707L4.57671 7.46834L1.55449 4.44626C1.19888 4.09066 0.622324 4.09067 0.266714 4.44628C-0.0889047 4.8019 -0.0889047 5.37846 0.266714 5.73407L3.93282 9.40019C4.11052 9.57806 4.34371 9.66699 4.57671 9.66699C4.80972 9.66699 5.04291 9.57806 5.2206 9.40019L12.7333 1.8875C13.0889 1.53189 13.0889 0.955326 12.7333 0.599716Z"
                                                fill="#D25AC4"
                                            />
                                        </svg>
                                        <div className="w-28 text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight">
                                          Conta vinculada
                                        </div>
                                    </div>
                                    <AtomBtn
                                        onClick={handleUpdateExistentAccount}
                                        className="ml-auto text-lilas-lv5 border-[1px] border-lilas-lv5 w-full h-[52px] mr-[40px] flex-row flex items-center justify-center gap-x-[8px]"
                                    >
                                        <span>Atualizar conta</span>
                                    </AtomBtn>
                                    <AtomBtn
                                        onClick={props.onUnbind}
                                        className="max-md:mt-[10px] max-md:order-last max-md:order-last border-[1px] border-lilas-lv5 !text-lilas-lv5 w-full"
                                    >
                                      Desvincular
                                    </AtomBtn>
                                </>
                            )
                        ) : (
                            <div className="flex gap-y-[10px] justify-between items-center flex-col">
                                {!props.isBinded ? (
                                    <>
                                        <AtomBtn
                                            onClick={handleVincularConta}
                                            className="ml-auto bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 w-full h-[52px] mr-[40px] flex-row flex items-center justify-center gap-x-[8px]"
                                        >
                                            <span>Criar conta</span>
                                            <svg
                                                width="14"
                                                height="14"
                                                viewBox="0 0 14 14"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g clipPath="url(#clip0_1081_952)">
                                                    <path
                                                        d="M12.5 7.21429L1.5 7.21429M12.5 7.21429L7.78571 11.9286M12.5 7.21429L7.78571 2.5"
                                                        stroke="#F5F5F5"
                                                        strokeWidth="1.57143"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_1081_952">
                                                        <rect
                                                            width="13"
                                                            height="13"
                                                            fill="white"
                                                            transform="translate(13.5 0.5) rotate(90)"
                                                        />
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                        </AtomBtn>
                                        <AtomBtn
                                            onClick={handleBindExistentAccount}
                                            className="ml-auto text-lilas-lv5 border-[1px] border-lilas-lv5 w-full h-[52px] mr-[40px] flex-row flex items-center justify-center gap-x-[8px]"
                                        >
                                            <span>Vincular conta existente</span>
                                        </AtomBtn>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex flex-row gap-x-[6px]">
                                            <svg
                                                width="13"
                                                height="10"
                                                viewBox="0 0 13 10"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12.7333 0.599716C12.3777 0.244106 11.8011 0.244106 11.4455 0.599707L4.57671 7.46834L1.55449 4.44626C1.19888 4.09066 0.622324 4.09067 0.266714 4.44628C-0.0889047 4.8019 -0.0889047 5.37846 0.266714 5.73407L3.93282 9.40019C4.11052 9.57806 4.34371 9.66699 4.57671 9.66699C4.80972 9.66699 5.04291 9.57806 5.2206 9.40019L12.7333 1.8875C13.0889 1.53189 13.0889 0.955326 12.7333 0.599716Z"
                                                    fill="#D25AC4"
                                                />
                                            </svg>
                                            <div className="w-28 text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight">
                                              Conta vinculada
                                            </div>
                                        </div>
                                        <AtomBtn
                                            onClick={handleUpdateExistentAccount}
                                            className="ml-auto text-lilas-lv5 border-[1px] border-lilas-lv5 w-full h-[52px] mr-[40px] flex-row flex items-center justify-center gap-x-[8px]"
                                        >
                                            <span>Atualizar conta</span>
                                        </AtomBtn>
                                        <AtomBtn
                                            onClick={props.onUnbind}
                                            className="border-[1px] border-lilas-lv5 !text-lilas-lv5 w-full"
                                        >
                                         Desvincular
                                        </AtomBtn>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
