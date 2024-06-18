import { AtomCard } from "@atom/AtomCard";
import { ReactElement } from "react";

interface IMolNotificationProps {
  count: number;
}

export const MolNotification = ({
  count = 0,
}: IMolNotificationProps): ReactElement => {
  return (
    <>
      <div
        className={
          "min-w-[60px] max-h-[60px] md:max-h-none md:max-w-none flex items-center justify-center md:min-width-[82px] drop-shadow-md bg-white rounded-[20px] h-[100%]"
        }
      >
        <AtomCard>
          <div className={"relative text-white"}>
            <div
              className={"flex items-center justify-center absolute right-0"}
            >
              <div className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="57"
                  height="56"
                  viewBox="0 0 57 56"
                  fill="none"
                >
                  <g filter="url(#filter0_d_299_915)">
                    <circle cx="28.1953" cy="24" r="12" fill="#61296B" />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_299_915"
                      x="0.195312"
                      y="0"
                      width="56"
                      height="56"
                      filterUnits="userSpaceOnUse"
                      color-interpolation-filters="sRGB"
                    >
                      <feFlood flood-opacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="8" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0.435294 0 0 0 0 0.298039 0 0 0 0 0.643137 0 0 0 0.26 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_299_915"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_299_915"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </div>
              <span
                className={
                  "z-10 pb-2 font-geo text-[12px] font-normal text-center"
                }
              >
                {count > 99 ? "..." : count}
              </span>
            </div>
            <div className={"mt-2 mr-1"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
              >
                <path
                  d="M23.5885 12.0253C23.5885 12.0253 19.3085 17.1622 16.178 17.1622C13.0489 17.1622 8.7207 12.0253 8.7207 12.0253"
                  stroke="#505050"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M3.46484 15.9584C3.46484 6.84094 6.63945 3.80267 16.1633 3.80267C25.6871 3.80267 28.8617 6.84094 28.8617 15.9584C28.8617 25.0745 25.6871 28.1141 16.1633 28.1141C6.63945 28.1141 3.46484 25.0745 3.46484 15.9584Z"
                  stroke="#505050"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </AtomCard>
      </div>
    </>
  );
};
