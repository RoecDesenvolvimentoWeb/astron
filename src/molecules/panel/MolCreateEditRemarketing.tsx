import { AtomBtn } from "@atom/AtomBtn";
import { AtomCard } from "@atom/AtomCard";
import { AtomCloseBtn } from "@atom/AtomCloseBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { ReactElement, useEffect, useState } from "react";

interface IMolCreateEditRemarketingProps {
    type: "CREATE" | "EDIT"
    onClose?: () => unknown
    onSubmit: (data: { userId: number }, oldUser?: number) => unknown
    data?: {
        userId: number
    }
}

const INITIAL_DATA = {
    userId: 0
}

export const MolCreateEditRemarketing = (props: IMolCreateEditRemarketingProps): ReactElement => {
    const [data, setData] = useState<{ userId: number }>(props.data ?? INITIAL_DATA)
    useEffect(() => {
        setData(props.data ?? INITIAL_DATA)
    }, [
        props
    ])
    return (
        <>
            <AtomCard
                className="min-h-[285px] bg-white flex-col !justify-start !px-[32px] pb-[44px] pt-[24px] max-lg:w-full max-sm:max-w-[350px]"
            >
                <div className="w-full flex justify-end">
                    <AtomCloseBtn
                        onClick={props.onClose}
                    />
                </div>
                <div className="w-full pb-[32px]">
                    <div className="text-fuchsia-950 text-[28px] font-medium font-['Geologica'] leading-9">{props.type === "CREATE" ? "Criar novo alerta" : "Editar alerta"}</div>
                </div>
                <div className="w-full">
                    <AtomForm
                        onSubmit={(e): void => {
                            e.preventDefault()
                            props.onSubmit(data, props.data?.userId)
                        }}
                        className="w-full text-[14px] gap-y-[40px]">
                        <AtomDivLabel className="w-full">
                            <AtomLabel className="text-[#4F4D56] w-full flex justify-between">
                                <span>
                                    Id do usuário
                                </span>
                                {props.type === "EDIT" && <>
                                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.75 13.5H6.93C7.0287 13.5005 7.12655 13.4816 7.21793 13.4443C7.30931 13.407 7.39242 13.352 7.4625 13.2825L12.6525 8.08495L14.7825 5.99995C14.8528 5.93023 14.9086 5.84728 14.9467 5.75589C14.9847 5.66449 15.0043 5.56646 15.0043 5.46745C15.0043 5.36845 14.9847 5.27042 14.9467 5.17902C14.9086 5.08763 14.8528 5.00468 14.7825 4.93495L11.6025 1.71745C11.5328 1.64716 11.4498 1.59136 11.3584 1.55329C11.267 1.51521 11.169 1.49561 11.07 1.49561C10.971 1.49561 10.873 1.51521 10.7816 1.55329C10.6902 1.59136 10.6072 1.64716 10.5375 1.71745L8.4225 3.83995L3.2175 9.03745C3.14799 9.10753 3.093 9.19065 3.05567 9.28202C3.01835 9.3734 2.99943 9.47125 3 9.56995V12.75C3 12.9489 3.07902 13.1396 3.21967 13.2803C3.36032 13.4209 3.55109 13.5 3.75 13.5ZM11.07 3.30745L13.1925 5.42995L12.1275 6.49495L10.005 4.37245L11.07 3.30745ZM4.5 9.87745L8.9475 5.42995L11.07 7.55245L6.6225 12H4.5V9.87745ZM15.75 15H2.25C2.05109 15 1.86032 15.079 1.71967 15.2196C1.57902 15.3603 1.5 15.551 1.5 15.75C1.5 15.9489 1.57902 16.1396 1.71967 16.2803C1.86032 16.4209 2.05109 16.5 2.25 16.5H15.75C15.9489 16.5 16.1397 16.4209 16.2803 16.2803C16.421 16.1396 16.5 15.9489 16.5 15.75C16.5 15.551 16.421 15.3603 16.2803 15.2196C16.1397 15.079 15.9489 15 15.75 15Z" fill="#42616A"/>
                                    </svg>
                                </>}
                            </AtomLabel>
                            <AtomInputField
                                onChange={(r): void => {
                                    setData({
                                        userId: Number(r)
                                    })
                                }}
                                inputType={"number"}
                                className="w-full"
                                placeHolder={data.userId.toString()}
                            />
                        </AtomDivLabel>
                        <div className="w-full flex flex-row justify-between gap-[20px] max-sm:flex-col">
                            <AtomBtn
                                btnType={"submit"}
                                className="bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 max-sm:w-full">Salvar</AtomBtn>
                            <AtomBtn
                                onClick={props.onClose}
                                btnType={"button"}
                                className="border-[1px] border-lilas-lv5 !text-lilas-lv5 max-sm:w-full">Cancelar</AtomBtn>
                        </div>
                    </AtomForm>
                </div>
            </AtomCard>
        </>
    )
}