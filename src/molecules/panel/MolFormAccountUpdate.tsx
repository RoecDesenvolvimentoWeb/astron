import { AtomBtn } from "@atom/AtomBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomSelect } from "@atom/AtomSelect";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Profile } from "resources/api/server/contracts/ServerApiModel";
import { fieldValidator } from "utils/fieldValidator";
import { validateFieldsOnSubmit } from "utils/validateFieldOnSubmit";

interface IMolFormAccountUpdateProps {
    data: Profile
    onUpdateProfile: (data: Profile & { password: string}) => unknown
    onExcludeAccount: () => unknown
}

const generateYearSequence = (): number[] => {
    const now = new Date()
    const result = []
    for (let x = now.getFullYear() - 100; x <= now.getFullYear(); x++) {
        result.push(x)
    }
    return result
}

const generateDaySequenceBasedOnMonth = (date?: Date): number[] => {
    const now = date ?? new Date()
    const end = date ? new Date(date.toString()) : new Date()
    now.setHours(1)
    now.setDate(1)
    end.setHours(1)
    end.setMonth(end.getMonth() + 1)
    end.setDate(0)
    const result = []
    for (let x = now.getDate(); x <= end.getDate(); x++) {
        result.push(x)
    }
    return result
}

const generateMonthSequence = (): number[] => {
    const result = []
    for (let x = 1; x <= 12; x++) {
        result.push(x)
    }
    return result
}


const validatePassword = (password?: string, confirm?: string): boolean => {
    if (password != confirm) {
        toast.error("Senha não coincide")
        return false
    }
    return true
}

type TFields = "email" | "name" | "middlename" | "phone" | "password" | "passwordConfirmation"

const patterns: {
    [field in TFields]: IFieldVerification["patterns"]
} = {
    email: [
        {
            messageError: "Email inválido",
            regexp: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        }
    ],
    name: [
        {
            messageError: "Tamanho máximo e mínimo do nome é  10 e 3 caracteres respecivamente",
            regexp: /^([a-zA-Z]+){3,10}$/
        }
    ],
    middlename: [
        {
            messageError: "Tamanho máximo e mínimo do sobrenome é  10 e 3 caracteres respecivamente",
            regexp: /^([a-zA-Z]+){3,10}$/
        }
    ],
    phone: [
        {
            messageError: "Telefone inválido",
            regexp: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
            optional: true
        }
    ],
    password: [
        {
            messageError: "Tamanho mínimo da senha é 5 caracteres",
            regexp: /([\W\w]+){5,}/
        }
    ],
    passwordConfirmation: [
        {
            messageError: "Tamanho mínimo da confirmação de senha é 5 caracteres",
            regexp: /([\W\w]+){5,}/
        }
    ]
}



