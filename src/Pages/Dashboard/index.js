import { useState, useEffect } from "react";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DatePicker from "../../Components/Datepicker";
import Tile from "../../Components/StatTile";
import rawData from "../../static/data.json";
import { Line } from "react-chartjs-2";

import "./style.scss";
import Loader from "../../Components/Loader/index";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: {
      left: 8,
      right: 12,
    },
  },
  scales: {
    y: {
      gridLines: {
        tickMarkLength: 0,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 20,
        stepSize: 25,
        beginAtZero: false,
        drawTicks: false,
      },
      title: {
        color: "#8F909A",
        font: {
          size: 10,
          weight: 500,
        },
      },
      grid: {
        borderDash: [4, 5],
        color: "#E4E2E6",
        drawBorder: false,
        tickBorderDash: [4, 5],
        tickColor: "#E4E2E6",
      },
    },
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
    },
  },

  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      align: "start",
      color: "#000",
      display: true,
      padding: {
        top: 10,
        bottom: 10,
      },
      font: {
        size: 16,
        weight: 600,
        family: "Helvetica Neue",
      },
      text: "Product Trend by Month",
      tooltip: {
        enabled: true,
        events: ["mousemove", "mouseout", "click", "touchstart", "touchmove"],
      },
    },
  },
};

const Dashboard = () => {
  const [startDate, setStartDate] = useState(
    moment(new Date("10/10/2021"), "DD/MM/YYYY").toString()
  );
  const [endDate, setEndDate] = useState(
    moment(new Date("12/30/2021"), "DD/MM/YYYY").toString()
  );
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filteredData, setFilteredData] = useState([]);

  const updateDataWithFilter = (currentData = []) => {
    const filteredData = currentData?.filter((data) => {
      return moment(new Date(data.date), "DD/MM/YYYY").isBetween(
        moment(new Date(startDate), "DD/MM/YYYY"),
        moment(new Date(endDate), "DD/MM/YYYY"),
        "days",
        []
      );
    });
    setFilteredData(filteredData);
  };

  useEffect(() => {
    setPageData(rawData?.data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => {
    updateDataWithFilter(rawData?.data ?? []);
  }, [startDate, endDate, pageData]);

  const getStatsFromData = (primaryKey) => {
    let statsTotal = 0;

    filteredData?.forEach((data) => {
      statsTotal += Number(data[primaryKey]);
    });

    return Number(statsTotal)?.toFixed(2);
  };

  const getStatsList = () => {
    return [
      {
        id: "totalClicks",
        title: "Total Clicks",
        stats: getStatsFromData("clicks"),
        icon: "barGraph",
      },
      {
        id: "totalImpressions",
        title: "Total Impressions",
        stats: getStatsFromData("impressions"),
        icon: "pieChart",
      },
    ];
  };

  const onDateUpdate = (date, type) => {
    setLoading(true);
    const updatedDate = moment(new Date(date), "DD/MM/YYYY").toString();

    if (type === "from") setStartDate(updatedDate);
    else setEndDate(updatedDate);

    updateDataWithFilter(pageData ?? []);
    setLoading(false);
  };

  const generateLineGraphData = (lineGraphData) => {
    return {
      labels: lineGraphData.map((data) =>
        new Date(data.date).toLocaleDateString("en-US")
      ),
      datasets: [
        {
          label: "Impressions",
          data: lineGraphData.map((data) => {
            return {
              x: Number(new Date(data?.date).getTime() / 1000),
              y: Number(data?.impressions).toFixed(2),
            };
          }),

          clip: { left: 10, top: false, right: 15, bottom: 0 },
          borderColor: "#5eba7d",
          backgroundColor: "#5eba7d",
          pointHoverBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 4,
          pointRadius: 4,
          borderWidth: 2,
          hoverBorderWidth: 4,
          pointHoverBorderColor: "#2563EB",
        },
        {
          label: "Clicks",
          data: lineGraphData.map((data) => ({
            x: Number(new Date(data?.date).getTime() / 1000),
            y: Number(data?.clicks).toFixed(2),
          })),
          clip: { left: 10, top: false, right: 15, bottom: 0 },
          borderColor: "#1352ff",
          backgroundColor: "#1352ff",
          pointHoverBackgroundColor: "#fff",
          pointBorderWidth: 2,
          pointHoverRadius: 6,
          pointHoverBorderWidth: 4,
          pointRadius: 4,
          borderWidth: 2,
          hoverBorderWidth: 4,
          pointHoverBorderColor: "#2563EB",
        },
      ],
    };
  };

  console.log("start", startDate, endDate);
  if (loading) {
    return (
      <div className="dashboardContainer">
        <Loader active />
      </div>
    );
  }

  return (
    <div className="dashboardContainer">
      <div className="dashboardWrapper">
        <div className="dateContainer">
          <DatePicker
            id="from"
            onDateSelect={onDateUpdate}
            value={startDate}
            maxDate={new Date()}
          />
          <span className="dateSeparator">To</span>
          <DatePicker
            id="to"
            onDateSelect={onDateUpdate}
            value={endDate}
            minDate={startDate}
            maxDate={new Date()}
          />
        </div>
        <div className="statsContainer">
          <div className="tileList">
            {getStatsList().map((statItem) => {
              return (
                <div className="tileWrapper" key={statItem.id}>
                  <Tile
                    title={statItem.title}
                    content={statItem.stats}
                    icon={statItem.icon}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="graphContainer">
          <Line
            options={defaultOptions}
            data={generateLineGraphData(filteredData)}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
