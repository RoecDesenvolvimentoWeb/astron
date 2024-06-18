import { ReactElement, useEffect, useState } from "react";
import { IFieldValidatorResult, fieldValidator } from "utils/fieldValidator";

interface IAtomCheckBoxProps {
    onChange?: (e: boolean, status: IFieldValidatorResult) => unknown
    isActive?: boolean
    fieldsPattern?: IFieldVerification
    version?: "v1" | "v2"
    className?: string
    colors?: {
        onActive: string
        onNotActive: string
    }
}

export const AtomCheckBox = ({ isActive: isActiveProp, onChange, fieldsPattern, version, className = "", colors }: IAtomCheckBoxProps): ReactElement => {
    const [isActive, setActive] = useState(!!isActiveProp)

    useEffect(() => {
        setActive(!!isActiveProp)
    }, [isActiveProp])

    const handleFieldChange = (value: string): IFieldValidatorResult => {
        const validationStatus = fieldValidator(value, fieldsPattern)
        return {
            isValid: validationStatus.isValid,
            messageError: validationStatus.messageError
        }
    }

    const checkBox = (isActive ?
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <rect y="-0.000793457" width="18" height="18" rx="2" fill="#61296B"/>
            <path d="M7.35355 13.0457C7.15829 13.2409 6.84171 13.2409 6.64645 13.0457L3.35355 9.75276C3.15829 9.5575 3.15829 9.24092 3.35355 9.04565L4.04645 8.35276C4.24171 8.1575 4.55829 8.1575 4.75355 8.35276L6.64645 10.2457C6.84171 10.4409 7.15829 10.4409 7.35355 10.2457L13.2464 4.35276C13.4417 4.1575 13.7583 4.1575 13.9536 4.35276L14.6464 5.04565C14.8417 5.24092 14.8417 5.5575 14.6464 5.75276L7.35355 13.0457Z" fill="#FEFEFE"/>
        </svg>
        :
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="0.999207" width="16" height="16" rx="1" stroke="#8A8D8F" stroke-width="2"/>
        </svg>
    )

    const checkBoxV2 = (isActive ?
        <div className="relative w-14 h-7 rounded-full border-[1px] py-3 border-[#9EA1A2]">
            <div
                className="cursor-pointer rounded-full text-white text-base top-[0.19rem] w-[20px] h-[20px] absolute bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 translate-x-[1.8rem] duration-500 text-center"/>
        </div>
        :
        <div className="relative w-14 h-7 rounded-full border-[1px] py-3 border-[#9EA1A2]">
            <div
                className="cursor-pointer rounded-full text-white text-base top-[0.19rem] w-[20px] h-[20px] absolute bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 ml-1 translate-x-[0rem] duration-500 text-center"/>
        </div>
    )

    return (
        <>
            <div
                onClick={(): void => {
                    onChange?.(!isActive, handleFieldChange(String(!isActive)))
                    setActive(!isActive)
                }}
                className={`w-fit h-fit ${isActive ? colors?.onActive ?? "bg-purple-100" : colors?.onNotActive ?? "bg-white"} rounded-full cursor-pointer border-lilas-lv4 select-none ` + className}>
                {version === "v2" ? checkBoxV2 : checkBox}
            </div>
        </>
    )

}