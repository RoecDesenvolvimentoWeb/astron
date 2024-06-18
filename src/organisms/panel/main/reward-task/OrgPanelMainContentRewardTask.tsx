import { AtomTitle } from "@atom/AtomTitle";
import { MolAccountInsightsCard } from "@mols/panel/MolAccountInsightsCard";
import { MolActivePausedTasks } from "@mols/panel/MolActivePausedTasks";
import { MolBoostSalesV2 } from "@mols/panel/MolBoostSalesV2";
import { MolIdiomSelector } from "@mols/panel/MolIdiomSelector";
import { MolLoadMoreRewardTask } from "@mols/panel/MolLoadMoreRewardTask";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { MolRewardInsights } from "@mols/panel/MolRewardInsights";
import { MolRewardTaskFilter, TRewardTypeOut } from "@mols/panel/MolRewardTaskFilter";
import { Idiom } from "@mols/panel/MolTelegramConfigForm";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useMediaQuery } from "hooks/useMediaQuery";
import { useQueryParameters } from "hooks/useQueryParameters";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { ActiveNotActiveRewardTask, CompletedRewardTask, RewardTaskOut } from "resources/api/server/contracts/ServerApiModel";
import { calcPercent } from "utils/percentageChange";
import calcWholeYearSale from "../calcWholeYearSale";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgPanelRewardTaskAction } from "./OrgPanelRewardTaskAction";
import { OrgPanelRewardTaskList } from "./OrgPanelRewardTaskList";
import { OrgPanelTableAction } from "./OrgPanelTableActions";

interface IRewardTaskAction {
    isActive: boolean
    public: "all" | "individual"
    type: "create" | "update"
    taskId?: number
}

interface LoadTasks {
    page: number
    size: number
    type: "INDIVIDUAL" | "ALL" | "GLOBAL"
}

interface IOrgPanelMainContentRewardTaskProps extends IDefaultProps {}

const serverApi = new ServerApi()

const INITIAL_LOAD_TASKS: LoadTasks = {
    page: 1,
    size: 2,
    type: "ALL"
} as const

