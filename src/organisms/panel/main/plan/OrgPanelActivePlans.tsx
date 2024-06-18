import { AtomCard } from "@atom/AtomCard";
import { MolActivePlanRow } from "@mols/panel/MolActivePlanRow";
import { PlanData } from "@mols/panel/MolCreateEditPaymentPlan";
import { MolIdiomSelector } from "@mols/panel/MolIdiomSelector";
import { MolNoPlanRegistered } from "@mols/panel/MolNoPlanRegistered";
import { Idiom } from "@mols/panel/MolTelegramConfigForm";
import { ReactElement, useEffect, useState } from "react";
import { IBotPlan } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelActivePlansProps {
    data: IBotPlan[]
    onEditOrDeletePlan: (plan: Omit<PlanData, "idiom">, type: "EDIT" | "DELETE") => unknown
    onCreatePlan: () => unknown
    onIdiomChange: (idiom: Idiom) => unknown
}

export const OrgPanelActivePlans = ({ data, onEditOrDeletePlan, onCreatePlan, onIdiomChange }: IOrgPanelActivePlansProps): ReactElement => {
    const [plans, setPlans] = useState<IBotPlan[]>([])

    useEffect(() => {
        setPlans(data)
    }, [data])
    return (
        <>
            <AtomCard
                className={
                    "!w-full !h-[550px] max-h-[550px] bg-white flex-col pt-[32px] px-[22px] space-y-[24px] max-4xl:!w-[100%] max-md:px-[20px]"
                }
            >
                <MolIdiomSelector
                    setIdiomInOperation={onIdiomChange}
                />
                <div className="h-fit w-full">
                    <div className="text-fuchsia-950 text-[28px] font-medium font-['Geologica'] leading-9">
                        Planos de pagamento ativos
                    </div>
                </div>
                <div className="flex-1 h-full w-full relative overflow-y-auto">
                    <table className={"border-separate border-spacing-[50px_0] w-full"}>
                        <thead className="bg-[#F6F8F9] py-[53px] border-t-[4px] rounded-t-[4px] sticky top-0 left-0 max-lg:hidden">
                            <tr className="whitespace-nowrap">
                                <th className="pl-[16px] pr-[120px] rounded-tl-[4px]">
                  Título
                                </th>
                                <th className="pr-[60px]">Preço</th>
                                <th className="pr-[60px]">Ciclo</th>
                                <th className="pr-[60px]">Mensagem do botão</th>
                                <th className="pr-[60px]">Criado em</th>
                                <th className="pr-[17px] rounded-tr-[4px]">Ações</th>
                            </tr>
                        </thead>
                        <tbody className={"bg-white relative flex flex-col md:flex-none md:table-row-group"}>
                            {plans.length > 0 ? (
                                plans.map((p) => (
                                    <MolActivePlanRow
                                        onDeletePlan={(): void => {
                                            onEditOrDeletePlan({
                                                btnMessage: p.btnMessage,
                                                duration: p.duration,
                                                durationPeriodType: p.durationPeriodType,
                                                id: p.clientPlanId,
                                                value: p.value,
                                                title: p.title,
                                                botId: p.botId,
                                                planId: p.clientPlanId,
                                                isPermanent: p.isPermanent
                                            }, "DELETE")
                                        }}
                                        onEditPlan={(): void => {
                                            onEditOrDeletePlan({
                                                btnMessage: p.btnMessage,
                                                duration: p.duration,
                                                durationPeriodType: p.durationPeriodType,
                                                id: p.clientPlanId,
                                                value: p.value,
                                                title: p.title,
                                                botId: p.botId,
                                                planId: p.clientPlanId,
                                                isPermanent: p.isPermanent
                                            }, "EDIT")
                                        }}
                                        {...{...p, price: p.value, cycle: p.duration, createdAt: new Date(p.createdAt)}}
                                    />
                                ))
                            ) : (
                                <div className="w-full h-full absolute flex items-center justify-center">
                                    <MolNoPlanRegistered
                                        onCreateNewPlan={onCreatePlan}
                                    />
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
            </AtomCard>
        </>
    );
};
