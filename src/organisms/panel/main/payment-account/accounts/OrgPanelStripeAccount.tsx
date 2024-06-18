import { MolPaymentAccountStripe } from "@mols/panel/MolPaymentAccountStripe";
import { ReactElement } from "react";

interface IOrgPanelStripeAccountProps {
    accessHref: string
    isBinded: boolean
    isActive: boolean
    isLoading: boolean
    onToggleStatus: (s: boolean) => unknown
    onBindOrUnbind: () => void
}

export const OrgPanelStripeAccount = ({
    onBindOrUnbind,
    onToggleStatus,
    isBinded,
    accessHref,
    isActive,
    isLoading
}: IOrgPanelStripeAccountProps): ReactElement => {
    return (
        <MolPaymentAccountStripe
            isLoadingAnything={isLoading}
            accessHref={accessHref}
            isActive={isActive}
            isBindind={isBinded}
            onBindOrUnbind={onBindOrUnbind}
            onToggleSatus={onToggleStatus}
        />
    )
}