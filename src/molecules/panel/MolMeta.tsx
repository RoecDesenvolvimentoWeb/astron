import { ReactElement } from "react";

export const IMolMeta = () => {
  return (
    <>
      <div className="bar_wrapper_total flex items-end flex-col gap-[4px]">
        <div className="flex gap-[10px]">
          <span className="font-bold">R$ 50k</span>/
          <span className="font-bold">R$100k</span>
        </div>
        <div className="flex items-center gap-[4px]">
          <div className="icon_meta">
            <img
              src="https://dashboard.kiwify.com.br/_nuxt/img/gemstone.a682e87.svg"
              alt=""
            />
          </div>
          <div className="bar_wrapper w-[250px] h-[10px] bg-[#f0f0f0] rounded-full relative overflow-hidden">
            <div className="bar absolute left-[0] top-[0] bg-[#D25AC4] w-[50%] h-[100%] rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};
