import { MolGraphSalesCountTodays } from "@mols/panel/MolGraphSalesCountToday";
import { MolGraphSalesFilter } from "@mols/panel/MolGraphSalesFilter";
import { MolLineValueGraph } from "@mols/panel/MolLineValueGraph";
import { ReactElement } from "react";
import { OrgRectGraphSales } from "./OrgRectGraphSales";
import { Horizontalchart } from "@mols/panel/chart-horizontal";

// 255px - 100k+

// 0px - 0k

export type TSaleMonth =
  | "jan"
  | "feb"
  | "mar"
  | "apr"
  | "may"
  | "jun"
  | "jul"
  | "aug"
  | "sep"
  | "oct"
  | "nov"
  | "dec";

interface IOrgGraphSalesBaseProps {
  sales: {
    [saleMonth in TSaleMonth]: number;
  };
  totalSalesToday: number;
}

export const OrgGraphSalesBase = (
  props: IOrgGraphSalesBaseProps
): ReactElement => {
  const {
    // jan: janSales,
    // feb: febSales,
    // mar: marchSales,
    // jul: julSales,
    // jun: junSales,
    // sep: sepSales,
    // dec: decSales,
    // nov: novSales,
    // oct: octSales,
    // aug: augSales,
    // may: maySales,
    // apr: aprSales,
  } = props.sales;
  const getHeightBySalesValue = (value: number): string => {
    if (value > 100000) {
      return "255px";
    }
    if (value > 50000) {
      return `${85 + (85 * 2 * value) / 100000}px`;
    }
    if (value > 15000) {
      return `${85 + (85 * value) / 50000}px`;
    }
    const calcTwo = (85 * value) / 15000;
    return `${calcTwo}px`;
  };
  return (
    <>
      <div
        className={
          "rounded-[16px] bg-white font-geo w-full max-w-[829px] h-[fit-content] flex-shrink-0 flex-col justify-start items-start"
        }
      >
        <div
          className={
            "flex flex-row flex-wrap-reverse items-center gap-x-10 md:gap-x-[301px] w-full h-fit pt-4 md:pt-0"
          }
        >
          <span
            className={"text-[20px] sm:text-[25px] md:text-[28px] font-normal"}
          >
            Vendas realizadas
          </span>
          {/* <MolGraphSalesFilter /> */}
        </div>
        <div className="">
          <MolGraphSalesCountTodays
            salesCount={Number(props.totalSalesToday.toFixed(2))}
          />
        </div>
        <Horizontalchart />
        {/* <div className="mx-[57px] relative flex flex-row items-end space-x-[15px] h-[255px] max-h-[255px]">
          <div className="absolute top-0 left-0 w-full h-full min-w-full min-h-full flex flex-col justify-between">
            <MolLineValueGraph value="100" />
            <MolLineValueGraph value="50" />
            <MolLineValueGraph value="15" />
            <MolLineValueGraph value="0" />
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(janSales)}
              salesCount={janSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Jan
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(febSales)}
              salesCount={febSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Feb
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(marchSales)}
              salesCount={marchSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Mar
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(aprSales)}
              salesCount={aprSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Apr
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(maySales)}
              salesCount={maySales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              May
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(junSales)}
              salesCount={junSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Jun
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(julSales)}
              salesCount={julSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Jul
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(augSales)}
              salesCount={augSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Aug
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(sepSales)}
              salesCount={sepSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Sep
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(octSales)}
              salesCount={octSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Oct
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(novSales)}
              salesCount={novSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Nov
            </div>
          </div>
          <div className="flex flex-col items-center relative">
            <OrgRectGraphSales
              height={getHeightBySalesValue(decSales)}
              salesCount={decSales}
            />
            <div className="text-neutral-400 text-xs font-light font-['Geologica'] absolute -bottom-5">
              Dec
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
