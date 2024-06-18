import { AtomTitle } from "@atom/AtomTitle";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { BotWithActiveClientsCount } from "resources/api/server/contracts/ServerApiModel";
import { OrgPanelActiveBotsCard } from "../bot/creation/OrgPanelActiveBotsCard";
import { OrgPanelNotActiveBotsCard } from "../bot/creation/OrgPanelNotActiveBotsCard";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgPanelPopulaterSignatureCard } from "./signature-cards/OrgPanelPopularSignatureCard";

interface IOrgPanelMainContentSignatureProps extends IDefaultProps {}

const serverApi = new ServerApi()

export const OrgPanelMainContentSignature = ({ setIsLoading }: IOrgPanelMainContentSignatureProps): ReactElement => {
    const [botId] = useLocalStorage<number | undefined>("@selected-bot", undefined)
    const [activeBots, setActiveBots] = useState<BotWithActiveClientsCount[]>([])

    const loadBots = async (): Promise<void> => {
        const prom = serverApi.getAllBotsWithActiveClientsCount()
        await commonPromiseHandle<BotWithActiveClientsCount[]>(prom, setActiveBots)
    }

    const onActivePlan = (plan: "FREE_PERMANENT"): void => {
        if (botId == null) {
            toast.custom("Você não possui bot ativo/selecionado")
            return
        }
        const prom = serverApi.activePlan(plan, botId)
        commonPromiseHandle(prom, undefined,
            "Não foi possível ativar o plano",
            "Plano ativado com sucesso"
        ).catch(() => {
            toast.error("Não foi possível atualizar o plano")
        })
    }

    useEffect(() => {
        loadPageResoucers(
            setIsLoading,
            loadBots()
        ).catch(() => {})
    }, [])

    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Ativar assinatura"/>
                <div className="pt-[35px] sm:pt-[29px] flex flex-col md:flex-row gap-[27.5px] justify-between md:pr-[50px] overflow-x-auto h-full w-full">
                    <div className="max-w-[350px] md:max-w-[500px]">
                        <OrgPanelPopulaterSignatureCard
                            onActivePlan={onActivePlan}
                        />
                    </div>
                    <div className="w-full min-w-[300px] max-w-fit h-fit overflow-x-auto overflow-y-hidden md:overflow-hidden min-h-[642px]">
                        {activeBots.length > 0 ? <OrgPanelActiveBotsCard
                            activeBots={activeBots}
                        /> : <OrgPanelNotActiveBotsCard/>}
                    </div>
                </div>
            </MolMainContentWrapper>
        </>
    )
}