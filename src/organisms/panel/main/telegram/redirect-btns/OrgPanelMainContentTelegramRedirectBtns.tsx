import { AtomTitle } from "@atom/AtomTitle";
import { IExtraRedirectBtnOut } from "@mols/panel/MolEditCreateRedirectBtnForm";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { Idiom } from "@mols/panel/MolTelegramConfigForm";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { BotWithActiveClientsCount, IExtraRedirectBtn, errors } from "resources/api/server/contracts/ServerApiModel";
import { OrgPanelActiveBotsCard } from "../../bot/creation/OrgPanelActiveBotsCard";
import { OrgPanelBoostSales } from "../../bot/creation/OrgPanelBoostSales";
import { OrgPanelNotActiveBotsCard } from "../../bot/creation/OrgPanelNotActiveBotsCard";
import { IDefaultProps } from "../../default-props-main_content";
import loadPageResoucers from "../../loadPageResoucers";
import { OrgPanelRedirectBtnCard } from "./OrgPanelRedirectBtnCard";
import { OrgPanelRedirectBtnWrapper } from "./OrgPanelRedirectBtnWrapper";

interface IOrgPanelMainContentTelegramRedirectBtnsProps extends IDefaultProps {}

const serverApi = new ServerApi()

export const OrgPanelMainContentTelegramRedirectBtns = ({ setIsLoading }: IOrgPanelMainContentTelegramRedirectBtnsProps): ReactElement => {
    const [isVisibleEditCreateBtnOrg, setIsVisibleEditCreateBtnOrg] = useState(false)
    const [btnIdInUpdate, setBtnIdInUpdate] = useState<number>()
    const [idiom, setIdiom] = useState<Idiom>("PT")
    const [currentAction, setAction] = useState<"CREATE" | "EDIT">("CREATE")
    const [activeBots, setActiveBots] = useState<BotWithActiveClientsCount[]>([])
    const [redirectBtns, setRedirectBtns] = useState<IExtraRedirectBtn[]>([])
    const [botId] = useLocalStorage<number | undefined>("@selected-bot", undefined)

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

    const loadBtns = async (idiom?: Idiom): Promise<void> => {
        if (botId == null) return
        await serverApi.loadRedirectBtns(botId, idiom)
            .then((result) => {
                if (result.data.success) {
                    const activeBots = result.data.data
                    setRedirectBtns(activeBots as IExtraRedirectBtn[])
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadBtnsWithTryClause = async (idiom?: Idiom): Promise<void> => {
        if (botId == null) return
        await loadBtns(idiom).catch(() => {
            toast.error("Não foi possível carregar as informaçÕes")
        })
    }

    const onCreateOrUpdateRedirectBtn = (data: IExtraRedirectBtnOut, action: "CREATE" | "EDIT"): void => {
        if (botId == null) return
        serverApi.updateOrCreateRedirectBtn({
            ...data,
            botId: botId,
            btnId: btnIdInUpdate,
            idiom
        },
        action === "CREATE" ? "create" : "update"
        ).then((result) => {
            if (result.data.success) {
                toast.success("Botão criado/atualizado com sucesso")
                setTimeout(() => {
                    location.reload()
                }, 500)
                return
            }
            if (result.data.code === errors.NOT_MATCHED) {
                toast.error(
                    "Não foi possível atualizar/criar o botão"
                );
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao atualizar/criar o botão"
            );
        }).catch(() => {
            toast.error(
                "Não foi possível atualizar/criar o botão"
            );
        })
    }

    const onDeleteRedirectBtn = (btnId: number): void => {
        if (botId == null) return
        serverApi.deleteRedirectBtn(btnId).then((result) => {
            if (result.data.success) {
                toast.success("Botão deletado com sucesso")
                setTimeout(() => {
                    location.reload()
                }, 500)
                return
            }
            if (result.data.code === errors.NOT_MATCHED) {
                toast.error(
                    "Não foi possível deletar o botão"
                );
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao deletar o botão"
            );
        }).catch(() => {
            toast.error(
                "Não foi possível deletar o botão"
            );
        })
    }

    const onIdiomChange = (idiom: Idiom): void => {
        setIdiom(idiom)
        loadBtnsWithTryClause(idiom)
            .catch(() => {})
    }

    useEffect(() => {
        loadPageResoucers(setIsLoading,
            loadBots(),
            loadBtns()
        ).catch(() => {})
    }, [])

    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Botões de redirecionamento"/>
                <div className="flex flex-col gap-y-[24px] md:flex-row md:gap-y-0 md:gap-x-[24px] ">
                    <div>
                        <OrgPanelRedirectBtnCard
                            redirectBtns={redirectBtns}
                            onDeleteRedirectBtn={onDeleteRedirectBtn}
                            onCreateNewRedirectBtn={(): void => {
                                setAction("CREATE")
                                setIsVisibleEditCreateBtnOrg(true)
                            }}
                            onEditRedirectBtn={(id: number): void => {
                                setAction("EDIT")
                                setIsVisibleEditCreateBtnOrg(true)
                                setBtnIdInUpdate(id)
                            }}
                            onIdiomChange={onIdiomChange}
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
            {isVisibleEditCreateBtnOrg && <OrgPanelRedirectBtnWrapper
                data={redirectBtns.find(r => r.id === btnIdInUpdate)}
                onSubmit={onCreateOrUpdateRedirectBtn}
                action={currentAction}
                onClose={(): void => {
                    setAction("CREATE")
                    setIsVisibleEditCreateBtnOrg(false)
                    setBtnIdInUpdate(undefined)
                }}
            />}
        </>
    )
}