import { ReactElement } from "react";

interface IMolGraphSalesCountTodayProps {
  salesCount: number;
}

export const MolGraphSalesCountTodays = (
  props: IMolGraphSalesCountTodayProps
): ReactElement => {
  return (
    <>
      <div className="flex flex-col pb-4 md:pb-0">
        <div>
          <p className="font-normal text-[#8A8D8F] text-[16px] font-geo">
            Total de vendas hoje
          </p>
        </div>
        <div>
          <p
            className={
              "text-[#32063D] text-[30px] sm:text-[35px] md:text-[40px] font-normal mb-[20px]"
            }
          >
            <span>$</span> {props.salesCount}
          </p>
        </div>
      </div>
    </>
  );
};
