export interface Item {
    id: number
    name: string
    email: string
    phone: string
    expiresAt?: Date
    isActive: boolean
    MemberRestriction?: {
        botId: string
        clientId: string
    }
}

export interface Page {
    items: Item[]
}

export interface Out {
    pages: Page[]
}

export interface MemberQuery {
    page?: number // 0 based
    loadPages?: number
    botId?: number
    memberId?: number
}