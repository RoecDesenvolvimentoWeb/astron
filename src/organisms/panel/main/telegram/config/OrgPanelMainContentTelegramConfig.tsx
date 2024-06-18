import { AtomTitle } from "@atom/AtomTitle";
import { BotConfigurationOut } from "@mols/panel/MolFormBotConfiguration";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { BotConfigurationOutTelegram, Idiom, MolTelegramConfigForm } from "@mols/panel/MolTelegramConfigForm";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { BotWithActiveClientsCount, errors } from "resources/api/server/contracts/ServerApiModel";
import { OrgPanelActiveBotsCard } from "../../bot/creation/OrgPanelActiveBotsCard";
import { OrgPanelBoostSales } from "../../bot/creation/OrgPanelBoostSales";
import { OrgPanelNotActiveBotsCard } from "../../bot/creation/OrgPanelNotActiveBotsCard";
import { IDefaultProps } from "../../default-props-main_content";
import loadPageResoucers from "../../loadPageResoucers";


interface IOrgPanelMainContentTelegramConfigProps extends IDefaultProps {}

export type BotConfigurationOutTelegramWithIdiom = BotConfigurationOutTelegram & { idiom: Idiom }

const serverApi = new ServerApi()

export const OrgPanelMainContentTelegramConfig = ({ setIsLoading }: IOrgPanelMainContentTelegramConfigProps): ReactElement => {
    const [activeBots, setActiveBots] = useState<BotWithActiveClientsCount[]>([])
    const [bot, setBot] = useState<BotConfigurationOutTelegram>()
    const [botId] = useLocalStorage<number | undefined>("@selected-bot", undefined)
    const [formIsLoading, setFormIsLoading] = useState(false)

    const loadBots = async (): Promise<void> => {
        await serverApi.getAllBotsWithActiveClientsCount()
            .then((result) => {
                if (result.data.success) {
                    const activeBots = result.data.data
                    setActiveBots(activeBots as BotWithActiveClientsCount[])
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadSelectedBot = async (idiom?: Idiom): Promise<void> => {
        if (botId != null) await serverApi.getBot(Number(botId), idiom).then((result) => {
            if (result.data.success) {
                const activeBots = result.data.data
                setBot(activeBots as BotConfigurationOut)
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
            );
        })
    }

    const loadSelectedWithTryClause = async (idiom?: Idiom): Promise<void> => {
        await loadSelectedBot(idiom).catch(() => {
            toast.error("Não foi possível carregar as informações")
        })
    }

    const onUpdateBot = (data: BotConfigurationOutTelegramWithIdiom): void => {
        if (botId != null) {
            setFormIsLoading(true)
            serverApi.updateBotTelegram(Number(botId), data).then((result): void => {
                if (result.data.success) {
                    toast.success("Bot atualizado com sucesso")
                    setTimeout(() => {
                        location.reload()
                    }, 400)
                    return
                }
                if (result.data.code === errors.NOT_MATCHED) {
                    toast.error(
                        "Ocorreu algum erro, e não foi possível atualizar o bot. Tente novamente."
                    );
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Não foi possível atualizar o bot. Tente novamente."
                );
            }).catch(() => {
                toast.error(
                    "Ocorreu algum erro durante o processo"
                );
            })
                .finally(() => {
                    setFormIsLoading(false)
                })
        }
    }

    const onActiveBot = (): void => {
        if (botId == null) return
        setFormIsLoading(true)
        serverApi.enableOrDisableBot(botId, true)
            .then(result => {
                if (result.data.success) {
                    toast.success("Bot ativado com sucesso")
                    return
                }
                if (result.data.code === errors.NOT_MATCHED) {
                    toast.error(
                        "Ocorreu algum erro, e não foi possível ativar o bot. Tente novamente."
                    );
                    return
                }
                toast.error(
                    result.data.data.message ?? "Ocorreu algum erro, e não foi possível ativar o bot. Tente novamente."
                );
            })
            .catch(() => {
                toast.error(
                    "Não foi possível ativar o bot. Tente novamente."
                );
            })
            .finally(() => {
                setFormIsLoading(false)
            })
    }

    useEffect(() => {
        loadPageResoucers(setIsLoading,
            loadBots(),
            loadSelectedBot()).catch(() => {})
    }, [])

    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Configurações | Telegram"/>
                <div className="flex flex-col md:flex-row gap-[24px]">
                    <div>
                        <MolTelegramConfigForm
                            onIdiomChange={loadSelectedWithTryClause}
                            onActiveBot={onActiveBot}
                            data={bot}
                            onSubmit={onUpdateBot}
                            isLoading={formIsLoading}
                        />
                    </div>
                    <div className="flex flex-col gap-y-[24px]">
                        {activeBots.length > 0 ?
                            <OrgPanelActiveBotsCard
                                activeBots={activeBots}
                            /> :
                            <OrgPanelNotActiveBotsCard/>
                        }
                        <OrgPanelBoostSales/>
                    </div>
                </div>
            </MolMainContentWrapper>
        </>
    )
}