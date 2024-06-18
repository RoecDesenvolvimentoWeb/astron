declare interface IFieldVerification {
    field: string
    patterns: {
        messageError: string
        regexp: RegExp
        optional?: boolean
    }[]
}

declare interface IApiDefinition {
    baseUrl: string
}

declare namespace globalThis {
    async function generateCaptchaToken (): Promise<string>
}