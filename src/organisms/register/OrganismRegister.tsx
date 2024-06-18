import { AtomCloseCard } from "@atom/AtomCloseCard";
import { MolTermsAndPolicy } from "@mols/panel/MolTermsAndPolicy";
import { MolLeftPresentationRegister } from "@mols/register/MolLeftPresentationRegister";
import { MolUserRegister } from "@mols/register/MolUserRegister";
import { commonPromiseHandle } from "@org/panel/main/commonPromiseHandle";
import { IOAuthRes, useOAuthV2 } from "hooks/useOAuthV2";
import { ReactElement, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ServerApi } from "resources/api/server/ServerApi";
import { IRegisterServerProperties } from "resources/api/server/contracts/ServerApiModel";

const serverApi = new ServerApi();

export const OrganismRegister = (): ReactElement => {
    const [isRegisteringIn, setIsRegisteringIn] = useState(false);
    const [policyInView, setPolicyInView] = useState(false)
    const navigate = useNavigate()
    const data = useOAuthV2()

    useEffect(() => {
        onRegisterByOAuth(data).catch(() => {})
    }, [data])

    const onRegisterByOAuth = async ({ error, accessToken }: IOAuthRes): Promise<void> => {
        console.log(error, accessToken)
        if (error == null && accessToken == null) return
        if (error != undefined) {
            toast.error("Não foi possível concluir o registro. Tente novamente.")
            setTimeout(() => {
                location.href = "/register"
            }, 1500)
            return
        }
        if (accessToken != undefined) {
            setIsRegisteringIn(true)
            // Start registering by google
            const prom = serverApi.oAuth(accessToken)
            await commonPromiseHandle(prom, undefined, "Não foi possível completar o registro", "Registrado com sucesso")
                .then(() => {
                    localStorage.removeItem("@selected-bot")
                    setTimeout(() => {
                        navigate("/panel")
                    }, 1500)
                })
                .catch(() => {
                    toast.error("Não foi possível efetuar o cadastro")
                })
                .finally(() => {
                    setIsRegisteringIn(false)
                })
        }
    }

    const onPolicyChange = (): void => setPolicyInView(!policyInView)

    const hangleRegister = async (
        dataRegister: IRegisterServerProperties
    ): Promise<void> => {
        setIsRegisteringIn(true);
        try {
            const { data } = await serverApi.register({
                ...dataRegister
            });
            if (data.success) {
                toast.success("Registrador com sucesso");
                // Other actions bellow ->
                localStorage.removeItem("@selected-bot")
                navigate("/panel")
            } else {
                if (data.code == 111 || data.code === 110) {
                    toast.error("Recaptcha inválido");
                    return;
                }
                if (data.code === 105) {
                    toast.error("Email já em uso, utilize outro.");
                    return;
                }
                toast.error(
                    "Não foi possível efetuar o registro, confira os campos e tente novamente."
                );
            }
        } catch (e) {
            toast.error("Ocorreu um erro durante o registro. Tente novamente.");
        } finally {
            setIsRegisteringIn(false);
        }
    };
    return (
        <div
            className={
                " flex items-center gap-[44px] justify-center flex-row w-full min-h-screen bg-[#ECE8F1] overflow-x-auto px-5 max-xl:gap-[0px] max-md:bg-white 	"
            }>
            <MolLeftPresentationRegister />
            <MolUserRegister
                onClickPolicy={onPolicyChange}
                register={hangleRegister}
                isRegisteringIn={isRegisteringIn}
            />
            {policyInView && <div
                className="absolute top-0 left-0 h-[100vh] md:flex items-center justify-center md:px-10 backdrop-blur-lg"
            >
                <div className="absolute top-10 right-10">
                    <AtomCloseCard
                        onClick={onPolicyChange}
                    />
                </div>
                <MolTermsAndPolicy className="h-[1720px]"/>
            </div>}
        </div>
    );
};
