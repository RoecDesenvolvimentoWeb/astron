import { MolGlobalLoading } from "@mols/panel/MolGlobalLoading";
import { OrgPanelHeader } from "@org/panel/OrgPanelHeader";
import { OrgPanelLateralMenu } from "@org/panel/OrgPanelLateralMenu";
import { PanelTemplate } from "@temp/panel/PanelTemplate";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { ServerApi } from "resources/api/server/ServerApi";
import { BotWithActiveClientsCount } from "resources/api/server/contracts/ServerApiModel";

interface IPanelPageProps {
    resource: {
        mainContent: JSX.Element
        state: {
            setIsLoading: (s: boolean) => void
            isLoading: boolean
        }
    }
}

const serverApi = new ServerApi()

export const PanelPage = ({
    resource: {
        mainContent,
        state: {
            isLoading,
            setIsLoading
        }
    },
}: IPanelPageProps): ReactElement => {
    const location = useLocation();
    const locationRef = useRef<string>("")
    const [selectedBot, setSelectedBotId] = useLocalStorage<number | null>("@selected-bot", null)
    const md = useMediaQuery("(max-width: 768px)");

    const setRandomBotId = async (): Promise<void> => {
        if (selectedBot != null) return
        setIsLoading(true)
        await serverApi.getAllBotsWithActiveClientsCount()
            .then((result) => {
                if (result.data.success) {
                    const activeBots = result.data.data as BotWithActiveClientsCount[]
                    if (activeBots.length == 0) return
                    setSelectedBotId((activeBots)[0].botId)
                    window.location.reload()
                    return
                }
                toast.error(
                    (result.data.data as { message?: string })?.message ?? "Ocorreu um erro ao buscar as informações"
                );
            })
            .catch(() => {})
            .finally(() => {
                setIsLoading(true)
            })
    }

    useEffect(() => {
        window.scrollTo({
            top: 0
        })
    }, [mainContent.type.name]);

    useEffect(() => {
        setRandomBotId()
            .catch(() => {})
        locationRef.current = location.pathname
        document.body.style.overflowX = "hidden"
        return () => {
            document.body.style.overflowX = "auto"
        }
    }, [])

    return (
        <PanelTemplate
            molGlobalLoading={isLoading ? <MolGlobalLoading/> : <></>}
            orgPanelLateralMenu={!md ? <OrgPanelLateralMenu className={"z-10"}/> : <></>}
            orgPanelHeader={<OrgPanelHeader
                className={
                    "w-full overflow-y-hidden min-w-fit !h-[79px] !min-h-[79px] z-40"
                }
            />}
            mainContent={mainContent}
        />
    );
};
