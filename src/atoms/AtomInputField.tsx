import { ReactElement, useEffect } from "react";
import { IFieldValidatorResult, fieldValidator } from "utils/fieldValidator";

interface IAtomInputFieldProps {
    inputType: React.InputHTMLAttributes<HTMLInputElement>["type"]
    onChange?: (data: string, fieldStatus: IFieldValidatorResult) => unknown
    placeHolder?: string
    className?: string
    fieldsPattern?: IFieldVerification
    required?: boolean
    value?: string
}

export const AtomInputField = ({ fieldsPattern, onChange, className, inputType, placeHolder, required, value }: IAtomInputFieldProps): ReactElement => {

    const handleFieldChange = (value: string): IFieldValidatorResult => {
        const validationStatus = fieldValidator(value, fieldsPattern)
        return {
            isValid: validationStatus.isValid,
            messageError: validationStatus.messageError
        }
    }

    useEffect(() => {
        onChange?.(value ?? "", handleFieldChange(value ?? ""))
    }, [value])

    return <input
        onChange={(e): void => {
            onChange?.(e.target.value, handleFieldChange(e.target.value))
        }}
        required={!!required}
        placeholder={placeHolder}
        className={"hover:outline-none pl-5 border-[1px] rounded-[50px] h-[50px] border-gray-lv2 bg-gray-lv1 font-geo font-normal text-[14px] pr-[10px] " + className}
        type={inputType}/>
}