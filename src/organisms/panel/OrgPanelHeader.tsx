import userImageActive from "@asset/active-bot-icon.svg";
import userImage from "@asset/bot-icon.svg";
import userImageInactive from "@asset/inactive-bot-icon.svg";
import { MolAdvices } from "@mols/panel/MolAdvice";
import { MolNotification } from "@mols/panel/MolNotification";
import { MolProfileMenu } from "@mols/panel/MolProfileMenu";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import {
  BotWithActiveClientsCount,
  UserBasics,
} from "resources/api/server/contracts/ServerApiModel";
import { OrgPanelLateralMenu } from "./OrgPanelLateralMenu";
import { OrgPanelActiveBotsCard } from "./main/bot/creation/OrgPanelActiveBotsCard";
import { commonPromiseHandle } from "./main/commonPromiseHandle";
import { IMolMeta } from "@mols/panel/MolMeta";

interface IOrgPanelHeader {
  className?: string;
}

const serverApi = new ServerApi();

export const OrgPanelHeader = ({
  className,
}: IOrgPanelHeader): ReactElement => {
  const [userProfile, setUserProfile] = useState<UserBasics | null>(null);
  const [activeSection, setActiveSection] = useState({
    botSelection: false,
  });
  const [bots, setBots] = useState<BotWithActiveClientsCount[]>([]);

  const loadUserBasicInfo = async (): Promise<void> => {
    await serverApi.getUserInfo().then((result) => {
      if (result.data.success) {
        const userInfo = result.data.data;
        setUserProfile(userInfo as UserBasics);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const loadPageResources = async (): Promise<void> => {
    try {
      await Promise.all([loadUserBasicInfo()]);
    } catch (e) {
      console.error(e);
      toast.error("Não foi possível carregar as informações");
    }
  };

  const loadBots = async (): Promise<void> => {
    const prom = serverApi.getAllBotsWithActiveClientsCount();
    await commonPromiseHandle<BotWithActiveClientsCount[]>(prom, setBots);
  };

  useEffect(() => {
    loadPageResources().catch(() => {});
    loadBots().catch(() => {});
  }, []);
  const md = useMediaQuery("(max-width: 768px)");
  return (
    <>
      <div className="flex flex-row justify-around pr-6 sm:pr-[20px] max-sm:pt-[20px] max-md:flex-row-reverse max-md:justify-between md:justify-between md:pr-0 w-full sm:mt-4 md:mt-0 fixed md:sticky top-0 z-[20]">
        <div className="flex flex-col items-center justify-center">
          {md && <OrgPanelLateralMenu />}
        </div>
        <div
          className={
            "min-h-fit py-2 pl-4 min-w-[500px] w-fit flex flex-row justify-end space-x-[15px] md:space-x-10 overflow-x-auto my-1 p-2 items-center " +
            className
          }
        >
          <IMolMeta />
          <MolNotification count={0} />
          <MolAdvices count={0} />
          <MolProfileMenu
            changeBotSelecionStatus={(): void => {
              setActiveSection({
                ...activeSection,
                botSelection: !activeSection.botSelection,
              });
            }}
            userName={userProfile?.name ?? ""}
            isActive={activeSection.botSelection}
            userImage={userImage}
            userImageInactive={userImageInactive}
            userImageActive={userImageActive}
          />
          {activeSection.botSelection && (
            <div className="fixed right-5 md:right-[8.1rem] top-[100px] md:top-[120px] w-[320px] md:w-[400px]">
              <OrgPanelActiveBotsCard
                className={"shadow-lg"}
                activeBots={bots}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
