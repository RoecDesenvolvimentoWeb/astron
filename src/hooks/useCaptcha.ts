
export const useCaptcha = (): {
    generate (booleanStateFunc: (s: boolean) => unknown): Promise<string>
} => {
    return {
        generate: async (booleanStateFunc: (s: boolean) => unknown): Promise<string> => {
            try {
                const captchaToken = await globalThis.generateCaptchaToken()
                return captchaToken
            } catch {
                booleanStateFunc(false)
                return ""
            }
        }
    }
}