import { ReactElement, ReactNode } from "react";

interface IMolLoadAvailableChannelsProps {
    buttoWasClicked: boolean
    handleButtonClick: () => unknown
    LoadChannelResult: ReactNode
}

export const MolLoadAvailableChannels = ({
    buttoWasClicked,
    handleButtonClick,
    LoadChannelResult
}: IMolLoadAvailableChannelsProps): ReactElement => {
    return (
        <div>
            <div
                className={`flex items-center gap-[4px] cursor-pointer button_channel ${
                    buttoWasClicked ? "button_clicked" : ""
                }`}
                onClick={handleButtonClick}
            >
                <p> Canal{" "}</p>
                <div className="img_button">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 342 470"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M171 107V171L256.333 85.6667L171 0.333344V64.3333C76.7067 64.3333 0.333344 140.707 0.333344 235C0.333344 268.493 10.1467 299.533 26.7867 325.88L57.9333 294.733C48.44 276.92 43 256.653 43 235C43 164.28 100.28 107 171 107ZM315.213 144.12L284.067 175.267C293.56 193.08 299 213.347 299 235C299 305.72 241.72 363 171 363V299L85.6667 384.333L171 469.667V405.667C265.293 405.667 341.667 329.293 341.667 235C341.667 201.507 331.853 170.467 315.213 144.12Z"
                            fill="black"
                        />
                    </svg>
                </div>
                <br/>
            </div>
            {LoadChannelResult}
        </div>
    )
}