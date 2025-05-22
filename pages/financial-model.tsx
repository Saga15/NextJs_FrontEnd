import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
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

const FinancialModel = () => {
  const router = useRouter();
  const { data: session }: any = useSession();
  const [showLoader, setShowLoader] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [rowData, setRowData] = useState([]);
  const [filterData, setFilterData] = useState(null);

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
    <HelmetComponent title={"Financial-Model"} />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Row className="w-100 text-center">
          <Col md={6} className="mb-4">
            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "260px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">ASSUMPTIONS</Card.Title>
                <hr className="border-primary my-6" />
                <hr className="border-primary my-6" />
                <hr className="border-primary my-6" />
                <hr className="border-primary my-6" />
                <hr className="border-primary my-6" />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="">
            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "260px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">OUTPUT</Card.Title>
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between my-3"
                  >
                    <hr className="border-primary flex-grow-1 mx-2" />
                    <hr className="border-primary flex-grow-1 mx-2" />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "260px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">
                  ANUAL MODEL & FORECAST
                </Card.Title>

                {/* Dynamically generate 5 rows of horizontal lines */}
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="d-flex justify-content-between my-2"
                  >
                    <hr className="border-primary flex-grow-1 mx-2" />
                    <hr className="border-primary flex-grow-1 mx-2" />
                  </div>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FinancialModel;
