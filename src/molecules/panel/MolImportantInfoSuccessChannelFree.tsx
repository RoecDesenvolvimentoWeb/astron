import { ReactElement } from "react";
export const MolImportantInfoSuccessChannelFree = (): ReactElement => {
  return (
    <>
      <div className="bg-[green] w-full max-w-[98%] text-white relative pr-2 rounded-r-md py-2">
        <div className="top-0 h-full w-[2px] bg-lilas-lv5 absolute" />
        <div className="pl-2 text-base md:text-lg flex items-center gap-[2rem] ml-[1rem]">
          <div className="">
            <svg
              width="40"
              height="40"
              viewBox="0 0 440 440"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M367.429 173.714C367.429 168.381 365.714 164 362.286 160.571L336.286 134.857C332.667 131.238 328.381 129.429 323.429 129.429C318.476 129.429 314.19 131.238 310.571 134.857L194 251.143L129.429 186.571C125.81 182.952 121.524 181.143 116.571 181.143C111.619 181.143 107.333 182.952 103.714 186.571L77.7143 212.286C74.2857 215.714 72.5714 220.095 72.5714 225.429C72.5714 230.571 74.2857 234.857 77.7143 238.286L181.143 341.714C184.762 345.333 189.048 347.143 194 347.143C199.143 347.143 203.524 345.333 207.143 341.714L362.286 186.571C365.714 183.143 367.429 178.857 367.429 173.714ZM439.429 220C439.429 259.81 429.619 296.524 410 330.143C390.381 363.762 363.762 390.381 330.143 410C296.524 429.619 259.81 439.429 220 439.429C180.19 439.429 143.476 429.619 109.857 410C76.2381 390.381 49.619 363.762 30 330.143C10.381 296.524 0.571426 259.81 0.571426 220C0.571426 180.19 10.381 143.476 30 109.857C49.619 76.2381 76.2381 49.619 109.857 30C143.476 10.381 180.19 0.571426 220 0.571426C259.81 0.571426 296.524 10.381 330.143 30C363.762 49.619 390.381 76.2381 410 109.857C429.619 143.476 439.429 180.19 439.429 220Z"
                fill="#fff"
              />
            </svg>
          </div>
          <div className="content">
            <p className="text-base text-[#fff]">Status da configuração</p>
            <p className="text-base text-[#fff]">
              Parece estar tudo certo com a configuração.
              <br />
              Quando algum membro solicitar para entrar em seu canal free, ele
              será respondido e aceito de acordo com a configuração.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
