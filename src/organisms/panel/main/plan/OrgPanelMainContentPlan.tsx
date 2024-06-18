import { AtomTitle } from "@atom/AtomTitle";
import { MolCompletedNotCompletedPayments } from "@mols/panel/MolCompletedNotCompletedPayments";
import { MolCreateEditPaymentPlan, PlanData } from "@mols/panel/MolCreateEditPaymentPlan";
import { MolCreatePlan } from "@mols/panel/MolCreatePlan";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { Idiom } from "@mols/panel/MolTelegramConfigForm";
import { MolTotalEarnedMonthPlans } from "@mols/panel/MolTotalEarnedMonthPlans";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { IBotPlan, ILastPayment } from "resources/api/server/contracts/ServerApiModel";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgPanelActivePlans } from "./OrgPanelActivePlans";
import { OrgPanelMemberPaymentUpdate } from "./OrgPanelMemberPaymentUpdate";

interface IOrgPanelMainContentPlanProps extends IDefaultProps {}

const serverApi = new ServerApi()

interface ICreateEditPlan {
    isActive: boolean,
    type: "CREATE" | "EDIT"
    data?: PlanData
}

const INITIAL_STATUS_CREATE_EDIT_PLAN: ICreateEditPlan = {
    isActive: false,
    type: "CREATE"
}

