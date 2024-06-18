export interface IFieldValidatorResult {
    isValid: boolean
    messageError?: string
}

export const fieldValidator = (fieldValue: string, fieldPattern?: IFieldVerification): IFieldValidatorResult => {
    if (!fieldPattern) return { isValid: true }
    for (const pattern of fieldPattern.patterns) {
        if ((fieldValue == null || fieldValue == "") && pattern.optional) return {
            isValid: true
        }
        if (!fieldValue?.match(pattern.regexp)) return {
            isValid: false,
            messageError: pattern.messageError
        }
    }
    return {
        isValid: true
    }
}