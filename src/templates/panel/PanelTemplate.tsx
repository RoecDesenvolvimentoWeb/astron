import { ReactElement } from "react";

interface IPanelTemplateProps {
    molGlobalLoading: ReactElement
    orgPanelLateralMenu: ReactElement
    orgPanelHeader: ReactElement
    mainContent: ReactElement
}

export const PanelTemplate = ({
    molGlobalLoading,
    orgPanelHeader,
    mainContent,
    orgPanelLateralMenu
}: IPanelTemplateProps): ReactElement => {
    return (
        <div className="bg-white min-w-full h-full sm:min-h-screen sm:h-screen overflow-x-auto flex flex-row">
            {molGlobalLoading}
            {orgPanelLateralMenu}
            <div className="flex flex-col max-md:px-[10px] max-md:mr-[0] w-full flex-1 md:pl-[24px] pr-2 sm:pt-[20px] md:pr-0 rounded-[8px] my-[18px] mr-[16px] bg-[#F6F8F9] overflow-x-auto scroll-smooth overflow-y-auto max-1sm:overflow-hidden">
                {orgPanelHeader}
                {mainContent}
            </div>
        </div>
    )
}