import { MolActiveBotCard } from "@mols/panel/MolActiveBotCard";
import { MolAddNewBotCard } from "@mols/panel/MolAddNewBotCard";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement } from "react";
import { BotWithActiveClientsCount } from "resources/api/server/contracts/ServerApiModel";

interface IOrgPanelActiveBotsCardProps {
    activeBots: BotWithActiveClientsCount[]
    className?: string
}

export const OrgPanelActiveBotsCard = ({ activeBots, className }: IOrgPanelActiveBotsCardProps): ReactElement => {
    const [selectedBotId, setSelectedBotId] = useLocalStorage<number>("@selected-bot")
    const handleChangeSelectedBot = (botId: number): void => {
        if (selectedBotId == botId) return
        setSelectedBotId(botId)
        location.reload()
    }
    return (
        <>
            <div className={
                "w-full min-w-fit md:w-[513px] h-[381px] gap-y-4 bg-white rounded-2xl flex flex-col pt-[35px] pb-[44px] md:pl-[34px] md:pr-[25px] "
                + (className ? className : "")
            }>
                <div className="px-2">
                    <div className="text-fuchsia-950 text-xl font-medium font-['Geologica'] leading-7">Meus bots ativos</div>
                </div>
                <div
                    id="active-bots"
                    className="flex gap-y-[12px] flex-col overflow-y-auto px-4 md:px-0">
                    {
                        activeBots.map(b => <MolActiveBotCard
                            key={b.createdAt.toString()}
                            isSelectable={b.botId != selectedBotId}
                            onSelect={handleChangeSelectedBot}
                            botId={b.botId}
                            createdAt={new Date(b.createdAt)}
                            membersCount={b.activeClientsCount}
                            name={b.botName}
                            isActive={selectedBotId === b.botId} // It determines if the bot is selected
                        />)
                    }
                    <MolAddNewBotCard/>
                </div>
            </div>
        </>
    )
}