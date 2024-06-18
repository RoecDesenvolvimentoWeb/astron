import { PlanData } from "@mols/panel/MolCreateEditPaymentPlan"
import { IExtraRedirectBtnOut } from "@mols/panel/MolEditCreateRedirectBtnForm"
import { BotConfigurationOut } from "@mols/panel/MolFormBotConfiguration"
import { BotCreationOut } from "@mols/panel/MolFormBotCreation"
import { Idiom } from "@mols/panel/MolTelegramConfigForm"
import { BotConfigurationOutTelegramWithIdiom } from "@org/panel/main/telegram/config/OrgPanelMainContentTelegramConfig"
import axios, { AxiosInstance } from "axios"
import { config } from "./config/config"
import { ActiveNotActiveRewardTask, BotWithActiveClientsCount, CompletedRewardTask, IAllowedUser, IAsaasAccount, IAsaasAccountCreate, IAsaasAccountGet, IAvailableChannelToBecomeFree, IBotInfo, IBotPlan, ICreateUpdateFreeChannel, IExtraRedirectBtn, IFreeChannelUsing, ILastMember, ILastPayment, ILoginCodeServerProperties, ILoginRecoveryPasswordServerProperties, ILoginServerProperties, IMemberRestriction, IRegisterServerProperties, Profile, RewardTaskOut, RewardTaskUpdate, SalesStatisticsYear, ServerApiModel, TCommonServerResponse, TDefaultServerResponse, TServerResponse, UserBasics } from "./contracts/ServerApiModel"
import { MemberQuery, Out } from "./contracts/member-report"

export class ServerApi implements ServerApiModel {
    private readonly axionsInstance: AxiosInstance

