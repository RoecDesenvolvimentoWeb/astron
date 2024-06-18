import { ReactElement } from "react";
export const MolImportantInfoChannelFree = (): ReactElement => {
    return (
        <>
            <div className="bg-[rgba(250,204,21)] max-w-[98%] text-white relative pr-2 rounded-r-md py-2">
                <div className="top-0 h-full w-[2px] bg-lilas-lv5 absolute" />
                <div className="pl-2 text-base md:text-lg flex items-center gap-[2rem] ml-[1rem]">
                    <div className="">
                        <svg
                            width="40"
                            height="40"
                            viewBox="0 0 428 428"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fill-rule="evenodd"
                                clip-rule="evenodd"
                                d="M214 427.333C331.824 427.333 427.333 331.824 427.333 214C427.333 96.176 331.824 0.666672 214 0.666672C96.176 0.666672 0.666656 96.176 0.666656 214C0.666656 331.824 96.176 427.333 214 427.333ZM192.667 128.667C192.667 123.009 194.914 117.583 198.915 113.582C202.916 109.581 208.342 107.333 214 107.333C219.658 107.333 225.084 109.581 229.085 113.582C233.086 117.583 235.333 123.009 235.333 128.667V214C235.333 219.658 233.086 225.084 229.085 229.085C225.084 233.086 219.658 235.333 214 235.333C208.342 235.333 202.916 233.086 198.915 229.085C194.914 225.084 192.667 219.658 192.667 214V128.667ZM235.333 299.333C235.333 304.991 233.086 310.418 229.085 314.418C225.084 318.419 219.658 320.667 214 320.667C208.342 320.667 202.916 318.419 198.915 314.418C194.914 310.418 192.667 304.991 192.667 299.333C192.667 293.675 194.914 288.249 198.915 284.248C202.916 280.248 208.342 278 214 278C219.658 278 225.084 280.248 229.085 284.248C233.086 288.249 235.333 293.675 235.333 299.333Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <div className="content">
                        <p className="text-base text-[#1d1d1d]">Status da configuração</p>
                        <p className="text-base text-[#1d1d1d]">
              O bot não conseguiu encontrar o canal free. Pode ser necessário
                            <br />
              remover e adicionar ele ao canal para aparecer aqui!
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};
