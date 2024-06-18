import { MolUserLogin } from "@mols/login/MolUserLogin";
import { MolUserLoginCode } from "@mols/login/MolUserLoginCode";
import { MolUserLoginRecovery } from "@mols/login/MolUserLoginRecovery";
import { commonPromiseHandle } from "@org/panel/main/commonPromiseHandle";
import { IOAuthRes, useOAuthV2 } from "hooks/useOAuthV2";
import React, { ReactElement, useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ServerApi } from "resources/api/server/ServerApi";
import { ILoginCodeServerProperties, ILoginRecoveryPasswordServerProperties, ILoginServerProperties } from "resources/api/server/contracts/ServerApiModel";

const serverApi = new ServerApi();

export const OrganismLogin = (): ReactElement => {
    const captchaRef = React.createRef<ReCAPTCHA>()
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const [isRecoveringData, setIsRecoveringData] = useState(false);
    const [isLoggingCode, setIsLoggingCode] = useState(false);
    const [isToRecoveryPassword, setIsToRecoveryPassword] = useState(false);
    const [isToLoginCode, setIsToLoginCode] = useState(false);
    const data = useOAuthV2()
    const navigate = useNavigate()

    useEffect(() => {
        onRegisterByOAuth(data).catch(() => {})
    }, [data])

    const onRegisterByOAuth = async ({ error, accessToken }: IOAuthRes): Promise<void> => {
        if (error == null && accessToken == null) return
        if (error != undefined) {
            toast.error("Não foi possível concluir o login. Tente novamente.")
            setTimeout(() => {
                location.href = "/login"
            }, 1500)
            return
        }
        if (accessToken != undefined) {
            setIsLoggingIn(true)
            // Start registering by google
            const prom = serverApi.oAuth(accessToken)
            await commonPromiseHandle(prom, undefined, "Não foi possível completar o login", "Logado com sucesso")
                .then(() => {
                    localStorage.removeItem("@selected-bot")
                    setTimeout(() => {
                        navigate("/panel")
                    }, 1500)
                })
                .catch(() => {
                    toast.error("Não foi possível efetuar o login")
                })
                .finally(() => {
                    setIsLoggingIn(false)
                })
        }
    }

    const handleLogin = async (data: ILoginServerProperties): Promise<void> => {
        setIsLoggingIn(true);
        await serverApi
            .login(data)
            .then(({ data }) => {
                if (data.success) {
                    localStorage.removeItem("@selected-bot")
                    toast.success("Logado com sucesso");
                    // Other actions bellow ->
                    navigate("/panel")
                } else {
                    if (data.code === 104) {
                        toast.error("Login inválido");
                        return;
                    }
                    toast.error(
                        "Não foi possível efetuar o login, confira os campos e tente novamente."
                    );
                }
            })
            .catch(() => {
                toast.error("Não foi possível efetuar login. Tente novamente.");
            })
            .finally(() => {
                setIsLoggingIn(false);
            });
    };

    const handleRecoveryData = async (
        dataRecovery: ILoginRecoveryPasswordServerProperties
    ): Promise<void> => {
        setIsRecoveringData(true);
        try {
            const { data } = await serverApi.recoveryPassword({
                ...dataRecovery,
                recaptcha: await captchaRef.current?.executeAsync() ?? "",
            });
            if (data.success) {
                toast.success("Código enviado com sucesso");
                // Other actions below ->
            } else {
                if (data.code == 111 || data.code === 110) {
                    toast.error("Recaptcha inválido");
                    return;
                }
                if (data.code === 106) {
                    toast.error("Email inválido/Não encontrado");
                    return;
                }
                toast.error("Não foi possível enviar o código. Tente novamente.");
            }
        } catch (e) {
            toast.error("Ocorreu um erro ao enviar o código. Tente novamente.");
        } finally {
            captchaRef.current?.reset()
            setIsRecoveringData(false);
        }
    };

    const handleLoginCode = async (
        dataCode: ILoginCodeServerProperties
    ): Promise<void> => {
        setIsLoggingCode(true);
        try {
            const { data } = await serverApi.loginCode({
                ...dataCode,
                recaptcha: await captchaRef.current?.executeAsync() ?? "",
            });
            if (data.success) {
                localStorage.removeItem("@selected-bot")
                toast.success("Logado com sucesso");
                // Other actions below ->
                navigate("/panel/account")
            } else {
                if (data.code == 111 || data.code === 110) {
                    toast.error("Recaptcha inválido");
                    return;
                }
                if (data.code === 106) {
                    toast.error("Código inválido/expirado");
                    return;
                }
                toast.error(
                    "Não foi possível logar com o código informado. Tente novamente."
                );
            }
        } catch (e) {
            toast.error("Ocorreu um erro ao enviar o código. Tente novamente.");
        } finally {
            captchaRef.current?.reset()
            setIsLoggingCode(false);
        }
    };

    return (
        <div className="bg-[#ECE8F1] w-screen h-screen bg-no-repeat bg-center bg-[length:89%_85%] flex items-center justify-end bg-[url('/src/assets/loginback.png')] xl:pr-36 bg-contain max-xl:pr-10 max-lg:bg-none max-lg:justify-center max-md:items-end max-md:bg-[url('/src/assets/bgloginmobile.png')] max-md:bg-top max-md:pr-0">

            <ReCAPTCHA
                ref={captchaRef}
                size={"invisible"}
                sitekey="6LdbgnspAAAAABUx9NydnsPTjPlPdFrydmQ3Ls7z"
            >
            </ReCAPTCHA>
            <MolUserLogin
                setIsToRecovery={(): void => {
                    setIsToRecoveryPassword(true);
                }}
                setIsToLoginWithCode={(): void => {
                    setIsToLoginCode(true);
                }}
                isLoggingIn={isLoggingIn}
                login={handleLogin}
            />
            {isToRecoveryPassword && (
                <MolUserLoginRecovery
                    onCloseRecovery={(): void => {
                        setIsToRecoveryPassword(false);
                    }}
                    recoveryData={handleRecoveryData}
                    isRecoveringData={isRecoveringData}
                />
            )}
            {isToLoginCode && (
                <MolUserLoginCode
                    onCloseCode={(): void => {
                        setIsToLoginCode(false);
                    }}
                    loginCode={handleLoginCode}
                    isLoggingInWithCode={isLoggingCode}
                />
            )}
        </div>
    );
};