export const OrgPanelMainContentRewardTask = ({ setIsLoading }: IOrgPanelMainContentRewardTaskProps): ReactElement => {
    const md = useMediaQuery("(max-width: 768px)")
    const isToCreate = useQueryParameters("create")

    const [selectedBotId] = useLocalStorage<number>("@selected-bot")
    const [activeAndNotActiveRewardTaskCount, setActiveAndNotActiveRewardTaskCount] = useState<ActiveNotActiveRewardTask>({
        activeTaskCount: 0,
        notActiveTaskCount: 0
    })
    const [wholeYearSalesValue, setWholeYearSalesValue] = useState(0)
    const [activeMemberCount, setActiveMemberCount] = useState(0)
    const [activeBotsCount, setActiveBotsCount] = useState(0)
    const [completedRewardTask, setCompletedRewardTask] = useState<CompletedRewardTask>({
        completedCount: 0,
        lastMonthCount: 0
    })
    const [rewardTaskAction, setRewardTaskAction] = useState<IRewardTaskAction>({
        isActive: false,
        public: "all",
        type: "create"
    })
    const [rewardTasks, setRewardTasks] = useState<RewardTaskOut[]>([])
    const [lastMembersCount, setLastMembersCount] = useState(0)
    const [filterType, setFilterType] = useState<TRewardTypeOut>("ALL")
    const [loadTasks, setLoadTasks] = useState<LoadTasks>(INITIAL_LOAD_TASKS)
    const [taskInAction, setTaskInAction] = useState<RewardTaskOut | null>(null)
    const [isLoadingIndividualTask, setIsLoadingIndividualTask] = useState(false)
    const [idiom, setIdiom] = useState<Idiom>("PT")

    const onRewardFilterChange = (type: TRewardTypeOut): void => {
        setLoadTasks({ ...INITIAL_LOAD_TASKS, type })
        setRewardTasks([])
        setFilterType(type)
    }

    const onChangeRewardTaskStatus = (paused: boolean, rewardTaskId: number): void => {
        serverApi.changeRewardTaskStatus(paused ? "DISABLE" : "ENABLE", rewardTaskId)
            .then((result) => {
                if (result.data.success) {
                    toast.success("Status da tarefa atualizado")
                    setLoadTasks(INITIAL_LOAD_TASKS)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Não foi possível atualizar a tarefa de recompensa"
                );
            })
            .catch(() => {
                toast.error("Não foi possível atualizar o status da tarefa de recompensa")
            })
    }

    const onDeleteRewardTask = (rewardTaskId: number): void => {
        serverApi.deleteRewardTask(rewardTaskId)
            .then((result) => {
                if (result.data.success) {
                    toast.success("Tarefa deletada com sucesso")
                    setLoadTasks(INITIAL_LOAD_TASKS)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Não foi possível deletar a tarefa de recompensa"
                );
            })
            .catch(() => {
                toast.error("Não foi possível deletar a tarefa de recompensa")
            })
    }

    const onUpdateOrCreateRewardTask = (type: "create" | "update", data: RewardTaskOut): void => {
        if (type === "create" && selectedBotId == null) return
        serverApi[type === "update" ? "updateRewardTask" : "createRewardTask"]({
            ...data,
            clientToComplete: data.clientId,
            idiom,
            reward: {
                durationType: data.reward.period,
                cicles: data.reward.cycle
            }
        }, type === "update" ? data.taskId : selectedBotId)
            .then((result) => {
                if (result.data.success) {
                    toast.success(`Tarefa ${type === "create" ? "criada" : "atualizada"} com sucesso`)
                    setLoadTasks(INITIAL_LOAD_TASKS)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? `Não foi possível ${type === "create" ? "criar" : "atualizar"} a tarefa de recompensa`
                );
            })
            .catch(() => {
                toast.error(`Não foi possível ${type === "create" ? "criar" : "atualizar"} a tarefa de recompensa`)
            })
    }

    const loadOneTask = (taskId: number): void => {
        setIsLoadingIndividualTask(true)
        serverApi.loadOneTask(taskId, idiom)
            .then((result) => {
                if (result.data.success) {
                    setTaskInAction(result.data.data as RewardTaskOut)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Não foi possível localizar a tarefa de recompensa"
                );
            })
            .catch(() => {
                toast.error("Ocorreu um erro ao buscar a tarefa de recompensa")
            })
            .finally(() => {
                setIsLoadingIndividualTask(false)
            })
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


    const getActiveAndNotActiveRewardTaskCount = async (): Promise<void> => {
        if (selectedBotId == null) return
        await serverApi
            .getActiveAndNotActiveRewardTaskCount(selectedBotId)
            .then((result) => {
                if (result.data.success) {
                    const salesToday = result.data.data as ActiveNotActiveRewardTask
                    console.log(result.data)
                    setActiveAndNotActiveRewardTaskCount(salesToday)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadActiveMembersCount = async (): Promise<void> => {
        await serverApi.getActiveMemebersCount()
            .then((result) => {
                if (result.data.success) {
                    const activeMemebersCount = result.data.data
                    setActiveMemberCount(activeMemebersCount as number)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadActiveBotsCount = async (): Promise<void> => {
        await serverApi.getActiveBotsCount()
            .then((result) => {
                if (result.data.success) {
                    const activeBotsCount = result.data.data
                    setActiveBotsCount(activeBotsCount as number)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadCompletedRewardTaskCount = async (): Promise<void> => {
        if (selectedBotId == null) return
        await serverApi.getCompletedRewardTaskCurrentMonth(selectedBotId)
            .then((result) => {
                if (result.data.success) {
                    const r = result.data.data
                    setCompletedRewardTask(r as CompletedRewardTask)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadLastMembersCount = async (): Promise<void> => {
        await serverApi.getLastMembersCount()
            .then((result) => {
                if (result.data.success) {
                    const r = result.data.data
                    setLastMembersCount(r as number)
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadRewardTasks = async (): Promise<void> => {
        if (selectedBotId == null) return
        await serverApi.getRewardTasks(
            loadTasks.type,
            loadTasks.size,
            loadTasks.page,
            selectedBotId,
            idiom
        )
            .then((result) => {
                if (result.data.success) {
                    const r = result.data.data
                    setRewardTasks((s) => [...s, ...r as RewardTaskOut[]])
                    setLoadTasks((s) => ({
                        ...s,
                        page:  loadTasks.page + 1
                    }))
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
    }

    const loadInitialTasks = async (): Promise<void> => {
        if (selectedBotId == null) return
        await serverApi.getRewardTasks(
            loadTasks.type,
            loadTasks.size,
            loadTasks.page,
            selectedBotId,
            idiom
        ).then((result) => {
            if (result.data.success) {
                const r = result.data.data
                setTimeout(() => {
                    setRewardTasks(r as RewardTaskOut[])
                }, 500)
                setLoadTasks({
                    ...loadTasks,
                    page: loadTasks.page + 1
                })
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
            );
        })
    }

    const loadMoreTasks = async (): Promise<void> => {
        if (selectedBotId == null) return
        await serverApi.getRewardTasks(
            loadTasks.type,
            loadTasks.size,
            loadTasks.page,
            selectedBotId,
            idiom
        ).then((result) => {
            if (result.data.success) {
                const r = result.data.data
                if ((r as RewardTaskOut[]).length == 0) return
                setRewardTasks((s) => [...s, ...r as RewardTaskOut[]])
                setLoadTasks(s => ({
                    ...s,
                    page: loadTasks.page + 1
                }))
                return
            }
            toast.error(
                (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
            );
        }).catch(() => {
            toast.error(
                "Não foi possível carregar as tarefas"
            );
        })
    }

    const onIdiomChange = (idiom: Idiom): void => {
        setIdiom(idiom)
    }

    useEffect(() => {
        if (isToCreate == "true") {
            setRewardTaskAction({
                ...rewardTaskAction,
                isActive: true
            })
        }
    }, [isToCreate])

    useEffect(() => {
        loadRewardTasks().catch(() => {})
    }, [filterType])


    useEffect(() => {
        setTaskInAction(null)
        setLoadTasks(INITIAL_LOAD_TASKS)
        loadPageResoucers(setIsLoading,
            getActiveAndNotActiveRewardTaskCount(),
            loadSalesWholeYear(),
            loadActiveMembersCount(),
            loadActiveBotsCount(),
            loadCompletedRewardTaskCount(),
            loadLastMembersCount(),
            loadInitialTasks()
        )
            .catch(() => {})
    }, [idiom])

    useEffect(() => {
        if (rewardTaskAction.taskId) {
            loadOneTask(rewardTaskAction.taskId)
        }
    }, [rewardTaskAction])

    useEffect(() => {
        if (loadTasks === INITIAL_LOAD_TASKS) {
            setRewardTasks([])
            loadInitialTasks().catch(() => {})
            loadPageResoucers(setIsLoading,
                getActiveAndNotActiveRewardTaskCount()
            )
                .catch(() => {})
        }
    }, [loadTasks])

    return (
        <>
            <MolMainContentWrapper className={""}>
                <AtomTitle title="Tarefas de recompensa"/>
                <>
                    <div className={"flex flex-col gap-y-[24px]"}>
                        <div className={"flex flex-col gap-y-[24px] md:flex-row md:gap-y-0 md:gap-x-[24px]"}>
                            <MolBoostSalesV2
                                onCreateTask={(): void => {
                                    setRewardTaskAction({
                                        isActive: true,
                                        public: "all",
                                        type: "create"
                                    })
                                }}
                            />
                            <div className="flex flex-row flex-wrap gap-y-[20px] gap-x-[20px] md:gap-x-[24px]">
                                <MolRewardInsights
                                    percentageComparasionToLastMonth={calcPercent(completedRewardTask.completedCount, completedRewardTask.lastMonthCount)}
                                    tasksCompletedCurrentMonth={completedRewardTask.completedCount}
                                    acquiredCustomersCurrentMonth={lastMembersCount}
                                />
                                <div className="md:min-w-[210px] w-full md:w-fit min-h-[232px] h-fit bg-white rounded-[16px] px-[54px] py-[32px] flex items-center justify-center">
                                    <MolAccountInsightsCard
                                        totalActiveBots={activeBotsCount}
                                        totalActiveMembers={activeMemberCount}
                                        totalEarnerdCurrentYear={wholeYearSalesValue}
                                    />
                                </div>
                            </div>
                            <div className="flex gap-x-[24px] flex-row flex-wrap md:flex-col md:gap-x-0 gap-y-[24px]">
                                <MolActivePausedTasks
                                    count={activeAndNotActiveRewardTaskCount.activeTaskCount}
                                    type={"active"}/>
                                <MolActivePausedTasks
                                    count={activeAndNotActiveRewardTaskCount.notActiveTaskCount}
                                    type={"paused"}/>
                            </div>
                        </div>
                        <div>
                            <div className="flex items-start flex-col bg-white pt-[44px] px-2 md:px-[32px] w-full md:w-fit md:min-w-[1288px] rounded-[16px] gap-y-[66px]">
                                <div className="flex w-full flex-col gap-y-[10px] md:flex-row md:gap-y-0">
                                    <div>
                                        <div className="text-[#32063D] text-[28px] font-medium font-['Geologica'] leading-9">Histórico de tarefas</div>
                                    </div>
                                    <div className="md:ml-auto flex flex-wrap justify-between md:justify-normal items-center">
                                        <div className="w-[86px] text-[#A09FA5] text-base font-normal font-['Geologica'] leading-snug">Mostrando</div>
                                        <MolRewardTaskFilter
                                            onChange={onRewardFilterChange}
                                        />
                                        <div>
                                            <MolIdiomSelector
                                                setIdiomInOperation={onIdiomChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white md:px-[24px] mt-[38px] w-full overflow-x-auto max-w-full md:pb-0 md:max-h-[500px] overflow-y-auto">
                                    <div className="w-full md:w-fit space-y-6 md:space-y-0">
                                        {!md ? <OrgPanelTableAction
                                            onDelete={onDeleteRewardTask}
                                            onChangeStatus={onChangeRewardTaskStatus}
                                            tasks={rewardTasks}
                                            onAction={(type, application, taskId): void => {
                                                setRewardTaskAction({
                                                    isActive: true,
                                                    type: type,
                                                    public: application,
                                                    taskId
                                                })
                                            }}
                                        /> : <OrgPanelRewardTaskList
                                            onDelete={onDeleteRewardTask}
                                            tasks={rewardTasks}
                                            onChangeStatus={onChangeRewardTaskStatus}
                                            onAction={(type, application, taskId): void => {
                                                setRewardTaskAction({
                                                    isActive: true,
                                                    type: type,
                                                    public: application,
                                                    taskId
                                                })
                                            }}
                                        />}
                                        <>
                                            <MolLoadMoreRewardTask
                                                onLoadMore={loadMoreTasks}
                                            />
                                        </>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
                <OrgPanelRewardTaskAction
                    onCreateOrUpdate={onUpdateOrCreateRewardTask}
                    isLoading={isLoadingIndividualTask}
                    rewardTask={taskInAction}
                    onClose={(): void => {
                        setTaskInAction(null)
                        setRewardTaskAction({
                            isActive: false,
                            public: "all",
                            type: "create"
                        })
                    }}
                    {...rewardTaskAction}/>
            </MolMainContentWrapper>
        </>
    )
}