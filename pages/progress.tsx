import { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
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

const Progress: NextPage = () => {
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



  return (
    <>
      <Row>
        <h1 className="text-center">Summary of Strategy</h1>

        <Col className="mb-">
          <Card.Title>Macro</Card.Title>

          <Card>
            <Card.Body>
              <Card.Title>Research Notes</Card.Title>
              <Card.Text>
                View and manage your research notes and analysis
              </Card.Text>
              <Button variant="primary">View Notes</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card.Title>Macro</Card.Title>

          <Card>
            <Card.Body>
              <Card.Title>Meeting Notes</Card.Title>
              <Card.Text>Access notes from meetings and calls</Card.Text>
              <Button variant="primary">View Meetings</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col className="mb-4">
          <Card.Title>Macro</Card.Title>

          <Card>
            <Card.Body>
              <Card.Title>Investment Ideas</Card.Title>
              <Card.Text>Browse potential investment opportunities</Card.Text>
              <Button variant="primary">View Ideas</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col className="mb-4">
          <Card.Title>Macro</Card.Title>
          <Card>
            <Card.Body>
              <Card.Title>Analysis</Card.Title>
              <Card.Text>Review detailed market analysis</Card.Text>
              <Button variant="primary">View Analysis</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Progress;
