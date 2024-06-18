import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const daysInMonth = (year: number, month: number) =>
  new Date(year, month, 0).getDate();

const generateLabels = (startDate: Date, endDate: Date) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const labels: string[] = [];

  // Adiciona todos os dias entre a data inicial e a data final
  for (
    let date = new Date(start);
    date <= end;
    date.setDate(date.getDate() + 1)
  ) {
    labels.push(
      `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`
    );
  }

  return labels;
};

const generateRandomData = (length: number) => {
  const data: number[] = [];
  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * 100) + 1);
  }
  return data;
};

const options: {} = {
  indexAxis: "x",
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
  },
  title: {
    display: true,
    text: "Sua receita",
  },
};

const initialState = (startDate: Date, endDate: Date) => {
  const labels = generateLabels(startDate, endDate);
  const datasets = [
    {
      label: "Receita",
      data: generateRandomData(labels.length),
      borderColor: "rgba(73, 31, 80, 1)",
      backgroundColor: "rgba(73, 31, 80, 1)",
    },
    {
      label: "Vendas",
      data: generateRandomData(labels.length),
      borderColor: "#D25AC4",
      backgroundColor: "#D25AC4",
    },
  ];

  return { labels, datasets };
};

export const Horizontalchart: React.FC = () => {
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [filteredData, setFilteredData] = useState<any>(null);

  useEffect(() => {
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 6); // Subtrai 6 dias para obter a última semana

    setFilteredData(initialState(lastWeek, new Date()));
  }, []); // Chamada apenas uma vez no carregamento inicial

  const handleFilter = () => {
    if (startDate && endDate) {
      // Assuming startDate and endDate are Date objects
      const diffInDays = Math.ceil(
        (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      if (diffInDays <= 30) {
        const labels = generateLabels(startDate, endDate);
        const datasets = [
          {
            label: "Receita",
            data: generateRandomData(labels.length),
            borderColor: "rgba(73, 31, 80, 1)",
            backgroundColor: "rgba(73, 31, 80, 1)",
          },
          {
            label: "Vendas",
            data: generateRandomData(labels.length),
            borderColor: "#D25AC4",
            backgroundColor: "#D25AC4",
          },
        ];
        setFilteredData({ labels, datasets });
      } else {
        alert("O intervalo de datas não pode exceder 30 dias.");
      }
    } else {
      alert("Por favor, selecione uma data inicial e uma data final.");
    }
  };

  return (
    <div className="w-[100%]">
      <div className="flex gap-[40px] absolute top-[20px] right-[20px] calendar">
        <div className="flex items-center gap-[10px] ">
          <input
            type="date"
            value={startDate.toISOString().slice(0, 10)}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            className="p-[10px] bg-[#f1f1f1] rounded-full w-[140px]"
          />
          Até
          <input
            type="date"
            value={endDate.toISOString().slice(0, 10)}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            className="p-[10px] bg-[#f1f1f1] rounded-full w-[140px]"
          />
        </div>

        <button
          className="p-[10px] bg-[#f1f1f1] rounded-full w-[140px]"
          onClick={handleFilter}
        >
          Filtrar
        </button>
      </div>

      <div className="canva_wrapper" style={{ width: "100%", height: "100%" }}>
        {filteredData && <Bar data={filteredData} options={options} />}
      </div>
    </div>
  );
};
