import { PlanData } from "@mols/panel/MolCreateEditPaymentPlan";
import { IExtraRedirectBtnOut } from "@mols/panel/MolEditCreateRedirectBtnForm";
import { BotCreationOut } from "@mols/panel/MolFormBotCreation";
import { BotConfigurationOutTelegram, Idiom } from "@mols/panel/MolTelegramConfigForm";
import { AxiosResponse } from "axios";
import { MemberQuery, Out } from "./member-report";

export interface IAllowedUser {
    userId: number
}

export interface ILoginServerProperties {
    email: string
    password: string
}

export interface IRegisterServerProperties {
    email: string
    password: string
    name: string
    phone: string
    recaptcha: string
    termsOfPolicyAccepted: boolean
    termsOfAnnouncements: boolean
}

export interface ILoginRecoveryPasswordServerProperties {
    email: string
    recaptcha: string
}

export interface ILoginCodeServerProperties {
    code: string
    recaptcha: string
}

type TsuccessCode = 0

type TerrorCode = 101 | 102 | 103 | 104 | 105 | 106 | 107 | 108 | 109 | 110 | 111

export enum errors {
    // 101 -> 200
    NOT_MATCHED = 101,
    NO_DATA_PROVIDED = 102,
    MISSING_DATA = 103,
    INVALID_DATA = 104,
    CONFLIC_DATA = 105,
    NOT_FOUND = 106,
    REACHED_LIMIT = 107,
    OFFLINE = 108,
    INCONSISTENT_DATA = 109,
    INVALID_CAPTCHA = 110,
    EXPIRED_CAPTCHA = 111
}

export interface SalesStatisticsYear {
    january: number
    february: number
    march: number
    april: number
    may: number
    june: number
    july: number
    august: number
    september: number
    october: number
    november: number
    december: number
}

export interface UserBasics {
    creteAt: string
    name: string
    tell: string
    email: string
}

export interface BotWithActiveClientsCount {
    botId: number
    botName: string
    createdAt: string
    activeClientsCount: number
}

export interface IBotInfo {
    botName: string,
    cardIsActive: boolean,
    clientEmailRequired: boolean,
    clientPhoneRequired: boolean,
    initialMessage: string,
    upperMessage: string,
    btnMessage: string,
    token: string,
    groupId: number
    isActive: boolean
}

export interface ActiveNotActiveRewardTask {
    activeTaskCount: number
    notActiveTaskCount: number
}

export interface CompletedRewardTask {
    completedCount: number
    lastMonthCount: number
}

export type DurationPeriodType = "DAY" | "WEEK" | "MONTH" | "YEAR" | "HOUR" | "PERMANENT"

export type TaskType = "INVITE" | "PURCHASE"

export interface RewardTaskOut {
    taskId: number
    taskName: string
    isIndividual: boolean
    taskType: TaskType
    active: boolean
    quanty: number
    clientPhone: string
    clientId?: number
    reward: {
        cycle?: number
        period?: DurationPeriodType
    }
}

export interface RewardTaskUpdate {
    taskId: number
    taskName: string
    isIndividual: boolean
    taskType: TaskType
    active: boolean
    quanty: number
    idiom: Idiom
    clientPhone: string
    clientToComplete?: number
    reward: {
        cicles?: number
        durationType?: DurationPeriodType
    }
}

export interface Profile {
    birthDay: number
    birthMonth: number
    birthYear: number
    function: string
    name: string
    email: string
    tell: string
    createdAt: string
}

export interface ILastMember {
    name: string
    botName: string
    id: number
}

export interface IExtraRedirectBtn {
    id: number
    botId: number
    userId: number
    title: string
    link: string
}

export interface ILastPayment {
    date: string
    clientName: string
    price: number
}

export interface IBotPlan {
    botId: number;
    clientPlanId: number;
    duration: number;
    title: string;
    durationPeriodType: DurationPeriodType;
    value: number;
    isFree: boolean;
    btnMessage: string;
    createdAt: Date;
    isPermanent: boolean
}

export interface IAsaasAccount {
    walletId: string
    token: string
}

export interface IAsaasAccountGet {
    walletId: string
    apiKey: string
}

export interface IAsaasAccountCreate {
    cpfCnpj: string;
    name: string;
    email: string;
    address: string;
    addressNumber: string;
    mobilePhone: string;
    postalCode: string;
    province: string;
    birthDate: Date;
}

export interface IFreeChannelUsing {
    groupId: string | number
    timeToAccept: string | number
    message: string
}

export interface IAvailableChannelToBecomeFree {
    groupId: string | number
    groupName: string
}

export interface ICreateUpdateFreeChannel {
    groupId?: number // The group id
    message: string // The message containing the yes
    timeToAccept: number
}

export interface IMemberRestriction {
    botId: string
    clientId: string
}

export type TDefaultData = Record<string, string>

export type TServerResponse <D> =  Promise<AxiosResponse<IApiResponseModel<D>, never>>

export type TDefaultServerResponse = Promise<AxiosResponse<IApiResponseModel<TDefaultData>, never>>

export type TCommonServerResponse <D> = TServerResponse<D | { message?: string }>

export interface IApiResponseModel <D> {
    code: TsuccessCode | TerrorCode
    success: boolean
    data: D
}

