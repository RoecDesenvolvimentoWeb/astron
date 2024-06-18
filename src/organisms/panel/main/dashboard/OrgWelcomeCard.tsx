import { MolWelcomeCard } from "@mols/panel/MolWelcomeCard";
import { ReactElement } from "react";

interface IOrgWelcomeCardProps {
    username: string
}

export const OrgWelcomeCard = ({ username}: IOrgWelcomeCardProps): ReactElement => {
    return (
        <>
            <MolWelcomeCard username={username}/>
        </>
    )
}