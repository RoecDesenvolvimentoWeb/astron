import { ReactElement, useEffect, useState } from "react";

export interface IFormData {
    welcomeMessage: string
    timeToAccept: number
}

export interface IFormDataWithGroupId extends IFormData {
    groupId?: number
}

interface IMolFormCreateUpdateFreeGroupProps {
    onSubmit: (data: IFormDataWithGroupId) => unknown
    groupId?: number
    data?: IFormData
}

const INITIAL_DATA: IFormData = {
    welcomeMessage: "olá seja bem vindo , para participar digite sim depois de dizer sim , será aprovado a sua entrada no meu canal free em 10 segundo",
    timeToAccept: 10
}

export const MolFormCreateUpdateFreeChannel = ({
    onSubmit,
    data: currentData,
    groupId
}: IMolFormCreateUpdateFreeGroupProps): ReactElement => {
    const [data, setData] = useState(currentData  ?? INITIAL_DATA)

    useEffect(() => {
        setData(currentData  ?? INITIAL_DATA)
    }, [currentData])
    return (
        <>
            <form
                onSubmit={(e): void => {
                    e.preventDefault()
                    onSubmit({
                        ...data,
                        groupId
                    })
                }}
            >
                <div className=" flex justify-start flex-col mt-[2rem] w-[100%] max-w-[98%]">
                    <label htmlFor="welcome_message " className="block mb-[10px]">
                        Mensagem de boas vindas
                    </label>
                    <textarea
                        onChange={({ target: { value }}): void => {
                            setData({
                                ...data,
                                welcomeMessage: value
                            })
                        }}
                        value={currentData == null ? undefined : data.welcomeMessage}
                        id="welcome_message"
                        placeholder={data.welcomeMessage}
                        className="border-[1px] border-[#dadada] outline-none p-[1rem] rounded-[4px]"
                    ></textarea>
                </div>

                <div className=" flex justify-start flex-col mt-[2rem]  w-[100%] max-w-[98%]">
                    <label htmlFor="time " className="block mb-[10px]">
                        Tempo para aceitar a solicitação (em segundos)
                    </label>
                    <input
                        onChange={({ target: { value }}): void => {
                            setData({
                                ...data,
                                timeToAccept: Number(value)
                            })
                        }}
                        value={currentData == null ? undefined : data.timeToAccept}
                        type="number"
                        placeholder={data.timeToAccept.toString()}
                        className="h-[40px] outline-none p-[1rem] border-[1px] border-[#dadada] rounded-[4px]"
                    />
                </div>
                <button
                    type={"submit"}
                    className="py-[10px] px-[20px] bg-[#D25AC4] rounded-[4px] mt-[20px] text-[#fff]">
                    Salvar configurações
                </button>
            </form>
        </>
    )
}