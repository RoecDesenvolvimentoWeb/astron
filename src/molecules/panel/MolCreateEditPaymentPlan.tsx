import { AtomBtn } from "@atom/AtomBtn";
import { AtomCloseBtn } from "@atom/AtomCloseBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomSelect } from "@atom/AtomSelect";
import { ReactElement, useEffect, useState } from "react";
import { DurationPeriodType } from "resources/api/server/contracts/ServerApiModel";
import { Idiom } from "./MolTelegramConfigForm";

interface IMolCreateEditPaymentPlanProps {
    type: "EDIT" | "CREATE";
    onClose?: () => unknown;
    data?: PlanData;
    onSubmit: (data: PlanData) => unknown
}

export interface PlanData {
    id: number
    planId?: number
    botId: number
    title: string;
    value: number;
    durationPeriodType: DurationPeriodType;
    duration: number;
    btnMessage: string;
    isPermanent: boolean
    idiom: Idiom
}

const INITIAL_PLAN_DATA: PlanData = {
    botId: 0,
    btnMessage: "",
    duration: 0,
    durationPeriodType: "DAY",
    id: 0,
    title: "",
    value: 0,
    isPermanent: false,
    idiom: "PT"
}

const optsDuration: {
    text: string
    value: DurationPeriodType
}[] = [
    {
        text: "Diário",
        value: "DAY"
    },
    {
        text: "Mensal",
        value: "MONTH"
    },
    {
        text: "Hora",
        value: "HOUR"
    },
    {
        text: "Anual",
        value: "YEAR"
    },
    {
        value: "WEEK",
        text: "Semanal"
    },
    {
        value: "PERMANENT",
        text: "Vitalício"
    }
]

export const MolCreateEditPaymentPlan = (
    props: IMolCreateEditPaymentPlanProps
): ReactElement => {
    const title = props.type === "CREATE"
        ? "Criar plano de pagamento"
        : "Editar plano de pagamento";

    const [data, setData] = useState<PlanData>(props.data ?? INITIAL_PLAN_DATA)


    function onFieldChange <T extends keyof PlanData> (fieldName: T, value: PlanData[T]): void {
        setData({
            ...data,
            [fieldName]: value
        })
    }

    useEffect(() => {
        setData(props.data ?? INITIAL_PLAN_DATA)
    }, [props])
    return (
        <>
            <AtomForm
                onSubmit={(e):void => {
                    e.preventDefault()
                    props.onSubmit(data)
                }}
                className="!space-y-[32px] bg-white flex-col !px-[37px] !py-[32px] rounded-[16px] h-full md:h-fit w-full max-w-[500px] overflow-y-auto">
                <div className="flex flex-col w-full">
                    <div className="w-full flex justify-end">
                        <AtomCloseBtn onClick={props.onClose} />
                    </div>
                    <div>
                        <div className="text-fuchsia-950 text-[28px] font-medium font-['Geologica'] leading-9">
                            {title}
                        </div>
                    </div>
                </div>
                {props.type === "EDIT" && (
                    <div className="flex flex-row space-x-[35px] max-md:space-x-[0px] max-md:flex-col max-md:gap-[16px] max-md:items-start justify-start">
                        <div className="space-y-[24px]">
                            <div className="w-[59px] h-3.5 text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">
                Público
                            </div>
                            <div className="w-[98px] h-[13px] text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">
                Todos
                            </div>
                        </div>
                        <div className="space-y-[24px]">
                            <div className="w-fit h-3.5 text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">
                Data de criação
                            </div>
                            <div className="w-fit h-[13px] text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">
                20/06/2029
                            </div>
                        </div>
                        <div className="space-y-[24px]">
                            <div className="w-fit h-3.5 text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">
                Ciclos realizados
                            </div>
                            <div className="w-[98px] h-[13px] text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">
                                {props.data?.duration ?? 0}
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex flex-row space-x-[17px] w-full max-md:flex-col max-md:gap-[16px]">
                    <AtomDivLabel
                        className="w-2/3 max-md:w-full">
                        <AtomLabel>Título do plano de pagamento</AtomLabel>
                        <AtomInputField
                            className="w-full"
                            placeHolder={data.title}
                            inputType="text"
                            onChange={(v): void => {
                                onFieldChange("title", v)
                            }}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-1/3 max-md:w-full max-md:!mx-[0px]   ">
                        <AtomLabel>Valor</AtomLabel>
                        <AtomInputField
                            className="w-full"
                            placeHolder={`R$ ${data.value}`}
                            inputType={"text"}
                            onChange={(v): void => {
                                onFieldChange("value", Number(v.replace(",", ".")))
                            }}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-row space-x-[17px] w-full max-md:flex-col max-md:!w-full max-md:gap-[16px]">
                    <AtomDivLabel className="w-fit max-md:w-full">
                        <AtomLabel>Cobrança</AtomLabel>
                        <AtomSelect
                            defaultValue={data.isPermanent ? "PERMANENT" : data.durationPeriodType}
                            onChange={(v): void => {
                                onFieldChange("durationPeriodType", v as DurationPeriodType)
                            }}
                            className="w-[302px]"
                            options={optsDuration}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full max-md:!mx-[0px]">
                        <AtomLabel>Ciclo</AtomLabel>
                        <AtomInputField
                            className="w-full "
                            placeHolder={data.duration.toString()}
                            inputType={"number"}
                            onChange={(v): void => {
                                onFieldChange("duration", Number(v))
                            }}
                        />
                    </AtomDivLabel>
                </div>
                <div className="w-full h-fit">
                    <AtomDivLabel className="h-full">
                        <AtomLabel>Mensagem do botão</AtomLabel>
                        <textarea
                            className="resize-none w-full min-h-fit h-[131px] border-[1px] border-[#A09FA5] bg-[#FBFBFB] rounded-[16px] p-[16px]"
                            placeholder={data.btnMessage}
                            onChange={(v): void => {
                                onFieldChange("btnMessage", v.target.value)
                            }}
                        />
                    </AtomDivLabel>
                </div>
                <div className="w-full flex justify-end gap-x-[16px] text-[18px] max-md:flex-col max-md:w-full max-md:gap-[20px]">
                    <AtomBtn
                        btnType={"submit"}
                        className="bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 h-[52px] w-[240px] max-md:w-full">
                        {props.type === "CREATE" ? "Criar plano" : "Editar plano"}
                    </AtomBtn>
                    <AtomBtn
                        btnType={"button"}
                        onClick={props.onClose}
                        className="h-[52px] border-[1px] border-[#6C037D] !text-[#6C037D] w-[240px] max-md:w-full"
                    >
            Cancelar
                    </AtomBtn>
                </div>
            </AtomForm>
        </>
    );
};
