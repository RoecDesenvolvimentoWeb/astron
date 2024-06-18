import { AtomBtn } from "@atom/AtomBtn";
import { ReactElement } from "react";
import { IMolMemberRowProps } from "./MolMemberRow";

interface IMolMemberInfoMobileProps extends IMolMemberRowProps {}

export const MolMemberInfoMobile = (props: IMolMemberInfoMobileProps): ReactElement => {
    return (
        <>
            <div className="flex flex-col gap-[24px] w-full px-2 sm:px-10">
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="text-fuchsia-950 text-sm font-normal font-['Geologica'] leading-tight">Nome</div>
                        <div className="w-[115px] h-[15px] text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">{props.name}</div>
                    </div>
                    <div>
                        <div className="text-fuchsia-950 text-sm font-normal font-['Geologica'] leading-tight">#Id</div>
                        <div className="w-[115px] h-[15px] text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">{props.id}</div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="text-fuchsia-950 text-sm font-normal font-['Geologica'] leading-tight">Telegram</div>
                        <div className="w-[115px] h-[15px] text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">{props.isActive ? "Ativo" : "Inativo"}</div>
                    </div>
                    <div>
                        <div className="text-fuchsia-950 text-sm font-normal font-['Geologica'] leading-tight">E-mail</div>
                        <div className="w-[115px] h-[15px] text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">{props.email}</div>
                    </div>
                </div>
                <div className="flex flex-row justify-between">
                    <div>
                        <div className="text-fuchsia-950 text-sm font-normal font-['Geologica'] leading-tight">Telefone</div>
                        <div className="w-[115px] h-[15px] text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">{props.phone}</div>
                    </div>
                    <div className="w-[115px]">
                        <div className="text-fuchsia-950 text-sm font-normal font-['Geologica'] leading-tight">Restrição</div>
                        <div className="w-[115px] h-[15px] text-neutral-600 text-sm font-normal font-['Geologica'] leading-tight">
                            {props.MemberRestriction != null ?
                                (props.botId && <AtomBtn
                                    onClick={(): void => {
                                        props.onChangeRestriction(props.botId as number, props.id)
                                    }}
                                    className="!text-[#32063D] border-[#32063D] border-[1px] max-w-[100px]">Desbloquear</AtomBtn>)
                                :
                                props.botId && <AtomBtn
                                    onClick={(): void => {
                                        props.onChangeRestriction(props.botId as number, props.id)
                                    }}
                                    className="!text-[#32063D] border-[#32063D] border-[1px] max-w-[100px]">Bloquear</AtomBtn>
                            }
                        </div>
                    </div>
                </div>
                <div className="w-full bg-[#c0c0c0] h-[1px] mb-2"/>
            </div>
        </>
    )
}