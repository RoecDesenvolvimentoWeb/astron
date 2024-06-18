import { AtomCloseCard } from "@atom/AtomCloseCard"
import { AtomTitle } from "@atom/AtomTitle"
import { MolAccountBind } from "@mols/panel/MolAccountBind"
import { MolAccountDelete } from "@mols/panel/MolAccountDelete"
import { MolAccountInsightsCard } from "@mols/panel/MolAccountInsightsCard"
import { MolActionLayerWrapper } from "@mols/panel/MolActionLayerWrapper"
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper"
import { MolPlanInformations } from "@mols/panel/MolPlanInformations"
import { useLocalStorage } from "@uidotdev/usehooks"
import { ReactElement, useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { ServerApi } from "resources/api/server/ServerApi"
import { Profile } from "resources/api/server/contracts/ServerApiModel"
import calcWholeYearSale from "../calcWholeYearSale"
import { commonPromiseHandle } from "../commonPromiseHandle"
import { IDefaultProps } from "../default-props-main_content"
import loadPageResoucers from "../loadPageResoucers"
import { OrgPanelFormAccountEdit } from "./OrgPanelFormAccountEdit"

const serverApi = new ServerApi()

interface IOrgPanelMainContentAccountProps extends IDefaultProps {}

export const OrgPanelMainContentAccount = ({ setIsLoading }: IOrgPanelMainContentAccountProps): ReactElement => {
    const [wholeYearSalesValue, setWholeYearSalesValue] = useState(0)
    const [activeMemberCount, setActiveMemberCount] = useState(0)
    const [activeBotsCount, setActiveBotsCount] = useState(0)
    const [selectedBotId] = useLocalStorage<number | null>("@selected-bot", null)
    const [isToExcludeAccount, setIsToExcludeAccount] = useState(false)
    const navigate = useNavigate()

    const onIsToExcludeAccount = (): void => setIsToExcludeAccount(!isToExcludeAccount)

    const now = new Date()

    const [userProfile, setUserProfile] = useState<Profile>({
        name: "",
        birthDay: now.getDate(),
        birthMonth: now.getMonth(),
        birthYear: now.getFullYear(),
        email: "",
        function: "",
        tell: "",
        createdAt: ""
    })

    const onExcludeAccount = async (password: string): Promise<void> => {
        const prom = serverApi.excludeAccount(password)
        await commonPromiseHandle<Profile>(prom,
            undefined,
            "Não foi possível excluir a conta.",
            "Conta excluida com sucesso",
            undefined,
            () => {
                setTimeout(() => {
                    localStorage.removeItem("@selected-bot")
                    localStorage.removeItem("session-auth")
                    navigate("/login")
                }, 500)
            })
    }

    const onUpdateProfile = (data: Profile & { password: string }): void => {
        serverApi.updateProfile({
            ...data,
            tell: data.tell ?? ""
        })
            .then((result) => {
                if (result.data.success) {
                    toast.success("Perfil atualizado com sucesso")
                    setTimeout(() => {
                        location.reload()
                    }, 500)
                    return
                }
                toast.error(
                    typeof result.data.data == "string" ? result.data.data :
                        (result.data.data as { message?: string })?.message ?? "Não foi possivel atualizar o perfil"
                );
            })
            .catch(() => {
                toast.error("Não foi possivel atualizar o perfil")
            })
    }

    const loadUserProfile = async (): Promise<void> => {
        const prom = serverApi.getUserProfile()
        await commonPromiseHandle<Profile>(prom, setUserProfile)
    }

    const loadActiveMembersCount = async (): Promise<void> => {
        const prom = serverApi.getActiveMemebersCount()
        await commonPromiseHandle<number>(prom, setActiveMemberCount)
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


    const loadActiveBotsCount = async (): Promise<void> => {
        const prom = serverApi.getActiveBotsCount()
        await commonPromiseHandle<number>(prom, setActiveBotsCount)
    }

    useEffect(() => {
        loadPageResoucers(setIsLoading,
            loadUserProfile(),
            loadActiveBotsCount(),
            loadSalesWholeYear(),
            loadActiveMembersCount()
        )
            .catch(() => {})
    }, [])

    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Minha conta"/>
                <div  className="flex flex-col md:flex-row gap-y-[24px] md:gap-y-0 md:gap-x-[24px] h-fit">
                    <div className="h-full">
                        {<OrgPanelFormAccountEdit
                            onExcludeAccount={onIsToExcludeAccount}
                            onUpdateProfile={onUpdateProfile}
                            accountData={userProfile}
                            userName={userProfile.name}
                            role={userProfile.function}
                            createdAt={new Date(userProfile.createdAt)}
                        />}
                    </div>
                    <div className="flex flex-col md:flex-row gap-[24px] h-fit w-full md:w-fit">
                        <div className="h-fit flex flex-col gap-[24px]">
                            <div className="w-full max-w-fit md:w-[318px] h-fit md:h-[537px] bg-white rounded-[16px] px-[25px] pt-[35px] pb-[26px]">
                                <MolAccountBind/>
                            </div>
                            <div className="md:min-w-[210px] w-full md:w-fit min-h-[232px] h-fit bg-white rounded-[16px] px-[54px] py-[32px] flex items-center justify-center">
                                <MolAccountInsightsCard
                                    totalActiveBots={activeBotsCount}
                                    totalActiveMembers={activeMemberCount}
                                    totalEarnerdCurrentYear={wholeYearSalesValue}
                                />
                            </div>
                        </div>
                        <div className="h-fit">
                            <div className="md:min-w-[276px] min-h-[372px] w-full md:w-fit h-fit bg-white rounded-[16px] px-[21px] py-[27px] flex items-center justify-center">
                                <MolPlanInformations/>
                            </div>
                        </div>
                    </div>
                </div>
                {isToExcludeAccount && <MolActionLayerWrapper
                    className="flex items-center justify-center"
                >
                    <div className="absolute top-4 right-4">
                        <AtomCloseCard
                            onClick={onIsToExcludeAccount}
                        />
                    </div>
                    <MolAccountDelete
                        onExlude={onExcludeAccount}
                    />
                </MolActionLayerWrapper>}
            </MolMainContentWrapper>
        </>
    )
}