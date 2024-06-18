import { AtomBtn } from "@atom/AtomBtn";
import { AtomTitle } from "@atom/AtomTitle";
import { IFormDataWithGroupId, MolFormCreateUpdateFreeChannel } from "@mols/panel/MolFormCreateUpdateFreeChannel";
import { MolFreeChannelHowWorks } from "@mols/panel/MolFreeChannelHowWorks";
import { MolImportantInfoChannelFree } from "@mols/panel/MolImportantInfoChannelFree";
import { MolImportantInfoSuccessChannelFree } from "@mols/panel/MolImportantInfoSuccessChannelFree";
import { MolLoadAvailableChannels } from "@mols/panel/MolLoadAvailableChannels";
import { MolLoadChannelResult } from "@mols/panel/MolLoadChannelResult";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import { IAvailableChannelToBecomeFree, IFreeChannelUsing } from "resources/api/server/contracts/ServerApiModel";
import { commonPromiseHandle } from "../commonPromiseHandle";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import "./style.css";

interface IOrgPanelMainCreateChannelFreeProps extends IDefaultProps {}

const serverApi = new ServerApi()

export const OrgPanelMainCreateChannelFree = ({
    setIsLoading,
}: IOrgPanelMainCreateChannelFreeProps): ReactElement => {
    const [loadingChannels, setLoadingChannels] = useState(false);
    const [popupVisible, setPopupVisible] = useState(false); // Est
    const [freeChannelInUse, setFreeChannelInUse] = useState<IFreeChannelUsing | null>(null)
    const [freeChannelSelected, setFreeChannelSelected] = useState<number>()
    const [channelsAvailableToBecomeFree, setChannelsAvailableToBecomeFree] = useState<IAvailableChannelToBecomeFree[]>([])
    const [selectedBotId] = useLocalStorage<number | null>("@selected-bot", null)

    const handleLoadChannels = (): void => {
        if (selectedBotId == null) {
            toast.error("Nenhum bot selecionado")
            return
        }
        setLoadingChannels(true);
        const prom = serverApi.getAvailableChannelsToBecomeFree(Number(selectedBotId))
        commonPromiseHandle(
            prom,
            setChannelsAvailableToBecomeFree,
            "Não foi possível carregar os canais free"
        )
            .catch(() => {})
            .finally(() => {
                setTimeout(() => {
                    setLoadingChannels(false);
                }, 1000); // Reset the button after 1 second
            })
    };

    const loadFreeChannelInUse = async (): Promise<void> => {
        if (selectedBotId == null) {
            toast.error("Nenhum bot selecionado")
            return
        }
        const prom = serverApi.getFreeChannelInUse(Number(selectedBotId))
        await commonPromiseHandle(
            prom,
            setFreeChannelInUse
        )
    };

    const createUpdateFreeChannel = async (data: IFormDataWithGroupId): Promise<void> => {
        if (selectedBotId == null) {
            toast.error("Nenhum bot selecionado")
            return
        }
        const prom = serverApi.createOrUpdateFreeChannel(Number(selectedBotId), {
            groupId: data.groupId,
            message: data.welcomeMessage,
            timeToAccept: data.timeToAccept
        })
        await commonPromiseHandle(
            prom,
            undefined,
            "Não foi possível criar/atualizar o canal/grupo free",
            "Grupo/canal free criado/atualizado com sucesso",
            undefined,
            () => {
                setTimeout(() => {
                    location.reload()
                }, 1000)
            }
        )
    }

    const togglePopup = (): void => {
        setPopupVisible(!popupVisible); // Alternar a visibilidade do popup
    };

    useEffect(() => {
        loadPageResoucers(
            setIsLoading,
            loadFreeChannelInUse(),
            new Promise(resolve => resolve(handleLoadChannels()))
        )
            .catch(() => {})
    }, [])

    useEffect(() => {
        setFreeChannelSelected(freeChannelSelected != null ? freeChannelSelected : freeChannelInUse != null ? Number(freeChannelInUse.groupId) : undefined)
    }, [freeChannelInUse])

    return (
        <>
            <MolMainContentWrapper>
                <div className="flex items-center justify-between w-[100%] max-w-[98%]">
                    <AtomTitle className="" title="Canal Free" />
                    <AtomBtn onClick={togglePopup} className="!py-[10px] !px-[20px] bg-[#D25AC4] !rounded-[4px] !mt-[20px] text-[#fff] !w-[250px !min-h-fit]">Como funciona</AtomBtn>
                </div>

                {/* Mensagens de aviso */}
                {(freeChannelInUse == null && channelsAvailableToBecomeFree.length == 0) &&
                    <MolImportantInfoChannelFree />
                }
                {(freeChannelInUse != null) &&
                    <MolImportantInfoSuccessChannelFree />
                }

                {/* Form */}
                <MolLoadAvailableChannels
                    buttoWasClicked={loadingChannels}
                    handleButtonClick={handleLoadChannels}
                    LoadChannelResult={<MolLoadChannelResult
                        selectedChannelId={freeChannelSelected}
                        onSelectOrUnselectFreeChannelToBecomeFree={(channel): void => {
                            if (freeChannelSelected === Number(channel.groupId)) {
                                setFreeChannelSelected(undefined)
                                return
                            }
                            setFreeChannelSelected(Number(channel.groupId))
                        }}
                        data={channelsAvailableToBecomeFree}
                    />}
                />
                <MolFormCreateUpdateFreeChannel
                    onSubmit={createUpdateFreeChannel}
                    groupId={freeChannelSelected}
                    data={freeChannelInUse ? {
                        timeToAccept: Number(freeChannelInUse.timeToAccept),
                        welcomeMessage: freeChannelInUse.message
                    } : undefined}
                />
                {/* Form */}

                {popupVisible && (
                    <div className="pop_up_help absolute top-0 left-0 h-[100vh] w-full">
                        <MolFreeChannelHowWorks
                            togglePopup={togglePopup}
                        />
                    </div>
                )}
            </MolMainContentWrapper>
        </>
    );
};
