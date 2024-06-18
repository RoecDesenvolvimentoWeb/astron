import { AtomBtn } from "@atom/AtomBtn";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface IMolMembersActiveCardProps {
    membersActiveCount: number
}

export const MolMembersActiveCard = (props: IMolMembersActiveCardProps): ReactElement => {
    const navigate = useNavigate()
    return (
        <>
            <div className="w-full md:w-fit min-w-[182px] md:max-w-[182px] h-[196px] bg-[#491F50] rounded-lg flex flex-col py-[21px]" >
                <div className="w-full flex justify-center">
                    <div className="w-[110px] h-[59px] flex-col justify-start items-center inline-flex">
                        <div className="text-white text-[32px] font-medium font-['Geologica'] leading-[44.80px]">{props.membersActiveCount}</div>
                        <div className="text-neutral-200 text-sm font-normal font-['Geologica'] leading-tight">membros ativos</div>
                    </div>
                </div>
                <div className="flex justify-center pt-[15px]">
                    <div className="w-[133.25px] h-[41px] bg-[url('/src/assets/avatargroup.svg')] bg-cover bg-no-repeat"/>
                </div>
                <div className="w-full flex justify-center relative">
                    <AtomBtn
                        onClick={(): void => {
                            navigate("/panel/member/report")
                        }}
                        className={"bg-lilas-lv1 absolute top-7 !w-full"}>
                        Ver todos
                    </AtomBtn>
                </div>
            </div>
        </>
    )
}