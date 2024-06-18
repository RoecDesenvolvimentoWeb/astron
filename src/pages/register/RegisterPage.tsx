import { OrganismRegister } from "@org/register/OrganismRegister";
import { RegisterTemplate } from "@temp/register/RegisterTemplate";
import { ReactElement, useEffect } from "react";

export const RegisterPage = (): ReactElement => {
    useEffect(() => {
        if (window.location.pathname.endsWith("/register")) {
            document.body.classList.add("max-md:overflow-x-hidden");

            return () => {
                document.body.classList.remove("max-md:overflow-x-hidden");
            };
        }
    }, []);
    return (
        <RegisterTemplate
            title={<title>Registro</title>}
            orgRegister={<OrganismRegister />}
        />
    );
};
