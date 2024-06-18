import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { FormEvent, ReactElement, useState } from "react";
import { validateFieldsOnSubmit } from "utils/validateFieldOnSubmit";

export interface IAsaasAccount {
    cpfCnpj: string
    name: string
    email: string
    address: string
    addressNumber: string
    mobilePhone: string
    postalCode: string
    province: string
    birthDate: Date
}

interface IMolAsaasAccountCreateFormProps {
    onRegisterAsaasAccount: (data: IAsaasAccount) => unknown
}

interface IFieldValidation {
    [fieldName: string]: {
        isValid: boolean
        messageError?: string
    }
}

const INITIAL_VALIDATION: IFieldValidation = {
    email: {
        isValid: false,
        messageError: "Email inválido"
    }
}

const INITIAL_ASAAS_ACCOUNT: IAsaasAccount = {
    address: "",
    name: "",
    birthDate: new Date(),
    cpfCnpj: "",
    email: "",
    postalCode: "",
    province: "",
    addressNumber: "",
    mobilePhone: ""
}

export const MolAsaasAccountCreateForm = ({
    onRegisterAsaasAccount
}: IMolAsaasAccountCreateFormProps): ReactElement => {
    const [asaasAccount, setAsaasAccount] = useState<IAsaasAccount>(INITIAL_ASAAS_ACCOUNT)
    const [validation, setValidation] = useState<IFieldValidation>(INITIAL_VALIDATION)
    const onRegisterAccount = (e: FormEvent): void => {
        e.preventDefault()
        // Validate and notify on error
        if (validateFieldsOnSubmit(validation)) {
            // Org layer handle with api call
            onRegisterAsaasAccount(asaasAccount)
        }
    }
    return (
        <AtomForm
            onSubmit={onRegisterAccount}
        >
            <AtomDivLabel>
                <AtomLabel>Email</AtomLabel>
                <AtomInputField
                    onChange={(data, validationStatus): void => {
                        setAsaasAccount({
                            ...asaasAccount,
                            email: data
                        })
                        setValidation({
                            email: validationStatus
                        })
                    }}
                    placeHolder={"email@gmail.com"}
                    fieldsPattern={{
                        field: "email",
                        patterns: [
                            {
                                messageError: "Email inválido", // Message error
                                regexp: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/ // Email regex
                            }
                        ]
                    }}
                    inputType={"email"}
                />
            </AtomDivLabel>
        </AtomForm>
    )
}