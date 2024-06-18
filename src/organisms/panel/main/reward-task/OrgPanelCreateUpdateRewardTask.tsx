import { AtomCloseBtn } from "@atom/AtomCloseBtn";
import { AtomRadioInput } from "@atom/AtomRadioInput";
import { MolCreateUpdateGlobalRewardTaskForm } from "@mols/panel/MolCreateUpdateGlobalRewardTaskForm";
import { MolCreateUpdateIndividualRewardTaskForm } from "@mols/panel/MolCreateUpdateIndividualRewardTaskForm";
import { ReactElement, useState } from "react";
import { RewardTaskOut } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelCreateUpdateRewardTaskProps {
    type: "create" | "update"
    public: "all" | "individual"
    data: RewardTaskOut | null
    onClose: () => unknown
    onCreateOrUpdate: (data: RewardTaskOut) => unknown
}

export const OrgPanelCreateUpdateRewardTask = (props: IOrgPanelCreateUpdateRewardTaskProps): ReactElement => {
    const title = props.type === "create" ? "Criar tarefa de recompensa" : "Editar tarefa de recompensa"
    const [publics, setPublics] = useState<"all" | "individual">(props.public)
    const classProps = publics === "individual" ? "w-[725px] h-[719px] max-w-[719px]" : "w-[560px] h-[596px] max-w-[510px]"
    return (
        <>
            <div className={"bg-white py-[32px] px-[37px] flex flex-col items-start justify-start md:rounded-[16px] h-full md:h-fit w-full overflow-y-auto " + classProps}>
                <div className="w-full h-fit flex">
                    <AtomCloseBtn
                        className="ml-auto"
                        onClick={props.onClose}/>
                </div>
                <div>
                    <div className="text-[#32063D] text-[28px] font-medium font-['Geologica'] leading-9">{title}</div>
                </div>
                <div className="w-fit flex flex-col items-start pt-[44px] gap-y-[27px]">
                    <div className="w-[59px] h-3.5 text-[#4F4D56] text-sm font-normal font-['Geologica'] leading-tight">Público</div>
                    <div className="flex flex-row gap-x-[32px] w-fit">
                        <div className="flex flex-row h-fit gap-x-[9px]">
                            <AtomRadioInput
                                state={publics === "all"}
                                onClick={(): void => {
                                    setPublics("all")
                                }}
                            />
                            <div className="w-[46px] h-[13px] text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">Todos</div>
                        </div>
                        <div className="flex flex-row h-fit gap-x-[9px]">
                            <AtomRadioInput
                                state={publics === "individual"}
                                onClick={(): void => {
                                    setPublics("individual")
                                }}
                            />
                            <div className="w-[46px] h-[13px] text-neutral-400 text-base font-normal font-['Geologica'] leading-snug">Individual</div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pt-[32px] w-full">
                    {publics === "individual" ?
                        <MolCreateUpdateIndividualRewardTaskForm
                            onCreateOrUpdate={props.onCreateOrUpdate}
                            onClose={props.onClose}
                            data={props.data ?? undefined}
                            type={props.type}
                        /> : <MolCreateUpdateGlobalRewardTaskForm
                            onClose={props.onClose}
                            type={props.type}
                            data={props.data ?? undefined}
                            onCreateOrUpdate={props.onCreateOrUpdate}
                        />}
                </div>
            </div>
        </>
    )
}