export interface ServerApiModel {
    login (data: ILoginServerProperties): TDefaultServerResponse
    register (data: IRegisterServerProperties): TDefaultServerResponse
    recoveryPassword (data: ILoginRecoveryPasswordServerProperties): TDefaultServerResponse
    loginCode (data: ILoginCodeServerProperties): TDefaultServerResponse
    loadDashboardChart (botId: number): TServerResponse<SalesStatisticsYear | { message?: string }>
    loadTotalSalesCurrentDay (botId: number): TServerResponse<number | { message?: string }>
    getUserProfile (): TServerResponse<Profile | undefined | { message?: string }>
    getUserInfo (): TServerResponse<UserBasics | { message?: string }>
    getActiveMemebersCount (): TServerResponse<number | { message?: string }>
    getActiveBotsCount (): TServerResponse<number | { message?: string }>
    getAllBotsWithActiveClientsCount (): TServerResponse<BotWithActiveClientsCount[] | { message?: string }>
    createNewBot (bot: BotCreationOut): TServerResponse<{ message?: string }>
    updatedBot (botId: number, bot: BotCreationOut): TServerResponse<{ message?: string }>
    updateBotTelegram (botId: number, bot: BotConfigurationOutTelegram): TServerResponse<{ message?: string }>
    enableOrDisableBot (botId: number, status: boolean): TServerResponse<{ message?: string }>
    getBot (botId: number): TServerResponse<IBotInfo | { message?: string }>
    validateBot (bot: BotCreationOut): TServerResponse<{ message?: string }>
    getActiveAndNotActiveRewardTaskCount (botId: number): TServerResponse<ActiveNotActiveRewardTask | { message?: string }>
    getCompletedRewardTaskCurrentMonth (botId: number): TServerResponse<CompletedRewardTask | { message?: string }>
    getLastMembersCount (): TServerResponse<number | { message?: string }>
    getRewardTasks (type: "INDIVIDUAL" | "ALL" | "GLOBAL", size: number, page: number, botId: number, idiom: Idiom): TServerResponse<RewardTaskOut[] | { message?: string }>
    changeRewardTaskStatus (status: "ENABLE" | "DISABLE", rewardId: number): TServerResponse<string | { message?: string }>
    loadOneTask (taskId: number): TServerResponse<RewardTaskOut | { message?: string }>
    updateRewardTask (rewardTask: RewardTaskUpdate, rewardTaskId: number): TServerResponse<string | { message?: string }>
    createRewardTask (rewardTask: RewardTaskUpdate, botId: number): TServerResponse<string | { message?: string }>
    deleteRewardTask (taskId: number): TServerResponse<string | { message?: string }>
    updateProfile (data: Profile & { password: string }): TServerResponse<string | { message?: string }>
    loadMembers (query: MemberQuery): TServerResponse<Out | { message?: string }>
    loadLastMembers (): TServerResponse<ILastMember | { message?: string }>
    loadSalePercent (): TServerResponse<number | { message?: string }>
    loadRedirectBtns (botId: number): TServerResponse<IExtraRedirectBtn[] | { message?: string }>
    updateOrCreateRedirectBtn (data: IExtraRedirectBtnOut & { botId: number }, action: "create" | "update"): TServerResponse<string | { message?: string }>
    deleteRedirectBtn (btnId: number): TServerResponse<string | { message?: string }>
    getLastPayments (): TCommonServerResponse<ILastPayment>
    getEffectivePaymentsMonth (): TCommonServerResponse<number>
    getNotEffectivePaymentsMonth (): TCommonServerResponse<number>
    getTotalEarnedByPlanMonth (): TCommonServerResponse<number>
    listPlans (botId: number): TCommonServerResponse<IBotPlan>
    updatePlan (planData: PlanData): TCommonServerResponse<void>
    createPlan (planData: PlanData): TCommonServerResponse<void>
    deletePlan (planData: PlanData): TCommonServerResponse<void>
    loadAllowedUsers (size: number, page: number): TCommonServerResponse<IAllowedUser[]>
    createAllowedUser (userId: number): TCommonServerResponse<void>
    updateAllowedUser (userId: number, newUserId: number): TCommonServerResponse<void>
    deleteAllowedUser (userId: number): TCommonServerResponse<void>
    updateBotLink (botId: number): TCommonServerResponse<string>
    exportMemberReport (botId: number): TCommonServerResponse<Buffer>
    activePlan (planSelected: "FREE_PERMANENT", botId: number): TCommonServerResponse<string>
    getAccountMp (): TCommonServerResponse<{
        accountId: number
        createAt: string
    }>
    getBindLinkMp (): TCommonServerResponse<{
        href: string
    }>
    unbindAccountMp (): TCommonServerResponse<string>
    excludeAccount (password: string): TCommonServerResponse<string>
    oAuth (accessToken: string): TCommonServerResponse<string>
    updateAsaasAccount (data: IAsaasAccount): TCommonServerResponse<string>
    bindExistentAsaasAccount (data: IAsaasAccount): TCommonServerResponse<string>
    createNewAsaasAccount (data: IAsaasAccountCreate): TCommonServerResponse<string>
    getAsaasAccount (): TCommonServerResponse<IAsaasAccountGet>
    unbindAsaasAccount (): TCommonServerResponse<string>
    getFreeChannelInUse (botId: number): TCommonServerResponse<IFreeChannelUsing>
    getAvailableChannelsToBecomeFree (botId: number): TCommonServerResponse<IAvailableChannelToBecomeFree[]>
    createOrUpdateFreeChannel (botId: number, data: ICreateUpdateFreeChannel): TCommonServerResponse<string>

    // Stripe resources
    getStripeAccount (): TCommonServerResponse<{id: string, isActive: boolean} | undefined>
    getStripeAccountBindAccessLink (type: "bind" | "access"): TCommonServerResponse<string>
    unbindStripeAccount (): TCommonServerResponse<string>
    enableOrDisableStripeAccount (status: boolean): TCommonServerResponse<string>
    changeMemberRestriction (data: IMemberRestriction): TCommonServerResponse<string>
}