import { MolActionLayerWrapper } from "@mols/panel/MolActionLayerWrapper";
import { MolGlobalLoading } from "@mols/panel/MolGlobalLoading";
import { ReactElement } from "react";
import { RewardTaskOut } from "resources/api/server/contracts/ServerApiModel";
import { OrgPanelCreateUpdateRewardTask } from "./OrgPanelCreateUpdateRewardTask";

export interface IOrgPanelRewardTaskActionProps {
    isActive: boolean
    public: "all" | "individual"
    type: "create" | "update"
    onClose: () => unknown,
    isLoading: boolean,
    rewardTask: RewardTaskOut | null
    onCreateOrUpdate: (type: "create" | "update",data: RewardTaskOut) => unknown
}

export const OrgPanelRewardTaskAction = (props: IOrgPanelRewardTaskActionProps): ReactElement => {
    const resource = props.isActive && (props.isLoading ?
        <MolGlobalLoading/>
        :
        <MolActionLayerWrapper className="flex items-center justify-center overflow-auto md:py-0 md:px-4">
            <OrgPanelCreateUpdateRewardTask
                onCreateOrUpdate={(data): void => {
                    console.log(props.type)
                    props.onCreateOrUpdate(props.type, data)
                }}
                data={props.rewardTask}
                onClose={(): void => {
                    props.onClose()
                }}
                public={props.rewardTask ? (
                    props.rewardTask.isIndividual ? "individual" : "all"
                ) : props.public}
                type={props.type}
            />
        </MolActionLayerWrapper>
    )
    return (
        <>
            {resource}
        </>
    )
}