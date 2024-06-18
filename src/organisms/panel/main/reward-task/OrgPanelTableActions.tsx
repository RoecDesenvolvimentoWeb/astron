import { MolRowRewardTask } from "@mols/panel/MolRowRewardTask";
import { ReactElement } from "react";
import { RewardTaskOut } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelTableActionProps {
    tasks: RewardTaskOut[]
    onAction: (type: "update", application: "all" | "individual", taskId: number) => unknown
    onChangeStatus: (paused: boolean, rewardId: number) => unknown
    onDelete: (rewardId: number) => unknown
}

export const OrgPanelTableAction = (props: IOrgPanelTableActionProps): ReactElement => {
    return (
        <>
            <table className={"border-separate border-spacing-[50px_0] max-w-[1194px]"}>
                <thead className="bg-[#F6F8F9] py-[53px] border-t-[4px] rounded-t-[4px]  sticky top-0 left-0">
                    <tr>
                        <th className="pl-[24px] pr-[208px]">Título</th>
                        <th className="pr-[202px]">Aplicação</th>
                        <th className="pr-[137px]">Período</th>
                        <th className="pr-[107px]">Ciclo</th>
                        <th className="pr-[77px]">Tipo de Tarefa</th>
                        <th className="pr-[60px]">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {props.tasks.map((v, i) => {
                        const taskPeriod = v.reward.period === "MONTH" ? "Mensal"
                            :
                            v.reward.period === "DAY" ? "Diario"
                                :
                                v.reward.period === "HOUR" ? "Horas"
                                    :
                                    v.reward.period === "WEEK" ? "Semanal"
                                        :
                                        v.reward.period === "YEAR" ? "Anual" : ""
                        return <MolRowRewardTask
                            key={i}
                            onDelete={(): void => {
                                props.onDelete(v.taskId)
                            }}
                            onEditAction={(application): void => {
                                props.onAction("update", application, v.taskId)
                            }}
                            onChangeStatus={(s): void => {
                                props.onChangeStatus(s, v.taskId)
                            }}
                            isActive={v.active}
                            title={v.taskName}
                            application={v.isIndividual ? "individual" : "all"}
                            period={taskPeriod}
                            cycle={v.reward.cycle ?? 0}
                            taskType={v.taskType === "INVITE" ? "Convidar" : "Convidar + Comprar"}
                        />
                    })}
                </tbody>
            </table>
        </>
    )
}