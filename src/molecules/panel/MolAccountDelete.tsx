import { AtomBtn } from "@atom/AtomBtn";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { ReactElement, useState } from "react";

interface IMolAccountDeleteProps {
    onExlude: (password: string) => unknown
}

export const MolAccountDelete = ({ onExlude }: IMolAccountDeleteProps): ReactElement => {
    const [password, setPassword] = useState("")

    const onPasswordChange = (pass: string): void => setPassword(pass)

    return (
        <div className="w-full h-full items-center justify-center flex flex-col md:w-[500px] md:h-fit bg-white space-y-10 p-4 md:rounded-[16px]">
            <h2 className="text-xl">Para confirmar a exclusão de sua conta precisamos que informe sua senha</h2>
            <AtomForm
                onSubmit={(e): void => {
                    e.preventDefault()
                    onExlude(password)
                }}
            >
                <AtomDivLabel className="w-full">
                    <AtomLabel>Senha:</AtomLabel>
                    <AtomInputField
                        placeHolder={"Senha"}
                        className="w-full"
                        onChange={onPasswordChange}
                        inputType={"password"}
                        value={""}
                    />
                </AtomDivLabel>

                <AtomBtn
                    className={"bg-red-500 w-full h-10"}
                >Excluir</AtomBtn>
            </AtomForm>
        </div>
    )
}