    constructor () {
        this.axionsInstance = axios.create({
            baseURL: config.baseUrl,
            headers: {
                "Content-Type": "application/json"
            }
        })
        this.axionsInstance.interceptors.response.use((res) => {
            const auth = res.headers.authorization ?? null
            if (auth != null) {
                localStorage.setItem("session-auth", auth as string)
            }
            return res
        }, (err) => {
            if (err.response == null) return
            if (err.response.status === 401) {
                localStorage.clear()
                console.error("Request with 401 status")
                if (window != null) {
                    window.location.href = "/login"
                }
            }
        })
        this.axionsInstance.interceptors.request.use((req) => {
            if (!req.url?.includes("/panel")) return req
            const token = localStorage.getItem("session-auth")
            req.headers.setAuthorization(token)
            return req
        })
    }
    async changeMemberRestriction(data: IMemberRestriction): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/member/restriction", data)
    }
    async enableOrDisableStripeAccount(status: boolean): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/stripe/account/status", {
            status
        })
    }
    async unbindStripeAccount(): TCommonServerResponse<string> {
        return await this.axionsInstance.get("/panel/stripe/account/unbind")
    }
    async getStripeAccount(): TCommonServerResponse<{ id: string, isActive: boolean } | undefined> {
        return await this.axionsInstance.get("/panel/stripe/account/get")
    }
    async getStripeAccountBindAccessLink(type: "bind" | "access"): TCommonServerResponse<string> {
        return await this.axionsInstance.get("/panel/stripe/account/link/" + type)
    }

    async getFreeChannelInUse(botId: number): TCommonServerResponse<IFreeChannelUsing> {
        return await this.axionsInstance.get(`/panel/freegroup/${botId}`)
    }
    async getAvailableChannelsToBecomeFree(botId: number): TCommonServerResponse<IAvailableChannelToBecomeFree[]> {
        return await this.axionsInstance.get(`/panel/freegroup/list/${botId}`)
    }
    async createOrUpdateFreeChannel(botId: number, data: ICreateUpdateFreeChannel): TCommonServerResponse<ICreateUpdateFreeChannel> {
        return await this.axionsInstance.post(`/panel/freegroup/${botId}`, data)
    }
    async oAuth(accessToken: string): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/oauth", {
            accessToken
        })
    }
    async unbindAsaasAccount(): TCommonServerResponse<string> {
        return await this.axionsInstance.get("/panel/asaas/account/unbind")
    }
    async getAsaasAccount(): TCommonServerResponse<IAsaasAccountGet> {
        return await this.axionsInstance.get("/panel/asaas/account")
    }
    async updateAsaasAccount(data: IAsaasAccount): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/asaas/account/update", data)
    }
    async bindExistentAsaasAccount(data: IAsaasAccount): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/asaas/account/bind", data)
    }
    async createNewAsaasAccount(data: IAsaasAccountCreate): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/asaas/account/create", data)
    }
    async excludeAccount(password: string): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/account/delete", {
            password
        })
    }
    async unbindAccountMp(): TCommonServerResponse<string> {
        return await this.axionsInstance.get("/panel/payment_account/mercadopago/unbind")
    }
    async getBindLinkMp(): TCommonServerResponse<{ href: string }> {
        return await this.axionsInstance.get("/panel/account/mp/bind")
    }
    async getAccountMp(): TCommonServerResponse<{ accountId: number; createAt: string }> {
        return await this.axionsInstance.get("/panel/payment_account/mercadopago")
    }
    async activePlan(planSelected: "FREE_PERMANENT", botId: number): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/subscription/create", {
            botId,
            planSelected
        })
    }
    async exportMemberReport(botId: number): TCommonServerResponse<Buffer> {
        return await this.axionsInstance.get("/panel/member/report/export?botId="+ botId, {
            responseType: "blob"
        })
    }
    async updateBotLink(botId: number): TCommonServerResponse<string> {
        return await this.axionsInstance.post("/panel/bot/link/update", {botId})
    }
    async deleteAllowedUser(userId: number): TCommonServerResponse<void> {
        return await this.axionsInstance.post("/panel/alert/allow/user/delete", {
            allowedUser: userId
        })
    }
    async updateAllowedUser(userId: number, newUserId: number): TCommonServerResponse<void> {
        return await this.axionsInstance.post("/panel/alert/allow/user/update", {
            allowedUser: userId,
            newAllowedUser: newUserId
        })
    }

    async createAllowedUser(userId: number): TCommonServerResponse<void> {
        return await this.axionsInstance.post("/panel/alert/allow/user/create", {
            allowedUser: userId
        })
    }
    async loadAllowedUsers(size: number, page: number): TCommonServerResponse<IAllowedUser[]> {
        return await this.axionsInstance.get("/panel/alert/query/v2?"
        + `size=${size}&`
        + `page=${page}`)
    }
    async deletePlan(planData: PlanData): TCommonServerResponse<void> {
        return await this.axionsInstance.post("/panel/plan/delete", planData)
    }
    async createPlan(planData: PlanData): TCommonServerResponse<void> {
        return await this.axionsInstance.post("/panel/plan/create", planData)
    }
    async updatePlan(planData: PlanData): TCommonServerResponse<void> {
        return await this.axionsInstance.post("/panel/plan/update", planData)

    }
    async listPlans(botId: number, idiom: Idiom = "PT"): TCommonServerResponse<IBotPlan> {
        return await this.axionsInstance.get("/panel/plan/v2/list?botId=" + botId + "&idiom=" + idiom)
    }
    async getTotalEarnedByPlanMonth(): TCommonServerResponse<number> {
        return await this.axionsInstance.get("/panel/plan/v2/total_earned/month")
    }
    async getEffectivePaymentsMonth(): TCommonServerResponse<number> {
        return await this.axionsInstance.get("/panel/payment/count/effective")
    }
    async getNotEffectivePaymentsMonth(): TCommonServerResponse<number> {
        return await this.axionsInstance.get("/panel/payment/count/not_effective")
    }
    async getLastPayments(): TCommonServerResponse<ILastPayment> {
        return await this.axionsInstance.get("/panel/payment/lasts")
    }
    async deleteRedirectBtn(btnId: number): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/redirect_btn/delete/v2", {
            btnId
        })
    }
    async updateOrCreateRedirectBtn(data: IExtraRedirectBtnOut & { btnId?: number, botId: number, idiom: Idiom }, action: "create" | "update"): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post(`/panel/redirect_btn/${action}/v2`, data)
    }
    async loadRedirectBtns(botId: number, idiom: Idiom = "PT"): TServerResponse<{ message?: string | undefined } | IExtraRedirectBtn[]> {
        const query =  new URLSearchParams({
            botId: botId.toString(),
            idiom: idiom
        })
        return await this.axionsInstance.get("/panel/redirect_btn/list/v2?" + query.toString())
    }
    async updateBotTelegram(botId: number, data: BotConfigurationOutTelegramWithIdiom): TServerResponse<{ message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/bot/update/partial", {...data, botId})
    }

    async loadSalePercent(): TServerResponse<number | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/sales/statistics/percent/month")
    }
    async loadLastMembers(): TServerResponse<ILastMember | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/member/last")

    }
    async loadMembers(query: MemberQuery): TServerResponse<Out | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/member/report?" + new URLSearchParams(query as string).toString())
    }
    async updateProfile(data: Profile & { password: string }): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/profile/update", data)
    }
    async deleteRewardTask(taskId: number): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/rewardtask/delete", {
            taskId
        })
    }
    async createRewardTask(rewardTask: RewardTaskUpdate, botId: number): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/rewardtask/create", {
            ...rewardTask,
            botId
        })
    }
    async updateRewardTask(rewardTask: RewardTaskUpdate, rewardTaskId: number): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/rewardtask/update", {
            ...rewardTask,
            taskId: rewardTaskId
        })
    }
    async loadOneTask(taskId: number, idiom: Idiom = "PT"): TServerResponse<RewardTaskOut | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/rewardtask/" + taskId + "?idiom=" + idiom)
    }
    async changeRewardTaskStatus(status: "ENABLE" | "DISABLE", rewardTaskId: number): TServerResponse<string | { message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/rewardtask/change/status", {
            status,
            rewardTaskId
        })
    }
    async getRewardTasks(type: "INDIVIDUAL" | "ALL" | "GLOBAL" = "GLOBAL", size: number, page: number, botId: number, idiom: Idiom = "PT"): TServerResponse<RewardTaskOut[] | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/rewardtask/list?type=" + type
        + "&size=" + size
        + "&page=" + page
        + "&botId=" + botId
        + "&idiom=" + idiom)
    }
    async getLastMembersCount(): TServerResponse<number | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/member/count")
    }
    async getCompletedRewardTaskCurrentMonth(botId: number): TServerResponse<CompletedRewardTask | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/rewardtask/completed/count?botId=" + botId)
    }
    async getActiveAndNotActiveRewardTaskCount (botId: number): TServerResponse<ActiveNotActiveRewardTask | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/rewardtask/count?botId=" + botId)
    }
    async validateBot(data: BotCreationOut): TServerResponse<{ message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/bot/verify", {
            token: data.token,
            botName: data.name,
            cardIsActive: data.cardRequired,
            groupId: data.groupId,
            emailIsRequired: data.emailRequired
        })
    }

    async createNewBot(data: BotCreationOut): TServerResponse<{ message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/bot/create", {
            token: data.token,
            botName: data.name,
            cardIsActive: data.cardRequired,
            groupId: data.groupId,
            emailIsRequired: data.emailRequired,
            phoneIsRequired: data.phoneRequired
        })
    }

    async updatedBot(botId: number, data: BotConfigurationOut): TServerResponse<{ message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/bot/update", {
            token: data.token,
            botName: data.name,
            cardIsActive: data.cardRequired,
            groupId: data.groupId,
            clientEmailRequired: data.emailRequired,
            clientPhoneRequired: data.phoneRequired,
            botId
        })
    }

    async getBot(botId: number, idiom?: Idiom): TServerResponse<IBotInfo | { message?: string | undefined }> {
        const obj = {
            botId: botId.toString(),
            idiom: idiom ?? "PT"
        }
        return await this.axionsInstance.get("/panel/bot/get/v2?" + new URLSearchParams(obj).toString())
    }

    async enableOrDisableBot (botId: number, status: boolean): TServerResponse<{ message?: string | undefined }> {
        return await this.axionsInstance.post("/panel/bot/update", {
            botId,
            active: status
        })
    }

    async getAllBotsWithActiveClientsCount(): TServerResponse<{ message?: string | undefined } | BotWithActiveClientsCount[]> {
        return await this.axionsInstance.get("/panel/bot/list/v2")
    }

    async getActiveBotsCount(): TServerResponse<number | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/bot/active/count")
    }

    async getActiveMemebersCount(): TServerResponse<number | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/member/active/count")
    }
    async getUserInfo(): TServerResponse<UserBasics | { message?: string | undefined }> {
        return await this.axionsInstance.get("/panel/user")
    }

    async getUserProfile(): TServerResponse<Profile | { message?: string | undefined } | undefined> {
        return await this.axionsInstance.get("/panel/profile")
    }

    async register(data: IRegisterServerProperties): TDefaultServerResponse {
        return await this.axionsInstance.post("register", data)
    }

    async login(data: ILoginServerProperties): TDefaultServerResponse {
        return await this.axionsInstance.post("login", data)
    }

    async recoveryPassword(data: ILoginRecoveryPasswordServerProperties): TDefaultServerResponse {
        return await this.axionsInstance.post("/login/recovery/password", data)
    }

    async loginCode (data: ILoginCodeServerProperties): TDefaultServerResponse {
        return await this.axionsInstance.post("/login/recovery/password/code", data)
    }

    async loadDashboardChart(botId: number): TServerResponse<SalesStatisticsYear> {
        return await this.axionsInstance.get(`/panel/sales/statistics/whole_year?botId=${botId}`)
    }

    async loadTotalSalesCurrentDay(botId: number): TServerResponse<number> {
        return await this.axionsInstance.get(`/panel/sales/statistics/whole_day?botId=${botId}`)
    }

}