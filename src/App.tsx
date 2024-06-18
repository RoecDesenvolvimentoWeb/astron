import { OrgPanelMainContentAccount } from "@org/panel/main/account/OrgPanelMainContentAccount";
import { OrgPanelMainContentBotConfiguration } from "@org/panel/main/bot/configuration/OrgPanelMainContentBotConfiguration";
import { OrgPanelMainContentBotCreation } from "@org/panel/main/bot/creation/OrgPanelMainContentBotCreation";
import { OrgPanelMainContentDashboard } from "@org/panel/main/dashboard/OrgPanelMainContentDashboard";
import { OrgPanelMainCreateChannelFree } from "@org/panel/main/freechanel/OrgPanelMainCreateChannelFree";
import { OrgPanelMainContentPaymentAccount } from "@org/panel/main/payment-account/OrgPanelMainContentPaymentAccount";
import { OrgPanelMainContentPlan } from "@org/panel/main/plan/OrgPanelMainContentPlan";
import { OrgPanelMainContentRemarketing } from "@org/panel/main/remarketing/OrgPanelMainContentRemarketing";
import { OrgPanelMainContentMemberReport } from "@org/panel/main/report/OrgPanelMainContentMemberReport";
import { OrgPanelMainContentRewardTask } from "@org/panel/main/reward-task/OrgPanelMainContentRewardTask";
import { OrgPanelMainContentSignature } from "@org/panel/main/signature/OrgPanelMainContentSignature";
import { OrgPanelMainContentTelegramConfig } from "@org/panel/main/telegram/config/OrgPanelMainContentTelegramConfig";
import { OrgPanelMainContentTelegramRedirectBtns } from "@org/panel/main/telegram/redirect-btns/OrgPanelMainContentTelegramRedirectBtns";
import { OrgPanelMainContentTermsPolicy } from "@org/panel/main/terms-policy/OrgPanelMainContentTermsPolicy";
import { LoginPage } from "@pag/login/LoginPage";
import { PanelPage } from "@pag/panel/PanelPage";
import { PolicyPage } from "@pag/policy/PolicyPage";
import { RegisterPage } from "@pag/register/RegisterPage";
import { ReactElement, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App(): ReactElement {
    const [isLoading, setIsLoading] = useState(true);
    return (
        <>
            <Toaster
                {...{
                    toastOptions: {
                        duration: 1000,
                        error: {
                            style: {
                                background: "#CD5656",
                                color: "white",
                            },
                        },
                        success: {
                            style: {
                                background: "#04C000",
                                color: "white",
                            },
                        },
                        position: "bottom-right",
                    },
                }}
            />
            <BrowserRouter>
                <Routes>
                    <Route path="register" Component={RegisterPage} />
                    <Route path="login" Component={LoginPage} />
                    <Route
                        path="panel"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentDashboard setIsLoading={setIsLoading} />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/bot/creation"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentBotCreation
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/bot/config"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentBotConfiguration
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/rewardtask"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentRewardTask
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/account"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentAccount setIsLoading={setIsLoading} />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/member/report"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentMemberReport
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/telegram/config"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentTelegramConfig
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/telegram/redirectbtns"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentTelegramRedirectBtns
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/signature"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentSignature setIsLoading={setIsLoading} />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/plan"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentPlan setIsLoading={setIsLoading} />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/remarketing"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentRemarketing
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/payment/account"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentPaymentAccount
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/terms"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentTermsPolicy
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route path="privacy" element={<PolicyPage />} />
                    <Route
                        path="*"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentDashboard setIsLoading={setIsLoading} />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/channelfree"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainCreateChannelFree
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    {/* <Route
                        path="panel/asaas/account"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentAsaasAccount
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    />
                    <Route
                        path="panel/asaas/account/bind_update"
                        element={
                            <PanelPage
                                resource={{
                                    mainContent: (
                                        <OrgPanelMainContentPaymentAccountUpdateBind
                                            setIsLoading={setIsLoading}
                                        />
                                    ),
                                    state: {
                                        setIsLoading,
                                        isLoading,
                                    },
                                }}
                            />
                        }
                    /> */}
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
