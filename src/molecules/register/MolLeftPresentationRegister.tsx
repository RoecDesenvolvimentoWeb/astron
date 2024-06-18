import image from "@asset/registerpres.png";
import { ReactElement } from "react";

export const MolLeftPresentationRegister = (): ReactElement => {
    return (
        <>
            <img
                className={
                    "w-1/2 h-[763px]  max-w-[768px] object-contain radius-[40px] max-lg:hidden"
                }
                src={image}
            />
        </>
    );
};
