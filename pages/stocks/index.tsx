
import CandleStickChartComponent from '../../components/reusableGraphComponents/candleStickGraph';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { get } from '../../helper/ApiHook';
import Api from '../../helper/api';
import {
  generateUrl,
  checkIfEmpty,
  jsonParse,
} from "../../helper/customFunctions";
import { useEffect, useState } from "react";
import swal from "sweetalert";
const StockPage = () => {

  const router = useRouter();
  const { data: session }: any = useSession();
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [filterData, setFilterData] = useState(null);

  // useEffect(() => {
  //   if (!router?.query?.id?.[0]) return;
  //   getData(+router?.query?.id?.[0]);
  // }, [router]);

  useEffect(() => {
    if (!filterData?.keyword) return;
    getRowData(1, false);
  }, [filterData]);

  const getRowData = async (pageNo = 1, isClear = true) => {
    setShowLoader(true);
    const page = pageNo || currentPage;
    const endPoint = Api;
    const params = {
      page,
      limit: itemsPerPage,
      // ...filterList,
    };

    // for filter sector data
    // if (!isClear && filterData?.keyword) {
    //   params.keyword = filterData?.keyword;
    // }

    // // for sort filter sector data
    // if (!isClear && filterData?.sort?.value) {
    //   params.sort = filterData?.sort?.value;
    // }

    const url = generateUrl(endPoint, params);
    const { data, message, error } = await get(url);

    if (data?.success) {
      setTotalCount(data?.data?.data?.count);
      setItemsPerPage(10);
      setCurrentPage(Number(data?.data?.page));
      setRowData(data?.data?.data?.rows);
    } else {
      swal(message || error || "Something went wrong!", "", "error");
    }
    setShowLoader(false);
  };




  // Example data for the candlestick chart
  const candlestickData = [
    { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
    { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
    { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
    { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
    { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
    { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
    { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
    { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
    { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
    { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
];

  return (
    <div>
      <h1>Stock Market Data</h1>
      <CandleStickChartComponent data={candlestickData} width={900} height={500} />
    </div>
  );
};

export default StockPage;
