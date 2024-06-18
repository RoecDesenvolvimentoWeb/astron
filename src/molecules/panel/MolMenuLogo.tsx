import menuLogo from "@asset/menulogo.png";
import menuLogoHover from "@asset/menulogohover.png";
import { ReactElement } from "react";

interface IMenuLogoProps {
    logo: "hover" | "nohover"
}

export const MolMenuLogo = ({ logo }: IMenuLogoProps): ReactElement => {
    return (
        <>
            <img
                className={logo === "hover" ? "w-[10rem] max-h-[3.2rem] min-h-[3.2rem]" : "w-[3.2rem] min-h-[3.2rem] max-h-[3.2rem]"}
                src={logo === "hover" ? menuLogoHover  : menuLogo}/>
        </>
    )
}