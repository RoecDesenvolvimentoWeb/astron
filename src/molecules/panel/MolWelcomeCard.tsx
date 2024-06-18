import welcomeDashboard from "@asset/welcomelogodashboard.png";
import { AtomBtn } from "@atom/AtomBtn";
import { AtomCard } from "@atom/AtomCard";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement } from "react";
import { Link } from "react-router-dom";

interface IMolWelcomeCard {
    username: string
}

export const MolWelcomeCard = ({ username = "Augusto Silva!" }: IMolWelcomeCard): ReactElement => {
    const md = useMediaQuery("(max-width: 768px)")
    const welcomeMessage = !md ? <>Seja bem-vindo, <br/>{username}!</> : <>Seja bem-vindo, {username}!</>
    return (
        <>
            <AtomCard
                className={[
                    "bg-[#e6e1ec] sm:px-[18px] md:pl-[54px] md:pr-[18px] w-full md:w-fit md:min-w-[829px] max-w-[829px] h-[374px] flex-shrink-0 shadow-[4px_4px_4px_0px_rgba(232,232,232,0.13)]",
                    "flex md:flex-row flex-col-reverse"
                ].join("")}
            >
                <div className={"font-geo flex flex-col px-2 pb-4 sm:px-0 gap-y-[12px] w-full md:w-fit"}>
                    <p className={"text-[20px] md:text-[40px] font-medium leading-[140%]"}>
                        {welcomeMessage}
                    </p>
                    <p className={"font-geo text-[14px] md:text-[18px] font-extralight"}>
                        Cadastre um novo bot, e começe a lucrar<br/> hoje mesmo com o serviço de gerenciamento!
                    </p>
                    <Link
                        to={"/panel/bot/creation"}>
                        <AtomBtn className={"bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 !w-full min-w-fit md:w-fit text-[11px] sm:text-[13px] md:text-[15px]"}>
                            Cadastrar novo bot
                        </AtomBtn>
                    </Link>
                </div>
                <div className="pt-[36px] max-w-[250px] max-h-[300px] md:max-h-fit md:max-w-fit">
                    <img src={welcomeDashboard} alt="Welcome dashboard"/>
                </div>
            </AtomCard>
        </>
    )
}