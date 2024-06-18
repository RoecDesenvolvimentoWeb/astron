import { ReactElement } from "react";

export type TRewardTypeOut =  "ALL" | "GLOBAL" | "INDIVIDUAL"

interface IMolRewardTaskFilterProps {
    onChange: (type: "ALL" | "GLOBAL" | "INDIVIDUAL") => unknown
}

export const MolRewardTaskFilter = ({ onChange }: IMolRewardTaskFilterProps): ReactElement => {
    return (
        <>
            <div className="bg-white rounded-[50px] px-[24px] py-[10px] flex items-cneter justify-center">
                <select onChange={(e): void => {
                    onChange(e.target.value as TRewardTypeOut)
                }} className="rewardTaskFilter">
                    <option value={"ALL"}>Todas tarefas</option>
                    <option value={"INDIVIDUAL"}>Tarefas individuais</option>
                    <option value={"GLOBAL"}>Tarefas para todos</option>
                </select>
            </div>
        </>
    )
}