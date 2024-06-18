import { AtomCard } from "@atom/AtomCard";
import { MolRedirectBtnTable } from "@mols/panel/MolRedirectBtnTable";
import { Idiom } from "@mols/panel/MolTelegramConfigForm";
import { MolUpperInfoRedirectBt } from "@mols/panel/MolUpperInfoRedirectBt";
import { ReactElement } from "react";
import { IExtraRedirectBtn } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelRedirectBtnCardProps {
    onCreateNewRedirectBtn: () => unknown
    onEditRedirectBtn: (id: number) => unknown
    onDeleteRedirectBtn: (id: number) => unknown
    onIdiomChange: (idiom: Idiom) => unknown
    redirectBtns: IExtraRedirectBtn[]
}

export const OrgPanelRedirectBtnCard = (props: IOrgPanelRedirectBtnCardProps): ReactElement => {
    const onIdiomChange = (idiom: Idiom): void => {
        props.onIdiomChange(idiom)
    }
    return (
        <>
            <AtomCard className="bg-white min-w-full md:min-w-[703px] h-[830px] rounded-[16px] flex-col space-y-[52px] pt-[29px] pb-[80px] px-[57px]">
                <MolUpperInfoRedirectBt
                    onIdiomChange={onIdiomChange}
                    onCreateNewBtn={(): void => {
                        props.onCreateNewRedirectBtn()
                    }}
                />
                <>
                    <MolRedirectBtnTable
                        onDeleteRedirectBtn={props.onDeleteRedirectBtn}
                        onEditRedirectBtn={(data): void => {
                            props.onEditRedirectBtn(data)
                        }}
                        rows={props.redirectBtns.map(r => ({ ...r, objective: "" }))}/>
                </>
            </AtomCard>
        </>
    )
}