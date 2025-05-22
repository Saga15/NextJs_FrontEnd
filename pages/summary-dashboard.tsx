import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Loader from "../helper/loaderLayout/loader";
import TimeBasedChartComponent from "../components/reusableGraphComponents/timeChart";
import {
  chartData1,
  chartData2,
  chartData3,
  chartData4,
  candlestickData,
} from "../utils/constants";
import CandleStickChartComponent from "../components/reusableGraphComponents/candleStickGraph";
import {
  checkIfEmpty,
  formattedData,
  generateUrl,
} from "../helper/customFunctions";
import Api from "../helper/api";
import { get } from "../helper/ApiHook";
import axios from "axios";
import swal from "sweetalert";

const SummaryDashboard = () => {
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [rowData, setRowData] = useState<any>({});
  console.log("rowData: ", rowData);

  useEffect(() => {
    getRowData();
  }, []);

  // Get all user data
  const getRowData = async () => {
    setShowLoader(true);
    // add url for dummy data
    const endPoint = `${Api?.candleStickDataUrl}`; // this url added in json

    const url = generateUrl(endPoint);
    // const { data, message,error } = await get("https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=demo");

    const response = await axios.get(
      "https://api.twelvedata.com/time_series?symbol=AAPL&interval=1day&apikey=demo"
    );
    console.log("response: ", response);
    const data = response?.data;
    console.log("data: ", data);

    setShowLoader(false);
    if (
      !checkIfEmpty(data, "O") &&
      response?.status
      // data?.success
    ) {
      setRowData(data);
    } else {
      setRowData({});
      swal("Something went wrong", "", "error");
    }
    setShowLoader(false);
  };

  return (
    <>
      <Loader showLoader={showLoader} fullPage={true} />
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Row className="w-100 text-center">
          <Col md={6} className="mb-4">
            <Card
              className="p-4 d-flex flex-column justify-content-between"
              style={{ height: "300px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">RADAR</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="">
            <Card
              className="p-4 d-flex flex-column justify-content-between"
              style={{ height: "300px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">
                  MANAGEMENT TRACK RECORDS
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="">
            <Card
              className="p-4 d-flex flex-column justify-content-between"
              style={{ height: "300px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">COMPARE</Card.Title>
                <Row>
                  <Col md={6}>
                    {/* <CandleStickChartComponent data={formattedData(rowData?.values)} width={450} height={250} /> */}
                  </Col>
                  <Col md={6}>
                    <CandleStickChartComponent
                      data={candlestickData}
                      width={450}
                      height={250}
                    />
                  </Col>
                  <Col md={6}>
                    <CandleStickChartComponent
                      data={candlestickData}
                      width={450}
                      height={250}
                    />
                  </Col>
                  <Col md={6}>
                    <CandleStickChartComponent
                      data={candlestickData}
                      width={450}
                      height={250}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="">
            <Card
              className="p-4 d-flex flex-column justify-content-between"
              style={{ height: "300px", minWidth: "250px" }}
            >
              <Card.Body>
                <Card.Title className="text-start">CHARTS</Card.Title>
                <Row>
                  <Col md={6}>
                    <TimeBasedChartComponent
                      data={chartData1}
                      width={400}
                      height={250}
                    />
                  </Col>
                  <Col md={6}>
                    <TimeBasedChartComponent
                      data={chartData2}
                      width={400}
                      height={250}
                    />
                  </Col>
                  <Col md={6}>
                    <TimeBasedChartComponent
                      data={chartData3}
                      width={400}
                      height={250}
                    />
                  </Col>
                  <Col md={6}>
                    <TimeBasedChartComponent
                      data={chartData4}
                      width={400}
                      height={250}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SummaryDashboard;