export const MolFormAccountUpdate = ({ data, onUpdateProfile, onExcludeAccount }: IMolFormAccountUpdateProps): ReactElement => {
    const [profile, setProfile] = useState<Profile>({
        ...data,
        tell: data.tell ?? ""
    })

    const [name, setName] = useState<{
        name: string
        middleName: string
    }>({
        name: profile.name.split(" ")?.[0] ?? "",
        middleName: profile.name.split(" ")?.[1] ?? ""
    })

    const [password, setPassword] = useState<{
        password: string,
        confirmation: string
    }>({
        password: "",
        confirmation: ""
    })

    const [accountUpdateValidation, setAccountUpdateValidator] = useState<{
        [v: string]: {
            isValid: boolean,
            messageError?: string
        }
    }>({});

    const now = new Date()

    const [yearSequence, setYearSequence] = useState<number[]>([])
    const [daySequence, setDaySequence] = useState<number[]>([])
    const [monthSequence, setMonthSequence] = useState<number[]>([])

    const updateUserProfile = (): void => {
        onUpdateProfile({
            ...profile,
            name: name.name + " " + name.middleName,
            password: password.password
        })
    }

    useEffect(() => {
        setName({
            name: data.name.split(" ")?.[0] ?? "",
            middleName: data.name.split(" ")?.[1] ?? ""
        })
        setProfile(data)
    }, [data])

    useEffect(() => {
        setAccountUpdateValidator({
            email: fieldValidator(profile.email, {
                field: "email",
                patterns: patterns.email
            }),
            password: fieldValidator(password.password, {
                field: "password",
                patterns: patterns.password
            }),
            passwordConfirmation: fieldValidator(password.confirmation, {
                field: "passwordConfirm",
                patterns: patterns.passwordConfirmation
            }),
            name: fieldValidator(name.name, {
                field: "name",
                patterns: patterns.name
            }),
            middlename: fieldValidator(name.middleName, {
                field: "middleName",
                patterns: patterns.middlename
            }),
            phone: fieldValidator(profile.tell, {
                field: "phone",
                patterns: patterns.phone
            })
        })
    }, [profile, name, password])

    useEffect(() => {
        if (!(profile.birthDay || profile.birthMonth  || profile.birthYear)) {
            setProfile({
                ...profile,
                birthDay: now.getDate(),
                birthMonth: now.getMonth(),
                birthYear: now.getFullYear()
            })
        }
        setDaySequence(generateDaySequenceBasedOnMonth(new Date(
            profile.birthYear + "/" +
            (profile.birthMonth?.toString().length > 1 ? profile.birthMonth : "0" + (profile.birthMonth)) + "/" +
            "01")))
    }, [profile.birthMonth])

    useEffect(() => {
        setYearSequence(generateYearSequence())
        setMonthSequence(generateMonthSequence())
    }, [])
    return (
        <>
            <AtomForm
                onSubmit={(e): void => {
                    e.preventDefault()
                    console.log(accountUpdateValidation)
                    if (validateFieldsOnSubmit(accountUpdateValidation) && validatePassword(password.password, password.confirmation)) {
                        updateUserProfile()
                    }
                }}
                className="w-fit min-w-full pt-[32px]">
                <div className="flex flex-col md:flex-row w-full gap-[17px]">
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Nome</AtomLabel>
                        <AtomInputField
                            onChange={(v, f): void => {
                                setName({
                                    ...name,
                                    name: v
                                })
                                setAccountUpdateValidator({
                                    ...accountUpdateValidation,
                                    name: f
                                })
                            }}
                            placeHolder={name.name}
                            fieldsPattern={{
                                field: "name",
                                patterns: patterns.name
                            }}
                            className="w-full"
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Sobrenome</AtomLabel>
                        <AtomInputField
                            onChange={(v, f): void => {
                                setName({
                                    ...name,
                                    middleName: v
                                })
                                setAccountUpdateValidator({
                                    ...accountUpdateValidation,
                                    name: f
                                })
                            }}
                            placeHolder={name.middleName}
                            fieldsPattern={{
                                field: "middlename",
                                patterns: patterns.middlename
                            }}
                            className="w-full"
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-col md:flex-row w-full gap-[17px]">
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Data de nascimento</AtomLabel>
                        <div className="flex flex-row gap-x-[10px] md:gap-x-[16px] w-fit">
                            <AtomSelect
                                defaultValue={profile.birthDay}
                                onChange={(v): void => {
                                    setProfile({
                                        ...profile,
                                        birthDay: Number(v)
                                    })
                                }}
                                className="!w-fit !min-w-[70px] sm:!min-w-[90px] md:!min-w-[100px]"
                                options={daySequence.map(v => ({
                                    value: v.toString(),
                                    text: v.toString()
                                }))}
                            />
                            <AtomSelect
                                defaultValue={profile.birthMonth}
                                onChange={(v): void => {
                                    setProfile({
                                        ...profile,
                                        birthMonth: Number(v)
                                    })
                                }}
                                className="!w-fit !min-w-[70px] sm:!min-w-[90px] md:!min-w-[100px]"
                                options={monthSequence.map(v => ({
                                    value: v.toString(),
                                    text: v.toString()
                                }))}
                            />
                            <AtomSelect
                                defaultValue={profile.birthYear}
                                onChange={(v): void => {
                                    setProfile({
                                        ...profile,
                                        birthYear: Number(v)
                                    })
                                }}
                                className="!w-fit !min-w-[70px] sm:!min-w-[90px] md:!min-w-[100px]"
                                options={yearSequence.map(v => ({
                                    value: v.toString(),
                                    text: v.toString()
                                }))}
                            />
                        </div>
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Nincho de atuação</AtomLabel>
                        <AtomInputField
                            onChange={(v): void => {
                                setProfile({
                                    ...profile,
                                    function: v
                                })
                            }}
                            placeHolder={profile.function ?? ""}
                            className="w-full"
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-col md:flex-row gap-[17px] w-full">
                    <AtomDivLabel className="w-full">
                        <AtomLabel>E-mail</AtomLabel>
                        <AtomInputField
                            onChange={(v, f): void => {
                                setProfile({
                                    ...profile,
                                    email: v
                                })
                                setAccountUpdateValidator({
                                    ...accountUpdateValidation,
                                    email: f
                                })
                            }}
                            fieldsPattern={{
                                field: "email",
                                patterns: patterns.email
                            }}
                            className="w-full"
                            inputType={"email"}
                            placeHolder={profile.email ?? ""}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Telefone</AtomLabel>
                        <AtomInputField
                            onChange={(v, f): void => {
                                setProfile({
                                    ...profile,
                                    tell: v
                                })
                                setAccountUpdateValidator({
                                    ...accountUpdateValidation,
                                    phone: f
                                })
                            }}
                            fieldsPattern={{
                                field: "phone",
                                patterns: patterns.phone
                            }}
                            className="w-full"
                            value={profile.tell}
                            inputType={"tel"}
                            placeHolder={profile.tell ?? ""}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-col md:flex-row gap-[17px] w-full">
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Senha</AtomLabel>
                        <AtomInputField
                            onChange={(v, f): void => {
                                setPassword({
                                    ...password,
                                    password: v
                                })
                                setAccountUpdateValidator({
                                    ...accountUpdateValidation,
                                    password: f
                                })
                            }}
                            fieldsPattern={{
                                field: "password",
                                patterns: patterns.password
                            }}
                            className="w-full"
                            inputType={"password"}
                            required={true}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel className="w-full">
                        <AtomLabel>Confirmar senha</AtomLabel>
                        <AtomInputField
                            onChange={(v, f): void => {
                                setPassword({
                                    ...password,
                                    confirmation: v
                                })
                                setAccountUpdateValidator({
                                    ...accountUpdateValidation,
                                    passwordConfirmation: f
                                })
                            }}
                            fieldsPattern={{
                                field: "passwordConfirm",
                                patterns: patterns.passwordConfirmation
                            }}
                            className="w-full"
                            inputType={"password"}
                            required={true}
                        />
                    </AtomDivLabel>
                </div>
                <div className="pt-[16px]">
                    <div className="w-[165px] h-[19px] text-[#A09FA5] text-sm font-light font-['Geologica'] leading-tight">(*) Campos obrigatórios</div>
                </div>
                <div className="w-full flex justify-end pt-[32px] space-y-4 md:space-y-0 md:space-x-8 flex-col md:flex-row">
                    <AtomBtn
                        onClick={onExcludeAccount}
                        btnType={"button"}
                        className="text-white w-full md:w-1/2 bg-gradient-to-r from-red-600 to-red-800 text-sm sm:text-base md:text-lg">Deletar conta</AtomBtn>
                    <AtomBtn
                        btnType={"submit"}
                        className="text-white w-full md:w-1/2 bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 text-sm sm:text-base md:text-lg">Atualizar informações</AtomBtn>
                </div>
                <div>
                    <div className="text-[#A09FA5] text-base font-light font-['Geologica'] leading-snug">Por que solicitamos essas informações?</div>
                </div>
                {/* <>
                    <div>
                        <div className="text-[#32063D] text-[28px] font-normal font-['Geologica'] leading-[33.60px]">Outras informações</div>
                    </div>
                </>
                <div className="flex flex-row">
                    <AtomDivLabel>
                        <AtomLabel>Cep</AtomLabel>
                        <AtomInputField
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel>
                        <AtomLabel>Cidade</AtomLabel>
                        <AtomInputField
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                    <AtomDivLabel>
                        <AtomLabel>Estado</AtomLabel>
                        <AtomInputField
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-row">
                    <AtomDivLabel>
                        <AtomLabel>Rua</AtomLabel>
                        <AtomInputField
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                </div>
                <div className="flex flex-row">
                    <AtomDivLabel>
                        <AtomLabel>Complemento</AtomLabel>
                        <AtomInputField
                            inputType={"text"}
                        />
                    </AtomDivLabel>
                </div> */}
            </AtomForm>
        </>
    )
}