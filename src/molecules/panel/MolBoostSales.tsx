import { AtomCloseCard } from "@atom/AtomCloseCard";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

interface IMolBoostSalesProps {
    onCloseCard: () => unknown
}

export const MolBoostSales = (props: IMolBoostSalesProps): ReactElement => {
    const navigate = useNavigate()
    const onClickCreatedRewardTask = (): void => {
        navigate("/panel/rewardtask?create=true")
    }
    return (
        <>
            <div className="bg-[#F6F6F9] rounded-[20px] mx-auto md:mx-0 w-fit md:w-[445px] h-fit md:h-[190px] relative flex flex-col md:flex-row items-end md:items-center px-[33px] py-[33px]">
                <AtomCloseCard
                    onClick={props.onCloseCard}
                    className="md:absolute md:top-[20px] md:right-[20px]"
                />
                <div className="flex flex-col space-y-[10px] base:w-[220px] md:w-fit">
                    <div className="text-[#491F50] text-lg md:text-xl font-medium font-['Geologica'] leading-7">Crie tarefas de recompensa</div>
                    <div className="w-fit md:w-[312px] text-[#8A8D8F] text-sm md:text-base font-normal font-['Geologica'] leading-snug">Ofereça atividades e metas especiais em troca de recompensas para os seus membros.</div>
                    <div onClick={onClickCreatedRewardTask} className="cursor-pointer flex flex-row space-x-[5px] w-fit items-center">
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.83719 14.2228C1.73876 14.1889 1.65336 14.1251 1.59292 14.0403C1.53247 13.9556 1.49999 13.8541 1.5 13.75C1.5 11.4656 1.95875 9.63871 2.86406 8.31964C3.95781 6.72589 5.68312 5.86777 8 5.76121V3.24996C8.00001 3.15205 8.02876 3.0563 8.08269 2.97459C8.13662 2.89287 8.21335 2.82879 8.30337 2.79029C8.39339 2.75178 8.49273 2.74056 8.58907 2.758C8.68541 2.77544 8.77451 2.82078 8.84531 2.88839L14.3453 8.13839C14.3942 8.18508 14.4331 8.24119 14.4597 8.30333C14.4862 8.36548 14.5 8.43237 14.5 8.49996C14.5 8.56755 14.4862 8.63443 14.4597 8.69658C14.4331 8.75872 14.3942 8.81483 14.3453 8.86152L8.84531 14.1115C8.77451 14.1791 8.68541 14.2245 8.58907 14.2419C8.49273 14.2594 8.39339 14.2481 8.30337 14.2096C8.21335 14.1711 8.13662 14.107 8.08269 14.0253C8.02876 13.9436 8.00001 13.8479 8 13.75V11.2571C6.59375 11.2996 5.53125 11.5275 4.68531 11.9646C3.77125 12.4371 3.10844 13.1431 2.39406 14.0584C2.32998 14.1405 2.24187 14.2005 2.14204 14.23C2.04221 14.2596 1.93563 14.2573 1.83719 14.2234V14.2228Z" fill="#491F50"/>
                        </svg>
                        <div className="text-[#491F50] text-base md:text-lg font-medium font-['Geologica'] leading-[25.20px]">Configure agora</div>
                    </div>
                </div>
                <div className={"absolute -bottom-10 right-10"}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="117" height="82" viewBox="0 0 117 82" fill="none">
                        <g clip-path="url(#clip0_947_1265)">
                            <path d="M31.8004 37.0986L29.5262 61.5713L43.1197 43.7532L102.291 2.83562L31.8004 37.0986Z" fill="#E478E5"/>
                            <path d="M29.5262 61.5713L31.8004 37.0986L102.291 2.83562L43.1197 43.7532L29.5262 61.5713Z" fill="#D25AC4"/>
                            <path d="M46.6962 48.3794L29.5258 61.5713L43.1194 43.7532L46.6962 48.3794Z" fill="#2C3C43"/>
                            <path d="M43.1195 43.7532L102.29 2.83561L62.4002 69.2357L43.1195 43.7532Z" fill="#E478E5"/>
                            <path d="M31.8003 37.0988L0.000488281 26.7177L102.29 2.83579L31.8003 37.0988Z" fill="#E478E5"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_947_1265">
                                <rect width="105" height="57" fill="white" transform="translate(0 26.7153) rotate(-14.7399)"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
            </div>
        </>
    )
}