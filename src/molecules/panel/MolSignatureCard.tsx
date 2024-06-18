import { AtomBtn } from "@atom/AtomBtn";
import { AtomCard } from "@atom/AtomCard";
import { ReactElement } from "react";

interface IMolSignatureCardProps {
    Image: ReactElement
    planDetails: ReactElement[]
    onActive: () => unknown
}

export const MolSignatureCard = (props: IMolSignatureCardProps): ReactElement => {
    return (
        <>
            <AtomCard className="min-w-[300px] md:min-w-[395px] h-fit bg-white rounded-[16px] !px-0 relative !justify-start mt-10 flex-col flex">
                <div className="w-full h-[120px] sm:h-[163px] relative">
                    <div className="w-full h-full absolute -top-[3.45rem]">
                        {props.Image}
                    </div>
                </div>
                <div className="px-[22px] sm:py-[19px] md:py-[24px] w-full h-fit">
                    <div className="w-full md:w-[351px] min-w-full text-fuchsia-950 text-[24px] sm:text-[28px] font-medium font-['Geologica'] leading-9">Plano gratuito</div>
                    <div className="flex flex-col items-start font-geo text-[14px] font-normal gap-y-[19px] md:gap-y-[24px] mt-[24px] w-full">
                        {props.planDetails.map(v => (v))}
                    </div>
                    <div>
                        <AtomBtn
                            onClick={props.onActive}
                            className="bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 w-full py-[24px] mt-[32px] flex justify-center !items-center"
                        >
                            Assinar plano
                        </AtomBtn>
                    </div>
                </div>
            </AtomCard>
        </>
    )
}