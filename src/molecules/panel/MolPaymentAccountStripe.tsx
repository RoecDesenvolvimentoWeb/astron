import StripeLogo from "@asset/stripe-logo.png";
import { AtomBtn } from "@atom/AtomBtn";
import { AtomCheckBox } from "@atom/AtomCheckBox";
import { AtomLoading } from "@atom/AtomLoading";
import { ReactElement } from "react";

interface MolPaymentAccountStripeProps {
    isBindind: boolean
    onBindOrUnbind: () => void
    onToggleSatus: (status: boolean) => unknown
    accessHref: string
    isActive: boolean
    isLoadingAnything: boolean
}

const getInnerComponent = (data: MolPaymentAccountStripeProps): ReactElement => {
    const bindText = data.isBindind ? "Desvincular" : "Vincular"
    const className = data.isBindind ?
        "bg-white border-[1px] border-lilas-lv5 text-lilas-lv5 h-[50px] w-full mx-10 md:w-[250px]"
        :
        "bg-gradient-to-r from-lilas-lv1 to bg-lilas-lv5 h-[50px] w-full mx-10 md:w-[250px]"
    const BindOrUnbindComponent = <AtomBtn
        onClick={data.onBindOrUnbind}
        className={className}
    >
        {bindText}
    </AtomBtn>
    return (
        <div className={`flex items-center ${!data.isBindind && "pl-10"} h-1/2 w-full space-x-2`}>
            {BindOrUnbindComponent}
        </div>
    )
}

export const MolPaymentAccountStripe = (data: MolPaymentAccountStripeProps): ReactElement => {
    return (
        <>
            <div className="max-w-[600px] min-w-[600px] min-h-[216px] max-md:flex-col max-md:w-full max-md:min-w-full md:max-h-[216px] rounded-[16px] bg-white flex flex-row">
                <div className="h-full max-md:w-full w-1/4 min-w-[194px] min-h-[216px] rounded-l-lg flex items-center justify-center bg-[#685cfc] max-md:rounded-t-lg max-md:rounded-r-lg max-md:rounded-br-none max-md:rounded-bl-none">
                    <img src={StripeLogo} width={160}  className="max-h-[100px] invert"/>
                </div>
                <div className="w-full h-full flex flex-col items-center">
                    <div className="ml-auto mr-14 mt-2 relative">
                        <AtomLoading
                            className={"relative md:absolute"}
                            isInView={data.isLoadingAnything}
                        />
                    </div>
                    {data.isBindind && <div className="flex flex-row items-center space-x-4 ml-auto pr-2 pt-2 w-full pb-2">
                        <div className="mr-auto pl-10">
                            <a
                                href={data.accessHref}
                                className="flex justify-center items-center space-x-2 bg-[#685cfc] text-white px-2 rounded-lg py-1 cursor-pointer">
                                <span>Acessar conta</span>
                                <span className="material-symbols-outlined">ungroup</span>
                            </a>
                        </div>
                        <AtomCheckBox
                            className="border-none border-0"
                            isActive={data.isActive}
                            onChange={data.onToggleSatus}
                            version="v2"
                            colors={{
                                onActive: "bg-purple-100",
                                onNotActive: "white"
                            }}
                        />
                    </div>}
                    <div className="flex flex-col gap-y-[8px] w-full h-full items-center justify-end pb-4">
                        <div className="w-[333px] max-md:w-full text-gray-800 text-xl font-medium font-['Geologica'] leading-relaxed max-md:text-center">
                            Vincule sua conta da Stripe
                        </div>
                        <div className="w-[333px] max-w-[500px] max-md:w-full text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight max-md:text-center">
                            Seus ganhos são depositados imediatamente a cada venda. Tenha
                            acesso instantâneo aos seus recebimentos
                        </div>
                    </div>
                    <div className={"flex items-start md:pl-10 pb-6 w-full md:w-auto"}>
                        {getInnerComponent(data)}
                    </div>
                </div>
            </div>
        </>
    )
}