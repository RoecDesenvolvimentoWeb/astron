import { AtomBtn } from "@atom/AtomBtn";
import { AtomCheckBox } from "@atom/AtomCheckBox";
import { AtomDivLabel } from "@atom/AtomDivLabel";
import { AtomForm } from "@atom/AtomForm";
import { AtomGoogleAuth } from "@atom/AtomGoogleAuth";
import { AtomInputField } from "@atom/AtomInputField";
import { AtomLabel } from "@atom/AtomLabel";
import { AtomLoading } from "@atom/AtomLoading";
import React, { ReactElement, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { IRegisterServerProperties } from "resources/api/server/contracts/ServerApiModel";
import { IFieldValidatorResult } from "utils/fieldValidator";

interface IMolUserRegisterProps {
    register: (data: IRegisterServerProperties) => unknown;
    isRegisteringIn: boolean;
    className?: string;
    onClickPolicy: () => unknown
}

interface IRegisterStatus {
    email: IFieldValidatorResult;
    phone: IFieldValidatorResult;
    password: IFieldValidatorResult;
    passwordConfirm: IFieldValidatorResult;
    name: IFieldValidatorResult;
    termsOfPolicyAccepted: IFieldValidatorResult;
}

type TRegisterFields =
	| "password"
	| "email"
	| "passwordConfirm"
	| "phone"
	| "termsOfPolicyAccepted"
	| "termsOfAnnouncements"
	| "name";

export const MolUserRegister = (props: IMolUserRegisterProps): ReactElement => {
    const captchaRef = React.createRef<ReCAPTCHA>()
    const [registerData, setRegisterData] = useState<
    IRegisterServerProperties & {
        passwordConfirm: string;
    }
    >({
        name: "",
        email: "",
        password: "",
        passwordConfirm: "",
        phone: "",
        termsOfPolicyAccepted: false,
        termsOfAnnouncements: true,
        recaptcha: "",
    });
    const [registerDataValidation, setRegisterDataValidation] =
		useState<IRegisterStatus>({
		    name: {
		        isValid: false,
		        messageError: "Coloque apenas nome e sobrenome",
		    },
		    email: {
		        isValid: false,
		        messageError: "Email inválido",
		    },
		    phone: {
		        isValid: true,
		        messageError: "Telefone inválido",
		    },
		    password: {
		        isValid: false,
		        messageError: "Senha - Tamanho minímo 5",
		    },
		    passwordConfirm: {
		        isValid: false,
		        messageError: "Confirmação de senha - Tamanho minímo 5",
		    },
		    termsOfPolicyAccepted: {
		        isValid: false,
		        messageError: "Aceite o termos de políticas para continuar",
		    },
		});

    const handleRegisterChange = (
        field: TRegisterFields,
        value: unknown
    ): void => {
        setRegisterData({
            ...registerData,
            [field]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (props.isRegisteringIn) return;
        const fields = Object.keys(registerDataValidation);
        let registerIsValid = true;
        for (const field of fields) {
            const { isValid, messageError = "" } =
				registerDataValidation[field as never];
            if (!isValid) {
                toast.error(messageError);
                registerIsValid = false;
                break;
            }
        }
        if (!registerIsValid) return;
        if (registerData.password != registerData.passwordConfirm) {
            toast.error("Cofirmação de senha não coincide");
            return;
        }
        if (registerIsValid) {
            const result = await captchaRef.current?.executeAsync()
            props.register({
                ...registerData,
                recaptcha: result ?? ""
            });
            captchaRef.current?.reset()
        }
    };

    return (
        <div
            className={
                "inline-flex p-[44px] flex-col justify-center items-center gap-[44px] rounded-[16px] bg-[#FEFEFE] min-h-fit h-[762px] relative w-1/2 max-w-[768px] max-lg:w-full max-md:h-full"
            }>
            <AtomLoading
                isInView={props.isRegisteringIn}
                className={"z-20 top-0 right-0 m-4"}
            />
            <div className={"w-fit"}>
                <svg
                    width="161"
                    height="96"
                    viewBox="0 0 161 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M68.7425 18.3273C73.8034 18.3273 77.9061 14.2246 77.9061 9.16363C77.9061 4.10269 73.8034 0 68.7425 0C63.6816 0 59.5789 4.10269 59.5789 9.16363C59.5789 14.2246 63.6816 18.3273 68.7425 18.3273Z"
                        fill="url(#paint0_linear_191_2096)"
                    />
                    <path
                        d="M92.668 18.3273C97.729 18.3273 101.832 14.2246 101.832 9.16363C101.832 4.10269 97.729 0 92.668 0C87.6071 0 83.5044 4.10269 83.5044 9.16363C83.5044 14.2246 87.6071 18.3273 92.668 18.3273Z"
                        fill="url(#paint1_linear_191_2096)"
                    />
                    <path
                        d="M113.329 29.7443C113.329 34.8052 109.226 38.9079 104.165 38.9079C99.1042 38.9079 95.0015 34.8052 95.0015 29.7443C95.0015 24.6833 99.1042 20.5806 104.165 20.5806C109.226 20.5806 113.329 24.6833 113.329 29.7443Z"
                        fill="url(#paint2_linear_191_2096)"
                    />
                    <path
                        d="M56.8348 20.811C60.4501 20.811 63.5748 22.8941 65.067 25.9286C65.2373 26.2891 65.4075 26.6997 65.5377 27.0803C66.0385 28.4824 66.399 29.8444 66.6193 31.2465C66.6525 31.4503 66.6839 31.6458 66.714 31.8338C67.13 34.4267 67.3214 35.6196 68.9928 38.1968C69.6649 39.2229 71.2934 40.6014 72.8571 41.925C73.9031 42.8105 74.9203 43.6715 75.6027 44.386C77.195 46.0485 78.1665 48.2918 78.1665 50.7755C78.1665 55.8731 74.0404 59.9992 68.9428 59.9992C65.2573 59.9992 62.0726 57.836 60.5904 54.7214C60.4301 54.3809 60.2899 54.0304 60.1797 53.6798C59.5087 51.777 59.1783 50.3449 58.988 49.1832C58.8768 48.5275 58.8143 47.961 58.7571 47.4423C58.6132 46.1387 58.5027 45.1363 57.7361 43.7751C57.0751 42.6034 56.0536 41.1913 55.0721 40.3C54.5478 39.8353 53.8946 39.3214 53.2089 38.7821C51.7076 37.601 50.051 36.2979 49.2535 35.1223C48.252 33.6501 47.6711 31.8774 47.6711 29.9746C47.6711 24.9071 51.7772 20.811 56.8348 20.811Z"
                        fill="url(#paint3_linear_191_2096)"
                    />
                    <path
                        d="M88.8924 25.9286C87.4002 22.8941 84.2756 20.811 80.6702 20.811C75.6027 20.811 71.5066 24.9071 71.5066 29.9746C71.5066 31.8774 72.0875 33.6501 73.0789 35.1223C73.8776 36.2895 75.5184 37.5824 77.0087 38.7567C77.7049 39.3053 78.3682 39.828 78.8976 40.3C79.8891 41.1913 80.9106 42.6034 81.5615 43.7751C82.3353 45.1491 82.4459 46.1575 82.5909 47.4791C82.6467 47.9878 82.7076 48.5429 82.8134 49.1832C83.0037 50.3449 83.3342 51.777 84.0052 53.6798C84.1254 54.0304 84.2656 54.3809 84.4258 54.7214C85.908 57.836 89.0827 59.9992 92.7682 59.9992C97.8658 59.9992 102.002 55.8731 102.002 50.7755C102.002 48.2918 101.02 46.0485 99.4381 44.386C98.7586 43.6787 97.7528 42.8279 96.717 41.9519C95.1424 40.62 93.4989 39.2299 92.8283 38.1968C91.1409 35.5951 90.9531 34.4041 90.5359 31.7592C90.5099 31.5942 90.483 31.4235 90.4548 31.2465C90.2244 29.8444 89.8639 28.4824 89.3631 27.0803C89.233 26.6997 89.0627 26.2891 88.8924 25.9286Z"
                        fill="url(#paint4_linear_191_2096)"
                    />
                    <path
                        d="M3.77131 90.9992H0.475852L5.49716 76.4538H9.46023L14.4744 90.9992H11.179L7.53551 79.7776H7.42188L3.77131 90.9992ZM3.56534 85.2819H11.3494V87.6824H3.56534V85.2819ZM26.5837 80.637C26.5269 80.0641 26.2831 79.619 25.8522 79.3018C25.4213 78.9845 24.8366 78.8259 24.0979 78.8259C23.596 78.8259 23.1723 78.8969 22.8266 79.039C22.481 79.1763 22.2158 79.3681 22.0312 79.6143C21.8513 79.8605 21.7613 80.1398 21.7613 80.4523C21.7518 80.7127 21.8063 80.94 21.9246 81.1341C22.0478 81.3283 22.2158 81.4964 22.4289 81.6384C22.642 81.7757 22.8882 81.8965 23.1675 82.0006C23.4469 82.1001 23.7452 82.1853 24.0624 82.2563L25.3692 82.5688C26.0037 82.7109 26.5861 82.9002 27.1164 83.137C27.6467 83.3737 28.106 83.6649 28.4942 84.0106C28.8825 84.3562 29.1832 84.7634 29.3962 85.2322C29.614 85.7009 29.7253 86.2383 29.73 86.8444C29.7253 87.7345 29.498 88.5063 29.0482 89.1597C28.6031 89.8084 27.9592 90.3127 27.1164 90.6725C26.2783 91.0276 25.2674 91.2052 24.0837 91.2052C22.9095 91.2052 21.8868 91.0252 21.0156 90.6654C20.1491 90.3056 19.472 89.7729 18.9843 89.0674C18.5013 88.3572 18.248 87.4788 18.2244 86.4324H21.2002C21.2334 86.9201 21.373 87.3273 21.6192 87.654C21.8702 87.976 22.204 88.2199 22.6207 88.3856C23.0421 88.5466 23.5179 88.627 24.0482 88.627C24.5691 88.627 25.0212 88.5513 25.4048 88.3998C25.793 88.2483 26.0937 88.0376 26.3067 87.7677C26.5198 87.4978 26.6263 87.1877 26.6263 86.8373C26.6263 86.5106 26.5293 86.2359 26.3352 86.0134C26.1458 85.7909 25.8664 85.6015 25.4971 85.4452C25.1325 85.289 24.6851 85.1469 24.1548 85.0191L22.571 84.6214C21.3446 84.3231 20.3763 83.8567 19.6661 83.2222C18.9559 82.5877 18.6031 81.7331 18.6079 80.6583C18.6031 79.7776 18.8375 79.0082 19.311 78.3501C19.7892 77.6919 20.445 77.1782 21.2783 76.8089C22.1117 76.4395 23.0586 76.2549 24.1192 76.2549C25.1988 76.2549 26.141 76.4395 26.946 76.8089C27.7556 77.1782 28.3853 77.6919 28.8352 78.3501C29.285 79.0082 29.517 79.7705 29.5312 80.637H26.5837ZM34.0446 78.9893V76.4538H45.9906V78.9893H41.5375V90.9992H38.4977V78.9893H34.0446ZM50.758 90.9992V76.4538H56.4966C57.5951 76.4538 58.5326 76.6502 59.3091 77.0432C60.0903 77.4315 60.6846 77.9831 61.0918 78.6981C61.5037 79.4083 61.7097 80.244 61.7097 81.2052C61.7097 82.1711 61.5013 83.002 61.0847 83.6981C60.668 84.3894 60.0643 84.9197 59.2736 85.289C58.4876 85.6583 57.5359 85.843 56.4185 85.843H52.5761V83.3714H55.9213C56.5084 83.3714 56.9961 83.2909 57.3844 83.1299C57.7726 82.9689 58.0615 82.7274 58.2509 82.4055C58.445 82.0835 58.542 81.6834 58.542 81.2052C58.542 80.7222 58.445 80.315 58.2509 79.9836C58.0615 79.6521 57.7703 79.4012 57.3773 79.2307C56.989 79.0556 56.499 78.968 55.9071 78.968H53.8332V90.9992H50.758ZM58.6131 84.3799L62.2281 90.9992H58.8332L55.2963 84.3799H58.6131ZM80.0494 83.7265C80.0494 85.3127 79.7488 86.6621 79.1474 87.7748C78.5508 88.8875 77.7365 89.7374 76.7043 90.3245C75.6768 90.9069 74.5215 91.1981 73.2383 91.1981C71.9457 91.1981 70.7857 90.9045 69.7582 90.3174C68.7308 89.7303 67.9187 88.8804 67.3222 87.7677C66.7256 86.655 66.4273 85.3079 66.4273 83.7265C66.4273 82.1403 66.7256 80.7909 67.3222 79.6782C67.9187 78.5655 68.7308 77.718 69.7582 77.1356C70.7857 76.5484 71.9457 76.2549 73.2383 76.2549C74.5215 76.2549 75.6768 76.5484 76.7043 77.1356C77.7365 77.718 78.5508 78.5655 79.1474 79.6782C79.7488 80.7909 80.0494 82.1403 80.0494 83.7265ZM76.9315 83.7265C76.9315 82.699 76.7776 81.8325 76.4699 81.127C76.1669 80.4216 75.7383 79.8865 75.1844 79.5219C74.6304 79.1574 73.9817 78.9751 73.2383 78.9751C72.495 78.9751 71.8463 79.1574 71.2923 79.5219C70.7383 79.8865 70.3075 80.4216 69.9997 81.127C69.6967 81.8325 69.5452 82.699 69.5452 83.7265C69.5452 84.7539 69.6967 85.6204 69.9997 86.3259C70.3075 87.0314 70.7383 87.5664 71.2923 87.931C71.8463 88.2956 72.495 88.4779 73.2383 88.4779C73.9817 88.4779 74.6304 88.2956 75.1844 87.931C75.7383 87.5664 76.1669 87.0314 76.4699 86.3259C76.7776 85.6204 76.9315 84.7539 76.9315 83.7265ZM97.2937 76.4538V90.9992H94.6374L88.3093 81.8444H88.2028V90.9992H85.1275V76.4538H87.8263L94.1048 85.6015H94.2326V76.4538H97.2937ZM109.375 82.5262V84.9268H102.741V82.5262H109.375ZM114.81 90.9992V76.4538H120.633C121.703 76.4538 122.596 76.6124 123.311 76.9296C124.026 77.2468 124.563 77.6872 124.923 78.2506C125.283 78.8093 125.463 79.4533 125.463 80.1824C125.463 80.7506 125.349 81.2502 125.122 81.681C124.895 82.1072 124.582 82.4575 124.185 82.7322C123.792 83.002 123.342 83.1938 122.835 83.3074V83.4495C123.389 83.4732 123.908 83.6294 124.39 83.9182C124.878 84.2071 125.274 84.6119 125.577 85.1327C125.88 85.6488 126.031 86.2644 126.031 86.9793C126.031 87.7511 125.839 88.44 125.456 89.0461C125.077 89.6474 124.516 90.1233 123.773 90.4736C123.029 90.824 122.113 90.9992 121.024 90.9992H114.81ZM117.885 88.485H120.392C121.249 88.485 121.874 88.3216 122.267 87.9949C122.66 87.6635 122.856 87.2232 122.856 86.6739C122.856 86.2715 122.759 85.9163 122.565 85.6086C122.371 85.3008 122.094 85.0593 121.734 84.8841C121.379 84.709 120.955 84.6214 120.463 84.6214H117.885V88.485ZM117.885 82.5404H120.165C120.586 82.5404 120.96 82.467 121.287 82.3202C121.618 82.1687 121.879 81.9556 122.068 81.681C122.262 81.4064 122.359 81.0773 122.359 80.6938C122.359 80.1682 122.172 79.7445 121.798 79.4225C121.429 79.1005 120.903 78.9395 120.221 78.9395H117.885V82.5404ZM144.199 83.7265C144.199 85.3127 143.898 86.6621 143.297 87.7748C142.7 88.8875 141.886 89.7374 140.853 90.3245C139.826 90.9069 138.671 91.1981 137.388 91.1981C136.095 91.1981 134.935 90.9045 133.907 90.3174C132.88 89.7303 132.068 88.8804 131.471 87.7677C130.875 86.655 130.576 85.3079 130.576 83.7265C130.576 82.1403 130.875 80.7909 131.471 79.6782C132.068 78.5655 132.88 77.718 133.907 77.1356C134.935 76.5484 136.095 76.2549 137.388 76.2549C138.671 76.2549 139.826 76.5484 140.853 77.1356C141.886 77.718 142.7 78.5655 143.297 79.6782C143.898 80.7909 144.199 82.1403 144.199 83.7265ZM141.081 83.7265C141.081 82.699 140.927 81.8325 140.619 81.127C140.316 80.4216 139.888 79.8865 139.334 79.5219C138.78 79.1574 138.131 78.9751 137.388 78.9751C136.644 78.9751 135.996 79.1574 135.442 79.5219C134.888 79.8865 134.457 80.4216 134.149 81.127C133.846 81.8325 133.694 82.699 133.694 83.7265C133.694 84.7539 133.846 85.6204 134.149 86.3259C134.457 87.0314 134.888 87.5664 135.442 87.931C135.996 88.2956 136.644 88.4779 137.388 88.4779C138.131 88.4779 138.78 88.2956 139.334 87.931C139.888 87.5664 140.316 87.0314 140.619 86.3259C140.927 85.6204 141.081 84.7539 141.081 83.7265ZM148.059 78.9893V76.4538H160.005V78.9893H155.552V90.9992H152.512V78.9893H148.059Z"
                        fill="url(#paint5_linear_191_2096)"
                    />
                    <defs>
                        <linearGradient
                            id="paint0_linear_191_2096"
                            x1="57.4999"
                            y1="6.86683e-06"
                            x2="94.5"
                            y2="60"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#572463" />
                            <stop offset="1" stop-color="#D95DCA" />
                        </linearGradient>
                        <linearGradient
                            id="paint1_linear_191_2096"
                            x1="57.4999"
                            y1="6.86683e-06"
                            x2="94.5"
                            y2="60"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#572463" />
                            <stop offset="1" stop-color="#D95DCA" />
                        </linearGradient>
                        <linearGradient
                            id="paint2_linear_191_2096"
                            x1="57.4999"
                            y1="6.86683e-06"
                            x2="94.5"
                            y2="60"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#572463" />
                            <stop offset="1" stop-color="#D95DCA" />
                        </linearGradient>
                        <linearGradient
                            id="paint3_linear_191_2096"
                            x1="57.4999"
                            y1="6.86683e-06"
                            x2="94.5"
                            y2="60"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#572463" />
                            <stop offset="1" stop-color="#D95DCA" />
                        </linearGradient>
                        <linearGradient
                            id="paint4_linear_191_2096"
                            x1="57.4999"
                            y1="6.86683e-06"
                            x2="94.5"
                            y2="60"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#572463" />
                            <stop offset="1" stop-color="#D95DCA" />
                        </linearGradient>
                        <linearGradient
                            id="paint5_linear_191_2096"
                            x1="92"
                            y1="101.5"
                            x2="90.5"
                            y2="72"
                            gradientUnits="userSpaceOnUse">
                            <stop stop-color="#572463" />
                            <stop offset="1" stop-color="#D95DCA" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <AtomForm onSubmit={handleSubmit}>
                <ReCAPTCHA
                    ref={captchaRef}
                    size={"invisible"}
                    sitekey="6LdbgnspAAAAABUx9NydnsPTjPlPdFrydmQ3Ls7z"
                >
                </ReCAPTCHA>
                <div className="flex gap-[32px] flex-col w-full">
                    <AtomDivLabel className="w-full">
                        <AtomLabel isRequired={true}>Nome e sobrenome</AtomLabel>
                        <AtomInputField
                            onChange={(e, status): void => {
                                handleRegisterChange("name", e);
                                setRegisterDataValidation({
                                    ...registerDataValidation,
                                    name: status,
                                });
                            }}
                            fieldsPattern={{
                                field: "name",
                                patterns: [
                                    {
                                        messageError: "Coloque apenas nome e sobrenome",
                                        regexp: /^\w+\s\w+$/,
                                    },
                                ],
                            }}
                            inputType={"text"}
                            placeHolder={"Nome e sobrenome"}
                            className="w-full"
                        />
                    </AtomDivLabel>
                    <div className="flex gap-[16px] flex-row max-md:flex-col">
                        <AtomDivLabel className="w-full">
                            <AtomLabel isRequired={true}>E-mail</AtomLabel>
                            <AtomInputField
                                onChange={(e, status): void => {
                                    handleRegisterChange("email", e);
                                    setRegisterDataValidation({
                                        ...registerDataValidation,
                                        email: status,
                                    });
                                }}
                                inputType={"email"}
                                placeHolder={"usuario@email.com"}
                                className="w-full"
                                fieldsPattern={{
                                    field: "email",
                                    patterns: [
                                        {
                                            messageError: "Email inválido",
                                            regexp: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        },
                                    ],
                                }}
                            />
                        </AtomDivLabel>
                        <AtomDivLabel className="w-full">
                            <AtomLabel isRequired={false}>Telefone</AtomLabel>
                            <AtomInputField
                                onChange={(e, status): void => {
                                    handleRegisterChange("phone", e);
                                    setRegisterDataValidation({
                                        ...registerDataValidation,
                                        phone: status,
                                    });
                                }}
                                inputType={"tel"}
                                placeHolder={"99 9999-9999"}
                                className="w-full"
                                fieldsPattern={{
                                    field: "phone",
                                    patterns: [
                                        {
                                            messageError: "Telefone inválido",
                                            regexp: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                                            optional: true
                                        },
                                    ],
                                }}
                            />
                        </AtomDivLabel>
                    </div>
                    <div className="flex gap-[16px] flex-row max-md:flex-col">
                        <AtomDivLabel className="w-full">
                            <AtomLabel isRequired={true}>Senha</AtomLabel>
                            <AtomInputField
                                onChange={(e, status): void => {
                                    handleRegisterChange("password", e);
                                    setRegisterDataValidation({
                                        ...registerDataValidation,
                                        password: status,
                                    });
                                }}
                                inputType={"password"}
                                placeHolder={"Digite sua senha"}
                                className="w-full"
                                fieldsPattern={{
                                    field: "password",
                                    patterns: [
                                        {
                                            messageError: "Senha - Tamanho minímo 5",
                                            regexp: /^([\w\d\s]+){5,}$/,
                                        },
                                    ],
                                }}
                            />
                        </AtomDivLabel>
                        <AtomDivLabel className="w-full">
                            <AtomLabel isRequired={true}>Confirmar senha</AtomLabel>
                            <AtomInputField
                                onChange={(e, status): void => {
                                    handleRegisterChange("passwordConfirm", e);
                                    setRegisterDataValidation({
                                        ...registerDataValidation,
                                        passwordConfirm: status,
                                    });
                                }}
                                inputType={"password"}
                                placeHolder={"Confirmar senha"}
                                className="w-full"
                                fieldsPattern={{
                                    field: "passwordConfirm",
                                    patterns: [
                                        {
                                            messageError: "Confirmação de senha - Tamanho minímo 5",
                                            regexp: /^([\w\d\s]+){5,}$/,
                                        },
                                    ],
                                }}
                            />
                        </AtomDivLabel>
                    </div>
                </div>
                <div
                    style={{
                        color: "#8A8D8F",
                        fontSize: 14,
                        fontFamily: "Geologica",
                        fontWeight: "400",
                        wordWrap: "break-word",
                    }}>
					(*) Campos obrigatórios
                </div>
                <div className="mt-[25px] h-fit flex flex-col gap-[24px] w-full">
                    <div className={"flex gap-[8px]"}>
                        <AtomCheckBox
                            onChange={(e): void => {
                                handleRegisterChange("termsOfAnnouncements", e);
                            }}
                            isActive={registerData.termsOfAnnouncements}
                        />
                        <div className="select-none w-[507px] text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight">
							Quero receber ofertas e novidades por e-mail, SMS, WhatsApp ou
							mensagens sobre novidades da Astron
                        </div>
                    </div>
                    <div className={"flex gap-[8px]"}>
                        <AtomCheckBox
                            isActive={registerData.termsOfPolicyAccepted}
                            fieldsPattern={{
                                field: "termsOfPolicyAccepted",
                                patterns: [
                                    {
                                        messageError: "Deve aceitar os termos de política",
                                        regexp: /^(true)$/,
                                    },
                                ],
                            }}
                            onChange={(e, status): void => {
                                handleRegisterChange("termsOfPolicyAccepted", e);
                                setRegisterDataValidation({
                                    ...registerDataValidation,
                                    termsOfPolicyAccepted: status,
                                });
                            }}
                        />
                        <div className="w-[507px] h-fit select-none">
                            <span className="text-neutral-400 text-sm font-normal font-['Geologica'] leading-tight">
								Li e estou de acordo com as
                            </span>
                            <span className="text-gray-400 text-sm font-normal font-['Geologica'] leading-tight">
                                {" "}
                            </span>
                            <span
                                onClick={props.onClickPolicy}
                                className="text-fuchsia-950 text-sm font-normal font-['Geologica'] underline leading-tight cursor-pointer">
								políticas da empresa e políticas de privacidade
                            </span>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between flex-col md:flex-row mt-[22px] w-full gap-y-2">
                    <div className="select-none h-fit">
                        <span className="text-zinc-500 text-sm font-normal font-['Geologica'] leading-tigh  ">
                            {" "}
							Já possui conta?
                        </span>
                        <span className="text-zinc-500 text-sm font-normal font-['Poppins'] leading-[21px]">
                            {" "}
                        </span>
                        <Link to={"/login"}>
                            <span className="cursor-pointer text-fuchsia-950 text-sm font-normal font-['Geologica'] underline leading-tight">
								Faça login
                            </span>
                        </Link>
                    </div>
                    <AtomGoogleAuth type="REGISTER"/>
                    <AtomBtn
                        isDisable={props.isRegisteringIn}
                        btnType={"submit"}
                        className={"bg-gradient-to-r from-lilas-lv1 to-lilas-lv5 w-full md:max-w-[200px]"}>
						Criar Conta
                    </AtomBtn>
                </div>
            </AtomForm>
        </div>
    );
};
