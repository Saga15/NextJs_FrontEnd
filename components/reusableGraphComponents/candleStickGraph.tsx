import React, { useEffect, useRef } from "react";
import {
  createChart,
  CandlestickSeries,
  AreaSeries,
  BarSeries,
  BaselineSeries,
} from "lightweight-charts";

type CandleStickChartProps = {
  data: {
    time: string;
    open: number;
    high: number;
    low: number;
    close: number;
  }[];
  width?: number;
  height?: number;
};

const CandleStickChartComponent: React.FC<CandleStickChartProps> = ({
  data,
  width = 800,
  height = 400,
}) => {
  const chartContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      // Create chart
      const chart = createChart(chartContainerRef.current, {
        width,
        height,
        layout: {
          textColor: "black",
          // background: { type: 'solid', color: 'white' },
        },
      });

      // Add area series
      const areaSeries = chart.addSeries(AreaSeries, {
        lineColor: "#2962FF",
        topColor: "#2962FF",
        bottomColor: "rgba(41, 98, 255, 0.28)",
      });

      // Add bar series
      const barSeries = chart.addSeries(BarSeries);

      // Add baseline series
      const baselineSeries = chart.addSeries(BaselineSeries);

      // Add candlestick series
      const candlestickSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      // Set candlestick data
      candlestickSeries.setData(data);

      // Fit chart to content
      chart.timeScale().fitContent();

      // Cleanup on component unmount
      return () => {
        chart.remove();
      };
    }
  }, [data, width, height]);

  return <div ref={chartContainerRef} style={{ width: "100%", height }} />;
};

export default CandleStickChartComponent;
