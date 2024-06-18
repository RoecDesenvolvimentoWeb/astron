import { AtomLoading } from "@atom/AtomLoading";
import { AtomTitle } from "@atom/AtomTitle";
import { MolMainContentWrapper } from "@mols/panel/MolMainContentWrapper";
import { MolProfileCard } from "@mols/panel/MolProfileCard";
import { useLocalStorage } from "@uidotdev/usehooks";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ServerApi } from "resources/api/server/ServerApi";
import {
  Profile,
  UserBasics,
} from "resources/api/server/contracts/ServerApiModel";
import { calcPercent } from "utils/percentageChange";
import { IDefaultProps } from "../default-props-main_content";
import loadPageResoucers from "../loadPageResoucers";
import { OrgGraphSalesBase, TSaleMonth } from "./OrgGraphSalesBase";
import { OrgStatistics } from "./OrgStatistics";
import { OrgWelcomeCard } from "./OrgWelcomeCard";

interface IOrgPanelMainContentProps extends IDefaultProps {
  className?: string;
}

interface Sales {
  sales: {
    [saleMonth in TSaleMonth]: number;
  };
}

const serverApi = new ServerApi();

// That will be responsible to wrap the principal content in painel depending on path

const getTotalSales = (data: Sales): number => {
  let totalSales = 0;
  for (const value of Object.values(data.sales)) {
    totalSales += value;
  }
  return totalSales;
};

interface MonthSales {
  name: string;
  salesCount: number;
}

const brKeyMonthMap: {
  [Property in keyof Sales["sales"]]: string;
} = {
  apr: "Abril",
  aug: "Agosto",
  jan: "Janeiro",
  mar: "Março",
  may: "Maio",
  feb: "Fevereiro",
  jun: "Junho",
  jul: "Julho",
  sep: "Setembro",
  oct: "Outubro",
  nov: "Novembro",
  dec: "Dezembro",
};

const findBiggestSalesMonth = (date: Sales): MonthSales => {
  let biggest: MonthSales = {
    name: "",
    salesCount: 0,
  };
  for (const x of Object.keys(date.sales)) {
    if (biggest.salesCount < date.sales[x as keyof Sales["sales"]]) {
      biggest = {
        name: brKeyMonthMap[x as keyof Sales["sales"]],
        salesCount: date.sales[x as keyof Sales["sales"]],
      };
    }
  }
  return biggest;
};

const getCurrentMonthSales = (date: Sales): number => {
  let monthSales = 0;
  const todayMonthName = new Date().toLocaleDateString("pt-BR", {
    month: "long",
  });
  for (const x of Object.keys(date.sales)) {
    if (
      brKeyMonthMap[x as keyof Sales["sales"]].toLowerCase() === todayMonthName
    ) {
      monthSales = date.sales[x as keyof Sales["sales"]];
    }
  }
  return monthSales;
};

const getSalesPreviousMonth = (date: Sales): number => {
  let previousMonthSales = 0;
  const todayMonthName = new Date().toLocaleDateString("pt-BR", {
    month: "long",
  });
  for (const x of Object.keys(date.sales)) {
    if (
      brKeyMonthMap[x as keyof Sales["sales"]].toLowerCase() === todayMonthName
    ) {
      const previousMonthIndex = Object.keys(date.sales).indexOf(x) - 1;
      if (previousMonthIndex == -1) {
        previousMonthSales = 0;
      } else {
        const result = Object.values(date.sales).find(
          (_, i) => i == previousMonthIndex
        );
        previousMonthSales = result as number;
      }
    }
  }
  return previousMonthSales;
};

