import { AtomLoading } from "@atom/AtomLoading";
import { AtomTitle } from "@atom/AtomTitle";
import { MolBotCustomizeCardRedirect } from "@mols/panel/MolBotCustomizeCardRedirect";
import { MolLastMembers } from "@mols/panel/MolLastMembers";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { MolMemberFilter } from "@mols/panel/MolMemberFilter";
import { MolMemberPagination } from "@mols/panel/MolMemberPagination";
import { MolMonthInsights } from "@mols/panel/MolMonthInsights";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { BotWithActiveClientsCount, ILastMember } from "resources/api/server/contracts/ServerApiModel";
import { Out } from "resources/api/server/contracts/member-report";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgPanelTableUsers } from "./OrgPanelTableUsers";
import { OrgPanelUserListMobile } from "./OrgPanelUserListMobile";

interface IOrgPanelMainContentMemberReportProps extends IDefaultProps {}

const serverApi = new ServerApi()

const PAGES_TO_LOAD = 8

const INITIAL_PAGES = [
    {
        page: 1
    },
    {
        page: 2
    },
    {
        page: 3
    },
    {
        page: 4
    }
]

const INITIAL_MEMBER_RESULT = {
    pages: [
        {
            items: []
        }
    ]
}

interface Page {
    page: number
}

const getPages = (firstPage: number, lastPage: number, targetPage: number, result: never[]): Page[] => {
    if (result.length == 0) return [] // The pages stay the same
    const pages: Page[] = []
    if (targetPage == lastPage) {
        for (let x = targetPage - 1; x < lastPage + 3; x++) {
            pages.push({
                page: x
            })
        }
    }
    if (targetPage === firstPage && firstPage != 1) {
        for (let x = targetPage - 2; x < targetPage + 2; x++) {
            pages.push({
                page: x
            })
        }
    }
    return pages
}

