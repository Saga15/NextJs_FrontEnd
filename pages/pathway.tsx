import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { get } from "../helper/ApiHook";
import Api from "../helper/api";
import {
  generateUrl,
  checkIfEmpty,
  jsonParse,
} from "../helper/customFunctions";
import swal from "sweetalert";
import Loader from "../helper/loaderLayout/loader";
import { HelmetComponent } from "../components/reusableComponents/FormInputs";

const Pathway = () => {
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

  const pathwaySteps = [
    {
      title: "Foundation",
      description: "Learn the basics of investment and financial markets",
      status: "completed",
      modules: [
        "Introduction to Financial Markets",
        "Basic Financial Concepts",
        "Investment Vehicles",
        "Risk Management",
      ],
    },
    {
      title: "Analysis",
      description: "Master different analysis techniques",
      status: "in-progress",
      modules: [
        "Technical Analysis",
        "Fundamental Analysis",
        "Market Analysis",
        "Financial Modeling",
      ],
    },
    {
      title: "Advanced Strategies",
      description: "Learn advanced investment strategies",
      status: "upcoming",
      modules: [
        "Portfolio Management",
        "Advanced Trading Strategies",
        "Risk Management Strategies",
        "Global Markets",
      ],
    },
  ];

  return (
    <>
      <Loader showLoader={showLoader} fullPage={true} />
      <HelmetComponent title={"Pathway"} />
      <Container fluid>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              variant="link"
              className="h1 border-1"
              onClick={() => {}}
            >
              SELECT
            </Button>
            <div className="mt-5">
              <ul className="">
                <li>Universe</li>
                <hr />
                <li>Sector</li>
                <hr />
                <li>Industry</li>
                <hr />
                <li>Stock</li>
                <hr />
              </ul>
            </div>
          </div>

          <div>
            <Button
              variant="link"
              className="h1 border-1"
              onClick={() => {
                router.push("/pathway");
              }}
            >
              PROGRESS
            </Button>
            <div className="mt-5">
              <ul>
                <li>Universe</li>
                <hr />
                <li>Track Record</li>
                <hr />
                <li>Investment Process</li>
                <hr />
              </ul>
            </div>
          </div>
        </div>
        <div className="align-item-center"></div>
      </Container>
    </>
  );
};

export default Pathway;
