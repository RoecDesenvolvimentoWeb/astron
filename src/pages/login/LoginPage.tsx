import { OrganismLogin } from "@org/login/OrganismLogin";
import { LoginTemplate } from "@temp/login/LoginTemplate";
import { ReactElement } from "react";

export const LoginPage = (): ReactElement => {
    return <LoginTemplate
        orgLogin={<OrganismLogin/>}
        title={<title>Login</title>}
    />
}
