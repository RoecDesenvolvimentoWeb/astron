import { AtomTitle } from "@atom/AtomTitle";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgPanelMercadoPagoPaymentAccount } from "./accounts/OrgPanelMercadoPagoPaymentAccount";
import { OrgPanelStripeAccount } from "./accounts/OrgPanelStripeAccount";

interface IOrgPanelMainContentPaymentAccountProps extends IDefaultProps {}

const serverApi = new ServerApi();

export const OrgPanelMainContentPaymentAccount = ({
    setIsLoading,
}: IOrgPanelMainContentPaymentAccountProps): ReactElement => {
    const [accountBindingLink, setAccountBindingLink] = useState<{
        href: string;
    }>({ href: "" });
    const [accountMp, setAccountMp] = useState<{
        accountId: number;
        createAt: string;
    }>();
    const [accountAccessLinkStripe] = useState<string>("http://dashboard.stripe.com/")
    const [stripeAccount, setStripeAccount] = useState<{
        id: string
        isActive: boolean
    } | undefined>(undefined)
    const [loadedStripeAccount, setLoadedStripeAccount] = useState(false)
    const [stripeLoading, setStripeLoading] = useState(false)

    const loadBindingAccountLink = async (): Promise<void> => {
        const prom = serverApi.getBindLinkMp();
        await commonPromiseHandle<{ href: string }>(
            prom,
            setAccountBindingLink,
            "Não foi possível obter o link de vinculação"
        );
    };

    const loadStripeAccount = async (): Promise<void> => {
        const prom = serverApi.getStripeAccount();
        await commonPromiseHandle<{
            id: string;
            isActive: boolean
        } | undefined>(
            prom,
            setStripeAccount,
            "Não foi possível carregar a conta stripe"
        ).finally(() => {
            setLoadedStripeAccount(true)
        });
    };


    const loadMpAccount = async (): Promise<void> => {
        const prom = serverApi.getAccountMp();
        await commonPromiseHandle<
        | {
            accountId: number;
            createAt: string;
        }
        | undefined
        >(prom, setAccountMp, "Não foi possível carregar a conta do mercado pago");
    };

    const onUnbindAccount = (): void => {
        const prom = serverApi.unbindAccountMp();
        commonPromiseHandle(
            prom,
            undefined,
            "Não foi possível desvincular a conta do mercado pago",
            "Conta desvinculada com sucesso"
        )
            .catch(() => {
                toast.error("Não foi possível desvincular a conta do mercado pago");
            })
            .finally(() => {
                setTimeout(() => {
                    location.reload();
                }, 500);
            });
    };

    const onBindOrUnbindStripeAccount = (): void => {
        if (stripeAccount == null) {
            setStripeLoading(true)
            // Get binding link and redirect
            serverApi.getStripeAccountBindAccessLink("bind").then(({ data }) => {
                if (data.success) {
                    location.href = data.data as string ?? ""
                    return
                }
                toast.error(
                    (data.data as { message?: string }).message ?? "Não foi possíve obter o link de vinculação"
                )
            }).catch(() => {
                toast.error("Não foi possíve obter o link de vinculação")
            }).finally(() => {
                setStripeLoading(false)
            });
            return
        }
        const prom = serverApi.unbindStripeAccount();
        commonPromiseHandle(
            prom,
            undefined,
            "Não foi possível desvincular a conta do stripe",
            "Conta stripe desvinculada com sucesso"
        )
            .catch(() => {
                toast.error("Não foi possível desvincular a conta do stripe");
            })
            .finally(() => {
                setTimeout(() => {
                    location.reload();
                }, 500);
            });
    };

    const onEnableDisableAccountStripe = (status: boolean): void => {
        const prom = serverApi.enableOrDisableStripeAccount(status);
        commonPromiseHandle(
            prom,
            undefined,
            "Não foi possível ativar/desativar a conta do stripe",
            "Conta stripe desativada/ativada com sucesso"
        )
            .catch(() => {
                toast.error("Não foi possível ativar/desativar a conta do stripe");
            })
            .finally(() => {
                setTimeout(() => {
                    location.reload();
                }, 500);
            });
    }

    useEffect(() => {
        loadPageResoucers(
            setIsLoading,
            loadBindingAccountLink(),
            loadMpAccount(),
            loadStripeAccount()
        ).catch(() => {});
    }, []);

    useEffect(() => {
        if (loadedStripeAccount) loadPageResoucers(
            setIsLoading
        ).catch(() => {});
    }, [loadedStripeAccount]);

    return (
        <>
            <MolMainContentWrapper>
                <AtomTitle title="Vincular contas" />
                <div className="w-full flex gap-8 flex-col md:flex-row">
                    <OrgPanelMercadoPagoPaymentAccount
                        onUnbind={onUnbindAccount}
                        href={accountBindingLink.href}
                        isBinded={accountMp != undefined}
                    />
                    <OrgPanelStripeAccount
                        isLoading={stripeLoading}
                        isActive={stripeAccount?.isActive ?? false}
                        accessHref={accountAccessLinkStripe}
                        isBinded={stripeAccount != undefined}
                        onBindOrUnbind={onBindOrUnbindStripeAccount}
                        onToggleStatus={onEnableDisableAccountStripe}
                    />
                </div>
            </MolMainContentWrapper>
        </>
    );
};
