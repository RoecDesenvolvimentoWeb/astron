import { MolMemberInfoMobile } from "@mols/panel/MolMemeberInfoMobile";
import { ReactElement } from "react";
import { Out } from "resources/api/server/contracts/member-report";

interface IOrgPanelUserListMobileProps {
    out: Out
    onChangeRestriction: (botId: number, memberId: number) => unknown
    botId?: number
}

export const OrgPanelUserListMobile = ({ out, onChangeRestriction, botId}: IOrgPanelUserListMobileProps): ReactElement => {
    return (
        <>
            <div className="flex flex-col w-full max-h-[300px] overflow-y-auto">
                {out.pages[0]?.items.map((u, i) =>
                    <MolMemberInfoMobile
                        key={i}
                        botId={botId}
                        onChangeRestriction={onChangeRestriction}
                        {...u}/>)}
            </div>
        </>
    )
}