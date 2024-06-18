import { IExtraRedirectBtnOut, MolEditCreateRedirectBtn } from "@mols/panel/MolEditCreateRedirectBtnForm";
import { ReactElement } from "react";

interface IOrgPanelRedirectBtnWrapperProps {
    action: "CREATE" | "EDIT"
    onClose: () => unknown
    onSubmit: (data: IExtraRedirectBtnOut, action: IOrgPanelRedirectBtnWrapperProps["action"]) => unknown
    data?: IExtraRedirectBtnOut
}

export const OrgPanelRedirectBtnWrapper = (props: IOrgPanelRedirectBtnWrapperProps): ReactElement => {
    return (
        <>
            <div className="fixed left-0 top-0 h-screen w-screen bg-[#7A7A7A66] flex items-center justify-center z-40">
                <MolEditCreateRedirectBtn
                    onSubmit={(data): void => {
                        props.onSubmit(data, props.action)
                    }}
                    data={props.data}
                    currentAction={props.action}
                    onClose={props.onClose}
                />
            </div>
        </>
    )
}