export const OrgPanelMainContentDashboard = ({
  className,
  setIsLoading,
}: IOrgPanelMainContentProps): ReactElement => {
  const [salesToday, setSalesToday] = useState(0);
  const [userProfile, setUserProfile] = useState<Profile | null>(null);
  const [userInfo, setUserInfo] = useState<UserBasics | null>(null);
  const [activeMemberCount, setActiveMemberCount] = useState(0);
  const [activeBotsCount, setActiveBotsCount] = useState(0);
  const [selectedBotId] = useLocalStorage<number>("@selected-bot");
  const [sales, setSales] = useState<{
    sales: {
      [saleMonth in TSaleMonth]: number;
    };
  }>({
    sales: {
      apr: 0,
      aug: 0,
      dec: 0,
      feb: 0,
      jan: 0,
      jul: 0,
      jun: 0,
      mar: 0,
      may: 0,
      nov: 0,
      oct: 0,
      sep: 0,
    },
  });
  const loadSalesWholeYear = async (): Promise<void> => {
    if (selectedBotId == null) return;
    await serverApi.loadDashboardChart(selectedBotId).then((result) => {
      if (result.data.success) {
        const sales = result.data.data;
        setSales({
          sales: {
            jan: Number(sales.january.toFixed(2)),
            feb: Number(sales.february.toFixed(2)),
            mar: Number(sales.march.toFixed(2)),
            apr: Number(sales.april.toFixed(2)),
            jul: Number(sales.july.toFixed(2)),
            jun: Number(sales.june.toFixed(2)),
            sep: Number(sales.september.toFixed(2)),
            aug: Number(sales.august.toFixed(2)),
            dec: Number(sales.december.toFixed(2)),
            nov: Number(sales.november.toFixed(2)),
            oct: Number(sales.october.toFixed(2)),
            may: Number(sales.may.toFixed(2)),
          },
        });
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const loadSalesToday = async (): Promise<void> => {
    if (selectedBotId == null) return;
    await serverApi.loadTotalSalesCurrentDay(selectedBotId).then((result) => {
      if (result.data.success) {
        const salesToday = result.data.data;
        setSalesToday(salesToday);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const loadUserProfile = async (): Promise<void> => {
    await serverApi.getUserProfile().then((result) => {
      if (result.data.success) {
        const profile = result.data.data;
        setUserProfile(profile as Profile | null);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const loadUserBasicInfo = async (): Promise<void> => {
    await serverApi.getUserInfo().then((result) => {
      if (result.data.success) {
        const userInfo = result.data.data;
        setUserInfo(userInfo as UserBasics);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const loadActiveMembersCount = async (): Promise<void> => {
    await serverApi.getActiveMemebersCount().then((result) => {
      if (result.data.success) {
        const activeMemebersCount = result.data.data;
        setActiveMemberCount(activeMemebersCount as number);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };

  const loadActiveBotsCount = async (): Promise<void> => {
    await serverApi.getActiveBotsCount().then((result) => {
      if (result.data.success) {
        const activeBotsCount = result.data.data;
        setActiveBotsCount(activeBotsCount as number);
        return;
      }
      toast.error(
        (result.data.data as { message?: string })?.message ??
          "Ocorreu um erro ao buscar as informações"
      );
    });
  };
  useEffect(() => {
    loadPageResoucers(
      setIsLoading,
      loadSalesToday(),
      loadSalesWholeYear(),
      loadUserProfile(),
      loadUserBasicInfo(),
      loadActiveMembersCount(),
      loadActiveBotsCount()
    ).catch(() => {});
  }, []);
  return (
    <>
      <MolMainContentWrapper className={className}>
        <AtomTitle title="Dashboard" />
        <div className="flex md:flex-row flex-col gap-[42px]">
          <div className="flex flex-col gap-y-[25px]">
            <div className="min-w-[320px] overflow-x-auto h-full flex flex-col items-start justify-start gap-y-[25px]">
              <OrgWelcomeCard username={userProfile?.name ?? ""} />
            </div>
            <div className="w-full bg-white rounded-[16px] p-[20px] relative">
              {sales ? (
                <OrgGraphSalesBase
                  totalSalesToday={salesToday}
                  sales={sales.sales}
                />
              ) : (
                <div className="flex flex-col justify-between relative">
                  <span className="pt-2 pl-12">Carregando vendas</span>
                  <AtomLoading isInView={!sales} />
                </div>
              )}
            </div>
          </div>
          <div
            className={
              "flex flex-col min-w-[320px] md:min-w-fit md:min-h-fit md:items-center items-start space-y-[24px]"
            }
          >
            <MolProfileCard
              name={userProfile?.name ?? ""}
              career={userProfile?.function ?? ""}
              botsActiveCount={activeBotsCount}
              totalSales={getTotalSales(sales)}
              createdDateYear={
                userInfo?.creteAt
                  ? new Date(userInfo.creteAt).getFullYear().toString()
                  : ""
              }
            />
            <OrgStatistics
              previousMonthSales={getSalesPreviousMonth(sales)}
              currentMonthSales={{
                sales: getCurrentMonthSales(sales),
                percent: calcPercent(
                  findBiggestSalesMonth(sales).salesCount,
                  getCurrentMonthSales(sales)
                ),
              }}
              biggestMonthSales={findBiggestSalesMonth(sales)}
              membersActiveCount={activeMemberCount}
            />
          </div>
        </div>
      </MolMainContentWrapper>
    </>
  );
};
