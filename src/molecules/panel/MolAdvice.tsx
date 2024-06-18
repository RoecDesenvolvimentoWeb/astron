import { AtomCard } from "@atom/AtomCard";
import { ReactElement } from "react";

interface IMolAdviceProps {
  count: number;
}

export const MolAdvices = ({ count = 0 }: IMolAdviceProps): ReactElement => {
  return (
    <>
      <div className="h-[100%] min-w-[60px] max-h-[60px] md:max-h-none md:max-w-none  flex justify-center items-center min-fit-[82px] drop-shadow-md bg-white rounded-[20px]">
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
            <div className={"mt-2 mr-[0.15rem]"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="33"
                height="32"
                viewBox="0 0 33 32"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M16.3559 3.35229C10.4435 3.35229 7.87459 8.70595 7.87459 12.245C7.87459 14.8901 8.25808 14.1117 6.79395 17.3383C5.00601 21.9364 12.1959 23.8158 16.3559 23.8158C20.5146 23.8158 27.7044 21.9364 25.9178 17.3383C24.4536 14.1117 24.8371 14.8901 24.8371 12.245C24.8371 8.70595 22.267 3.35229 16.3559 3.35229Z"
                  stroke="#505050"
                  stroke-width="2.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M19.4354 27.3496C17.7097 29.2772 15.0176 29.3001 13.2754 27.3496"
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
