import { MolMemberRow } from "@mols/panel/MolMemberRow"
import { ReactElement } from "react"
import { Out } from "resources/api/server/contracts/member-report"

interface IOrgPanelTableUsersProps {
    out: Out
    onChangeRestriction: (botId: number, memberId: number) => unknown
    botId?: number
}

export const OrgPanelTableUsers = ({ out, onChangeRestriction, botId }: IOrgPanelTableUsersProps): ReactElement => {
    return (
        <>
            <table className={"border-separate border-spacing-[50px_0] w-full"}>
                <thead className="bg-[#F6F8F9] py-[53px] border-t-[4px] rounded-t-[4px] sticky top-0 left-0">
                    <tr className="whitespace-nowrap">
                        <th className="pl-[24px] pr-[57px] rounded-tl-[4px]">#Id</th>
                        <th className="pr-[65px]">Nome</th>
                        <th className="pr-[162px]">E-mail</th>
                        <th className="pr-[49px]">Telefone</th>
                        <th className="pr-[44px]">Expira em</th>
                        <th className="pr-[49px]">Telegram</th>
                        <th className="pr-[84px] rounded-tr-[4px]">Ações</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {out.pages[0]?.items.map((v, i) =>
                        <MolMemberRow
                            key={i}
                            onChangeRestriction={onChangeRestriction}
                            botId={botId}
                            {...v}/>)}
                </tbody>
            </table>
        </>
    )
}