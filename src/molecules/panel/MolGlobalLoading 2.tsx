import { ReactElement } from "react";

export const MolGlobalLoading = (): ReactElement => {
    return (
        <div
            className={"w-screen h-screen bg-[#F6F8F9] absolute top-0 left-0 z-[200] flex items-center justify-center"}
        >
            <div
                className={"rounded-full w-[100px] h-[100px] bg-gradient-to-tr border-[8px] border-lilas-lv1 border-t-lilas-lv3 animate-[spin_500ms_linear_infinite]"}
            />
        </div>
    )
}