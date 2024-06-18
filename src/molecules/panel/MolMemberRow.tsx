import { AtomBtn } from "@atom/AtomBtn";
import { ReactElement } from "react";
import { IMemberRestriction } from "resources/api/server/contracts/ServerApiModel";

export interface IMolMemberRowProps {
    id: number
    name: string
    email: string
    phone: string
    isActive: boolean
    onChangeRestriction: (botId: number, memberId: number) => void
    expiresAt?: Date
    botId?: number
    MemberRestriction?: IMemberRestriction
}

export const MolMemberRow = (props: IMolMemberRowProps): ReactElement => {
    const exp = props.expiresAt ? new Date(props.expiresAt).toLocaleDateString("pt-BR") : ""
    return (
        <>
            <tr className="text-start text-[14px] font-normal text-[#505050]">
                <td className="pl-[24px]">{props.id}</td>
                <td>{props.name}</td>
                <td>{props.email}</td>
                <td>{props.phone}</td>
                <td>{exp ?? ""}</td>
                <td>{props.isActive ? "Ativo" : "Inativo"}</td>
                <td>
                    {props.MemberRestriction != null ?
                        (props.botId && <AtomBtn
                            onClick={(): void => {
                                props.onChangeRestriction(props.botId as number, props.id)
                            }}
                            className="!text-[#32063D] border-[#32063D] border-[1px] max-w-[120px]">Desbloquear</AtomBtn>)
                        :
                        props.botId && <AtomBtn
                            onClick={(): void => {
                                props.onChangeRestriction(props.botId as number, props.id)
                            }}
                            className="!text-[#32063D] border-[#32063D] border-[1px] max-w-[120px]">Bloquear</AtomBtn>
                    }
                </td>
            </tr>
        </>
    )
}