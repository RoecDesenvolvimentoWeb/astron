import { AtomTitle } from "@atom/AtomTitle";
import { MolAccountInsightsCard } from "@mols/panel/MolAccountInsightsCard";
import { MolBotCustomizeCardRedirect } from "@mols/panel/MolBotCustomizeCardRedirect";
import { MolCreateAlertCardRedirect } from "@mols/panel/MolCreateAlertCardRedirect";
import { MolCreateEditRemarketing } from "@mols/panel/MolCreateEditRemarketing";
import { MolLastMembers } from "@mols/panel/MolLastMembers";
import { MolLoadMoreActiveAlerts } from "@mols/panel/MolLoadMoreActiveAlerts";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { IAllowedUser, ILastMember } from "resources/api/server/contracts/ServerApiModel";
import calcWholeYearSale from "../calcWholeYearSale";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgPanelActiveAlertsTable } from "./OrgPanelActiveAlertsTable";

interface IOrgPanelMainContentRemarketingProps extends IDefaultProps {}

export interface IQuery {
    page: number
    size: number
}

const serverApi = new ServerApi()

const INITIAL_QUERY: IQuery = {
    page: 0,
    size: 4
}

export const OrgPanelMainContentRemarketing = ({ setIsLoading }: IOrgPanelMainContentRemarketingProps): ReactElement => {
    const [wholeYearSalesValue, setWholeYearSalesValue] = useState(0)
    const [activeMemberCount, setActiveMemberCount] = useState(0)
    const [activeBotsCount, setActiveBotsCount] = useState(0)
    const [allowedUsers, setAllowedUsers] = useState<IAllowedUser[]>([])
    const [selectedBotId] = useLocalStorage<number | null>("@selected-bot", null)
    const [query, setQuery] = useState<IQuery>(INITIAL_QUERY)

    const [editCreateRemarketingStatus, setEditCreateRemarketingStatus] =
    useState<{
        isActive: boolean;
        type: "CREATE" | "EDIT";
        userId?: number
    }>({
        isActive: false,
        type: "CREATE"
    });

    const [lastMembers, setLastMembers] = useState<ILastMember[]>([])


    const loadLastMembers = async (): Promise<void> => {
        const prom = serverApi.loadLastMembers()
        await commonPromiseHandle<ILastMember[]>(prom, setLastMembers)
    }

    const loadSalesWholeYear = async (): Promise<void> => {
        if (selectedBotId == null) return
        await serverApi.loadDashboardChart(selectedBotId)
            .then((result) => {
                if (result.data.success) {
                    const sales = result.data.data
                    setWholeYearSalesValue(calcWholeYearSale({
                        jan: sales.january,
                        feb: sales.february,
                        mar: sales.march,
                        apr: sales.april,
                        jul: sales.july,
                        jun: sales.june,
                        sep: sales.september,
                        aug: sales.august,
                        dec: sales.december,
                        nov: sales.november,
                        oct: sales.october,
                        may: sales.may
                    }))
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadActiveMembersCount = async (): Promise<void> => {
        const prom = serverApi.getActiveMemebersCount()
        await commonPromiseHandle<number>(prom, setActiveMemberCount)
    }

    const loadActiveBotsCount = async (): Promise<void> => {
        const prom = serverApi.getActiveBotsCount()
        await commonPromiseHandle<number>(prom, setActiveBotsCount)
    }

    const loadAllowedUsers = async (): Promise<void> => {
        const prom = serverApi.loadAllowedUsers(query.size, query.page)
        await commonPromiseHandle<IAllowedUser[]>(
            prom,
            setAllowedUsers,
            undefined,
            undefined,
            {
                currentData: allowedUsers.copyWithin(0, 0)
            }
        )
    }

    const loadMoreAllowedUsers = (): void => {
        setQuery({
            page: query.page + INITIAL_QUERY.size,
            size: query.size
        })
    }

    const createAlert = (userId: number): void => {
        const prom = serverApi.createAllowedUser(userId)
        commonPromiseHandle<void>(
            prom,
            undefined,
            "Não foi possível criar o alerta",
            "Alerta criado com sucesso"
        )
            .catch(() => {
                toast.error("Não foi possível criar o alerta")
            })
            .finally(() => {
                setTimeout(() => {
                    location.reload()
                }, 500)
            })
    }

    const updateAlert = (userId: number, newUserId: number): void => {
        const prom = serverApi.updateAllowedUser(userId, newUserId)
        commonPromiseHandle<void>(
            prom,
            undefined,
            "Não foi possível atualizar o alerta",
            "Alerta atualizado com sucesso"
        )
            .catch(() => {
                toast.error("Não foi possível atualizar o alerta")
            })
            .finally(() => {
                setTimeout(() => {
                    location.reload()
                }, 500)
            })
    }

    const onDeleteAlert = (userId: number): void => {
        const prom = serverApi.deleteAllowedUser(userId)
        commonPromiseHandle<void>(
            prom,
            undefined,
            "Não foi possível deletar o alerta",
            "Alerta deletado com sucesso"
        )
            .catch(() => {
                toast.error("Não foi possível deletar o alerta")
            })
            .finally(() => {
                setTimeout(() => {
                    location.reload()
                }, 500)
            })
    }

    useEffect(() => {
        loadPageResoucers(setIsLoading,
            loadLastMembers(),
            loadSalesWholeYear(),
            loadActiveMembersCount(),
            loadActiveBotsCount(),
            loadAllowedUsers()
        ).catch(() => {})
    }, [])

    useEffect(() => {
        loadAllowedUsers().catch(() => {
            toast.error("Não foi possível carregar mais resultados")
        })
    }, [query])

    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Remarketing" />
                <div className="flex flesx-row gap-x-[24px] px-[10px] max-lg:flex-col">
                    <div className="flex flex-col gap-y-[33px] w-full ">
                        <MolCreateAlertCardRedirect
                            onCreateNewRemarketing={(): void => {
                                setEditCreateRemarketingStatus({
                                    isActive: true,
                                    type: "CREATE",
                                    userId: undefined
                                });
                            }}
                        />
                        <div className="p-[10px] bg-white rounded-[16px] py-[42px] px-[24px] space-y-[24px]">
                            <div className="text-fuchsia-950 text-[28px] font-medium font-['Geologica'] leading-9">
                                Alertas ativos
                            </div>
                            <div className="bg-white px-[24px] mt-[38px] max-h-[420px] overflow-y-auto">
                                <OrgPanelActiveAlertsTable
                                    onDeleteRemarketing={onDeleteAlert}
                                    data={allowedUsers}
                                    onEditRemarketing={(userId): void => {
                                        setEditCreateRemarketingStatus({
                                            isActive: true,
                                            type: "EDIT",
                                            userId: userId
                                        });
                                    }}
                                />
                                <MolLoadMoreActiveAlerts onLoadMore={(): void => {
                                    loadMoreAllowedUsers()
                                }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-[33px] mt-[30px]">
                        <div className="min-w-[223px] min-h-[211px] w-fit h-fit bg-white rounded-[16px] px-[54px] py-[20px] flex items-center justify-center max-xl:min-h-[328px] max-lg:w-full">
                            <MolAccountInsightsCard
                                totalActiveBots={activeBotsCount}
                                totalActiveMembers={activeMemberCount}
                                totalEarnerdCurrentYear={wholeYearSalesValue}
                            />
                        </div>
                        <MolLastMembers lastMembers={lastMembers}/>
                        <MolBotCustomizeCardRedirect />
                    </div>
                </div>
            </MolMainContentWrapper>
            {editCreateRemarketingStatus.isActive && (
                <div className="fixed left-0 top-0 w-screen h-screen z-40 bg-[#7A7A7A66] flex items-center justify-center">
                    <MolCreateEditRemarketing
                        data={editCreateRemarketingStatus.userId ? {
                            userId: editCreateRemarketingStatus.userId
                        } : undefined}
                        onSubmit={(data, id): void => {
                            if (editCreateRemarketingStatus.type === "CREATE") createAlert(data.userId)
                            if (editCreateRemarketingStatus.type === "EDIT") updateAlert(id as number, data.userId)
                        }}
                        type={editCreateRemarketingStatus.type}
                        onClose={(): void => {
                            setEditCreateRemarketingStatus({
                                isActive: false,
                                type: "CREATE",
                            });
                        }}
                    />
                </div>
            )}
        </>
    );
};
