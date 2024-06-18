import { AtomTitle } from "@atom/AtomTitle";
import { MolBotUpdateLink } from "@mols/panel/MolBotUpdateLink";
import { BotConfigurationOut, MolFormBotConfiguration } from "@mols/panel/MolFormBotConfiguration";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { BotWithActiveClientsCount, IBotInfo } from "resources/api/server/contracts/ServerApiModel";
import { commonPromiseHandle } from "../../commonPromiseHandle";
import { IDefaultProps } from "../../default-props-main_content";
import loadPageResoucers from "../../loadPageResoucers";
import { OrgPanelActiveBotsCard } from "../creation/OrgPanelActiveBotsCard";
import { OrgPanelBoostSales } from "../creation/OrgPanelBoostSales";
import { OrgPanelNotActiveBotsCard } from "../creation/OrgPanelNotActiveBotsCard";

interface IOrgPanelMainContentBotConfigurationProps extends IDefaultProps {
    className?: string
}

const serverApi = new ServerApi()

export const OrgPanelMainContentBotConfiguration = (props: IOrgPanelMainContentBotConfigurationProps): ReactElement => {
    const [botId] = useLocalStorage<number | undefined>("@selected-bot", undefined)
    const [activeBots, setActiveBots] = useState<BotWithActiveClientsCount[]>([])
    const [selectedBotInfo, setSelectedBotInfo] = useState<null | IBotInfo>(null)
    const [isLoadingForm, setIsLoadingForm] = useState(false)
    const [pageIsLoading, setIsLoading] = useState(true)

    const loadBots = async (): Promise<void> => {
        const prom = serverApi.getAllBotsWithActiveClientsCount()
        await commonPromiseHandle<BotWithActiveClientsCount[]>(prom, setActiveBots)
    }

    const loadSelectedBot = async (): Promise<void> => {
        if (botId == null) return
        const prom = serverApi.getBot(botId)
        await commonPromiseHandle<IBotInfo | null>(prom, setSelectedBotInfo)
    }

    const onUpdateBot = (data: BotConfigurationOut): void => {
        if (botId == null) return
        setIsLoadingForm(true)
        const prom = serverApi.updatedBot(botId, data)
        commonPromiseHandle(prom,
            undefined,
            "Ocorreu algum erro, e não foi possível atualizar o bot. Tente novamente.",
            "Bot atualizado com sucesso"
        ).catch(() => {
            toast.error(
                "Não foi possível atualizar o bot. Tente novamente."
            );
        })
            .finally(() => {
                setIsLoadingForm(false)
            })
    }

    const onEnableOrDisableBot = (status: boolean): void => {
        if (botId == null) return
        setIsLoadingForm(true)
        const prom = serverApi.enableOrDisableBot(botId, status)
        commonPromiseHandle(prom,
            undefined,
            `Ocorreu algum erro, e não foi possível ${status ? "ativar" : "desativar"} o bot. Tente novamente.`,
            `Bot ${status ? "ativado" : "desativado"} com sucesso`)
            .catch(() => {
                toast.error(
                    `Não foi possível ${status ? "ativar" : "desativar"} o bot. Tente novamente.`
                );
            })
            .finally(() => {
                setIsLoadingForm(false)
                setTimeout(() => {
                    location.reload()
                }, 400)
            })
    }

    const onUpdateBotLink = (): void => {
        if (botId == null) return
        setIsLoadingForm(true)
        const prom = serverApi.updateBotLink(botId)
        commonPromiseHandle(prom,
            undefined,
            "Ocorreu algum erro, e não foi possível atualizar do bot. Tente novamente.",
            "Link atualizado com sucesso")
            .catch(() => {
                toast.error(
                    "Não foi possível atualizar o link do bot."
                );
            })
            .finally(() => {
                setIsLoadingForm(false)
            })
    }

    useEffect(() => {
        loadPageResoucers(props.setIsLoading, loadBots(), loadSelectedBot())
            .catch(() => {})
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    return (
        <>
            <>
                <MolMainContentWrapper className={props.className}>
                    <div className="flex w-full flex-col gap-y-2 md:flex-row items-center gap-x-10">
                        <AtomTitle
                            className="!w-fit"
                            title="Configurações do bot"/>
                        <>
                            <MolBotUpdateLink
                                onUpdateLink={onUpdateBotLink}
                            />
                        </>
                    </div>
                    <div className={"flex flex-col gap-y-[42px] md:gap-y-0 md:gap-x-[42px] md:flex-row"}>
                        <div className="w-full overflow-x-auto md:overflow-hidden md:min-w-fit min-h-fit h-full">
                            {!pageIsLoading && <MolFormBotConfiguration
                                onActiveBot={onEnableOrDisableBot}
                                onUpdate={onUpdateBot}
                                currentBotId={botId}
                                botData={selectedBotInfo ?? undefined}
                                isLoading={isLoadingForm}
                            />}
                        </div>
                        <div className="flex flex-col w-full md:min-w-fit gap-y-[24px]">
                            <div className="w-full min-w-[300px] h-fit overflow-x-auto overflow-y-hidden md:overflow-hidden">
                                {activeBots.length > 0 ? <OrgPanelActiveBotsCard
                                    activeBots={activeBots}
                                /> : <OrgPanelNotActiveBotsCard/>}
                            </div>
                            <div className="min-h-fit min-w-[300px] overflow-x-auto overflow-y-hidden">
                                <OrgPanelBoostSales/>
                            </div>
                        </div>
                    </div>
                </MolMainContentWrapper>
            </>
        </>
    )
}