export const OrgPanelMainContentMemberReport = ({ setIsLoading }: IOrgPanelMainContentMemberReportProps): ReactElement => {
    const [botId] = useLocalStorage<number | undefined>("@selected-bot", undefined)
    const [lastMembers, setLastMembers] = useState<ILastMember[]>([])
    const [result, setResult] = useState<Out>(INITIAL_MEMBER_RESULT)
    const [pages, setPages] = useState<Page[]>(INITIAL_PAGES)
    const [currentPage, setCurrentPage] = useState(1)
    const [bots, setBots] = useState<BotWithActiveClientsCount[]>([])
    const [totalResults, setTotalResults] = useState<number>(0)
    const [filter, setFilter] = useState<{ botId: number | undefined, clientId: number | undefined}>({
        botId: undefined,
        clientId: undefined
    })
    const [activeMembersCount, setActiveMembersCount] = useState<number>(0)
    const [activeBotsCount, setActiveBotsCount] = useState<number>(0)
    const [salePercent, setSalePercent] = useState(0)
    const [isLoadingResource, setIsLoadingResource] = useState(false)

    const loadMembers = async (): Promise<void> => {
        setIsLoadingResource(true)
        const queryBot = filter.botId ? { botId: filter.botId } : {}
        const queryMember = filter.clientId ? { memberId: filter.clientId }: {}
        await serverApi.loadMembers({
            ...queryBot,
            ...queryMember,
            loadPages: PAGES_TO_LOAD,
            page: currentPage
        }).then((result): void => {
            if (result.data.success) {
                const r = result.data.data
                const l = getPages(pages[0].page, pages[pages.length - 1].page, currentPage, (r as Out).pages as never[])
                if (l.length > 0) setPages(l)
                setTotalResults((r as unknown as { totalCount: number }).totalCount)
                setResult(r as Out)
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
            );
        })
            .finally(() => {
                setIsLoadingResource(false)
            })
    }

    const loadLastMembers = async (): Promise<void> => {
        const prom = serverApi.loadLastMembers()
        await commonPromiseHandle(
            prom,
            setLastMembers,
            "Ocorreu um erro ao buscar as informações"
        )
    }

    const loadBots = async (): Promise<void> => {
        const prom = serverApi.getAllBotsWithActiveClientsCount()
        await commonPromiseHandle(
            prom,
            setBots,
            "Ocorreu um erro ao buscar as informações"
        )
    }

    const loadSalePercent = async (): Promise<void> => {
        const prom = serverApi.loadSalePercent()
        await commonPromiseHandle(
            prom,
            setSalePercent,
            "Ocorreu um erro ao buscar as informações"
        )
    }

    const loadActiveMembersCount = async (): Promise<void> => {
        const prom = serverApi.getActiveMemebersCount()
        await commonPromiseHandle(
            prom,
            setActiveMembersCount,
            "Ocorreu um erro ao buscar as informações"
        )
    }

    const loadActiveBotsCount = async (): Promise<void> => {
        const prom = serverApi.getActiveBotsCount()
        await commonPromiseHandle(
            prom,
            setActiveBotsCount,
            "Ocorreu um erro ao buscar as informações"
        )
    }

    const exportMemberReport = (): void => {
        if (botId == null) return
        setIsLoadingResource(true)
        serverApi.exportMemberReport(botId).then((result): void => {
            console.log(result)
            if (result.data instanceof Blob) {
                location.href = URL.createObjectURL(new File([result.data], "relatorio", {
                    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                }))
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu algum erro ao exportar o relatório"
            );
        }).catch((e) => {
            console.error(e)
            toast.error("Não foi possível exportar o relatório")
        })
            .finally(() => {
                setIsLoadingResource(false)
            })
    }

    const changeMemberRestriction = (
        botId: number,
        memberId: number
    ): void => {
        if (botId == null) {
            toast.error("Nenhum bot selecionado")
            return
        }
        const prom = serverApi.changeMemberRestriction({
            botId: String(botId),
            clientId: String(memberId)
        })
        commonPromiseHandle(
            prom,
            undefined,
            "Não foi possível alterar a restrição do usuário",
            "Restrição atualizada com sucesso",
            undefined,
            () => {
                setTimeout(() => {
                    location.reload()
                }, 1000)
            }
        ).catch(() => {})
    }

    useEffect(() => {
        loadPageResoucers(setIsLoading,
            loadMembers(),
            loadLastMembers(),
            loadBots(),
            loadActiveMembersCount(),
            loadActiveBotsCount(),
            loadSalePercent()
        ).catch(() => {})
    }, [])

    useEffect(() => {
        loadMembers().catch(() => {
            toast.error("Não foi possível carregar os resultados")
        })
    }, [currentPage])

    useEffect(() => {
        setResult(INITIAL_MEMBER_RESULT)
        setPages(INITIAL_PAGES)
        setCurrentPage(1)
        loadMembers().catch(() => {
            toast.error("Não foi possível carregar os resultados")
        })
    }, [filter])

    const md = useMediaQuery("(max-width: 768px)")
    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title={"Relatório de membros"}/>
                <div className="flex flex-col md:flex-row gap-[24px]">
                    <div className="flex flex-col w-full md:w-[1100px] bg-white rounded-[16px] relative">
                        <div className="absolute right-16 top-6">
                            <AtomLoading isInView={isLoadingResource}/>
                        </div>
                        <div
                            style={{
                                boxShadow: "0px 4px 16px 0px rgba(200, 200, 200, 0.25)"
                            }}
                            className="bg-white w-full h-fit rounded-[16px]">
                            <MolMemberFilter
                                onChange={setFilter}
                                bots={bots}
                            />
                        </div>
                        <div className="bg-white px-[24px] mt-[38px] max-h-[500px] overflow-y-auto">
                            {md ?
                                <OrgPanelUserListMobile
                                    botId={filter.botId}
                                    onChangeRestriction={changeMemberRestriction}
                                    out={result}
                                />
                                :
                                <OrgPanelTableUsers
                                    botId={filter.botId}
                                    onChangeRestriction={changeMemberRestriction}
                                    out={result}
                                />}
                        </div>
                        <div className="mt-auto px-[24px] pl-[30px] py-[40px] w-full">
                            <MolMemberPagination
                                onReportExport={exportMemberReport}
                                result={result}
                                total={totalResults}
                                onagePageChange={(page): void => {
                                    setCurrentPage(page)
                                }}
                                pages={pages.map((p) => ({
                                    number: p.page
                                }))}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-[24px] w-full md:w-auto h-fit">
                        <MolMonthInsights
                            salesPercent={salePercent}
                            activeBotsCount={activeBotsCount}
                            activeMembersCount={activeMembersCount}
                        />
                        <MolLastMembers
                            lastMembers={lastMembers}
                        />
                        <MolBotCustomizeCardRedirect/>
                    </div>
                </div>
            </MolMainContentWrapper>
        </>
    )
}