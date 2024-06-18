import { ReactElement } from "react";
import { IAvailableChannelToBecomeFree } from "resources/api/server/contracts/ServerApiModel";

interface IMolLoadChannelResultProps {
    selectedChannelId?: number
    data: IAvailableChannelToBecomeFree[]
    onSelectOrUnselectFreeChannelToBecomeFree: (data: IAvailableChannelToBecomeFree) => unknown
}

export const MolLoadChannelResult = ({
    data,
    selectedChannelId,
    onSelectOrUnselectFreeChannelToBecomeFree
}: IMolLoadChannelResultProps): ReactElement => {
    return (
        <div>
            {
                data.length == 0 ?
                    <div className="channel_results py-[.4rem] px-[.8rem] bg-[#dadada] max-w-[98%] rounded-[4px] flex items-center gap-[8px] mt-[1rem]">
                        Não encontrado, adicione o bot no canal ou clique no icone acime
                        para procurar o seu canal
                    </div>
                    :
                    <>
                        <p className="pt-2">Selecione o canal desejado abaixo:</p>
                        <div className="h-[50px] max-h-[50px] rounded-md">
                            <ul className="h-full overflow-y-auto space-y-2 rounded-md">
                                {
                                    data.map(avChannelToBecomeFree => (
                                        <>

                                            <li
                                                onClick={(): void => {
                                                    onSelectOrUnselectFreeChannelToBecomeFree(avChannelToBecomeFree)
                                                }}
                                                className={`${selectedChannelId === Number(avChannelToBecomeFree.groupId) ? "bg-pink-500" : "bg-gray-500"} hover:bg-gray-600 cursor-pointer text-white px-2 py-1 rounded-md`}
                                                key={String(avChannelToBecomeFree.groupId)}>
                                                <p>{avChannelToBecomeFree.groupName} - {avChannelToBecomeFree.groupId}</p>
                                            </li>
                                        </>
                                    ))
                                }
                            </ul>
                        </div>
                    </>
            }
        </div>
    )
}