import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Tabs, Tab, Row } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { get } from "../helper/ApiHook";
import Api from "../helper/api";
import { useRouter } from "next/router";
import {
  generateUrl,
  checkIfEmpty,
  jsonParse,
} from "../helper/customFunctions";
import swal from "sweetalert";
import Loader from "../helper/loaderLayout/loader";
import { HelmetComponent } from "../components/reusableComponents/FormInputs";
const BasicDashboard = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [key, setKey] = useState("strategy");
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

  return (
    <>
      <Loader showLoader={showLoader} fullPage={true} />
      <HelmetComponent title={"Basic-Dashboard"} />
      <Container fluid className="">
        <div className="d-flex">
          <Button
            className="mx-2 border-1 text-black bg-transparent"
            onClick={() => {
              
            }}
          >
            STRATEGY
          </Button>
          <Button
            className="mx-2 border-1 text-black bg-transparent"
            onClick={() => {}}
          >
            MACRO
          </Button>
          <Button
            className="mx-2 border-1 text-black bg-transparent"
            onClick={() => {}}
          >
            STRENGTH
          </Button>
        </div>
      </Container>
    </>
  );
};

export default BasicDashboard;
