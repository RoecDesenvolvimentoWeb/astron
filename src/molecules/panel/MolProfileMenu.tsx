import { AtomCard } from "@atom/AtomCard";
import { AtomClientProfileImage } from "@atom/AtomClientProfileImage";
import { useMediaQuery } from "hooks/useMediaQuery";
import { ReactElement } from "react";

interface IMolProfileProps {
  userImageActive: string;
  userImageInactive: string;
  userImage: string;
  userName: string;
  isActive: boolean;
  changeBotSelecionStatus: () => unknown;
}

export const MolProfileMenu = ({
  userImageActive,
  userImageInactive,
  userImage,
  userName,
  changeBotSelecionStatus,
  isActive,
}: IMolProfileProps): ReactElement => {
  const md = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <div
        onClick={changeBotSelecionStatus}
        className="h-[100%] cursor-pointer select-none px-[16px] max-h-[60px] md:max-h-none drop-shadow-md bg-white rounded-[20px] max-md:flex max-md:items-center justify-center flex items-center"
      >
        <AtomCard className={"flex-row space-x-[2px] max-h-[66px]"}>
          <AtomClientProfileImage className={"w-[45px]"} imgSrc={userImage} />
          {!md && (
            <>
              <span className="font-light text-[18px] leading-[140%]">
                {userName.length > 15
                  ? userName.slice(0, 15).trim() + "..."
                  : userName}
              </span>
            </>
          )}
          <div className="h-full flex flex-col justify-center items-center">
            <img
              width={20}
              src={isActive ? userImageActive : userImageInactive}
            />
          </div>
        </AtomCard>
      </div>
    </>
  );
};
