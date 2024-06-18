import { AtomTitle } from "@atom/AtomTitle";
import {
  BotCreationOut,
  MolFormBotCreation,
} from "@mols/panel/MolFormBotCreation";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import {
  BotWithActiveClientsCount,
  errors,
} from "resources/api/server/contracts/ServerApiModel";
import { IDefaultProps } from "../../default-props-main_content";
import loadPageResoucers from "../../loadPageResoucers";
import { OrgPanelActiveBotsCard } from "./OrgPanelActiveBotsCard";
import { OrgPanelBoostSales } from "./OrgPanelBoostSales";
import { OrgPanelNotActiveBotsCard } from "./OrgPanelNotActiveBotsCard";

interface IOrgPanelMainContentBotCreationProps extends IDefaultProps {
  className?: string;
}

const serverApi = new ServerApi();

export const OrgPanelMainContentBotCreation = (
  props: IOrgPanelMainContentBotCreationProps
): ReactElement => {
  const [activeBots, setActiveBots] = useState<BotWithActiveClientsCount[]>([]);

  const loadBots = async (): Promise<void> => {
    await serverApi.getAllBotsWithActiveClientsCount().then((result) => {
      if (result.data.success) {
        const activeBots = result.data.data;
        setActiveBots(activeBots as BotWithActiveClientsCount[]);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const createNewBot = (bot: BotCreationOut): void => {
    serverApi
      .createNewBot(bot)
      .then((result) => {
        if (result.data.success) {
          toast.success("Bot criado com sucesso");
        } else {
          if (result.data.code === errors.NOT_MATCHED) {
            toast.error(
              "Não foi possível realizar a criação do bot - ERRO NÃO IDENTIFICADO"
            );
          } else {
            toast.error(
              result.data.data.message ??
                "Não foi possível completar a operação. Tente novamente."
            );
          }
        }
      })
      .catch(() => {
        toast.error("Não foi possível completar a operação. Tente novamente.");
      });
  };

  const validateBot = (bot: BotCreationOut): void => {
    serverApi
      .validateBot(bot)
      .then((result) => {
        if (result.data.success) {
          toast.success("Bot validado com sucesso");
        } else {
          if (result.data.code === errors.NOT_MATCHED) {
            toast.error(
              "Não foi possível realizar a validação do bot - ERRO NÃO IDENTIFICADO"
            );
          } else {
            toast.error(
              result.data.data.message ??
                "Não foi possível completar a operação. Tente novamente."
            );
          }
        }
      })
      .catch(() => {
        toast.error("Não foi possível completar a operação. Tente novamente.");
      });
  };

  useEffect(() => {
    loadPageResoucers(props.setIsLoading, loadBots()).catch(() => {});
  }, []);
  return (
    <>
      <MolMainContentWrapper className={props.className}>
        <AtomTitle title="Criação do bot" />
        <div
          className={
            "flex flex-col gap-y-[42px] md:gap-y-0 md:gap-x-[42px] md:flex-row"
          }
        >
          <div className="w-full overflow-x-auto md:overflow-hidden md:min-w-fit">
            <MolFormBotCreation
              onValidate={validateBot}
              onCreate={createNewBot}
            />
          </div>
          <div className="flex flex-col w-full md:min-w-fit gap-y-[24px]">
            <div className="w-full min-w-[300px] h-fit overflow-x-auto overflow-y-hidden md:overflow-hidden">
              {activeBots.length > 0 ? (
                <OrgPanelActiveBotsCard activeBots={activeBots} />
              ) : (
                <OrgPanelNotActiveBotsCard />
              )}
            </div>
            <div className="min-h-fit min-w-[300px] overflow-x-auto overflow-y-hidden">
              <OrgPanelBoostSales />
            </div>
          </div>
        </div>
      </MolMainContentWrapper>
    </>
  );
};