export const OrgPanelMainContentPlan = ({ setIsLoading }: IOrgPanelMainContentPlanProps): ReactElement => {
    const [createEditPlan, setCreateEditPlan] = useState<ICreateEditPlan>(INITIAL_STATUS_CREATE_EDIT_PLAN);
    const [effectivePaymentCount, setEffectivePaymentCount] = useState(0)
    const [notEffectivePaymentCount, setNoEffectivePaymentCount] = useState(0)
    const [totalEarnedMonth, setTotalEarnedMonth] = useState(0)
    const [plans, setPlans] = useState<IBotPlan[]>([])
    const [lastPayments, setLastPayments] = useState<ILastPayment[]>([])
    const [selectedBotId] = useLocalStorage<number | null>("@selected-bot", null)
    const [idiom, setIdiom] = useState<Idiom>("PT")

    const loadLastPayments = async (): Promise<void> => {
        const prom = serverApi.getLastPayments()
        await commonPromiseHandle<ILastPayment[]>(prom, setLastPayments)
    }


    const loadtEffectivePaymentsMonth = async (): Promise<void> => {
        const prom = serverApi.getEffectivePaymentsMonth()
        await commonPromiseHandle<number>(prom, setEffectivePaymentCount, "Não foi possível carregar os pagamentos não efetivos")
    }

    const loadNottEffectivePaymentsMonth = async (): Promise<void> => {
        const prom = serverApi.getNotEffectivePaymentsMonth()
        await commonPromiseHandle<number>(prom, setNoEffectivePaymentCount, "Não foi possível carregar os pagamentos efetivos")
    }

    const loadTotalEarnedCurrentMonth = async (): Promise<void> => {
        const prom = serverApi.getTotalEarnedByPlanMonth()
        await commonPromiseHandle<number>(prom, setTotalEarnedMonth, "Não foi possível carregar o total adquirido com planos.")
    }

    const loadPlans = async (): Promise<void> => {
        if (selectedBotId == null) return
        const prom = serverApi.listPlans(selectedBotId, idiom)
        await commonPromiseHandle<IBotPlan[]>(prom, setPlans, "Não foi possível carregar os planos de pagamento.")
    }

    const onDeletePlan = async (planData: PlanData): Promise<void> => {
        const prom = serverApi.deletePlan(planData)
        await commonPromiseHandle(prom, undefined, "Não foi deletar o plano", "Plano deletado com sucesso").catch(() => {
            toast.error("Não foi possível deletar o plano")
        })
        setTimeout(() => {
            location.reload()
        }, 500)
    }

    const onEditPlan = async (planData: PlanData): Promise<void> => {
        const prom = serverApi.updatePlan(planData)
        await commonPromiseHandle(prom, undefined, "Não foi possível atualizar o plano", "Plano editado com sucesso").catch(() => {
            toast.error("Não foi possível atualizar o plano")
        })
        setTimeout(() => {
            location.reload()
        }, 500)
    }

    const onCreatePlan = async (planData: PlanData): Promise<void> => {
        if (selectedBotId == null) return
        const prom = serverApi.createPlan({...planData, botId: selectedBotId})
        await commonPromiseHandle(prom, undefined, "Não foi possível criar o plano", "Plano criado com sucesso").catch(() => {
            toast.error("Não foi possível criar o plano")
        })
        setTimeout(() => {
            location.reload()
        }, 500)
    }

    useEffect(() => {
        loadPageResoucers(
            setIsLoading,
            loadLastPayments(),
            loadtEffectivePaymentsMonth(),
            loadNottEffectivePaymentsMonth(),
            loadTotalEarnedCurrentMonth(),
            loadPlans()
        ).catch(() => {})
    }, [idiom])
    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Planos de pagamento" />
                <div className="flex flex-row gap-[16px] pr-[15px] max-4xl:flex-col">
                    <div className="flex flex-col gap-[16px] w-[80%] max-4xl:w-[100%]">
                        <div className="flex items-stretch gap-[16px] max-lg:flex-col">
                            <MolCreatePlan
                                onCreate={(): void => {
                                    setCreateEditPlan({
                                        data: undefined,
                                        isActive: true,
                                        type: "CREATE"
                                    })
                                }}
                            />
                            <MolTotalEarnedMonthPlans
                                totalPercent={0}
                                totalValue={totalEarnedMonth}
                            />
                        </div>
                        <OrgPanelActivePlans
                            onIdiomChange={setIdiom}
                            onCreatePlan={(): void => {
                                setCreateEditPlan({
                                    data: undefined,
                                    isActive: true,
                                    type: "CREATE"
                                })
                            }}
                            onEditOrDeletePlan={(r, s): void => {
                                if (s === "DELETE") void onDeletePlan({...r, idiom})
                                if (s === "EDIT") setCreateEditPlan({
                                    data: {...r, idiom},
                                    isActive: true,
                                    type: s
                                })
                            }}
                            data={plans}
                        />
                    </div>
                    <div className="flex flex-col gap-[16px]">
                        <div className="flex gap-y-[24px] flex-col max-4xl:!flex-row max-4xl:gap-[16px] max-sm:items-stretch max-1sm:!flex-col">
                            <MolCompletedNotCompletedPayments
                                type={"COMPLETED"}
                                count={effectivePaymentCount}
                            />
                            <MolCompletedNotCompletedPayments
                                type={"NOT_COMPLETED"}
                                count={notEffectivePaymentCount}
                            />
                        </div>
                        <OrgPanelMemberPaymentUpdate
                            data={lastPayments}
                        />
                    </div>
                </div>
            </MolMainContentWrapper>
            {createEditPlan.isActive && (
                <div className="w-screen h-screen min-h-fit z-40 fixed left-0 top-0 bg-[#7A7A7A66] flex items-center justify-center max-md:px-[20px]">
                    <MolCreateEditPaymentPlan
                        onSubmit={(v): void => {
                            if (createEditPlan.type === "CREATE") {
                                void onCreatePlan(v)
                            }
                            if (createEditPlan.type === "EDIT") {
                                void onEditPlan(v)
                            }
                            setCreateEditPlan(INITIAL_STATUS_CREATE_EDIT_PLAN);
                        }}
                        onClose={(): void => {
                            setCreateEditPlan(INITIAL_STATUS_CREATE_EDIT_PLAN);
                        }}
                        data={createEditPlan.data}
                        type={createEditPlan.type}
                    />
                </div>
            )}
        </>
    );
};
