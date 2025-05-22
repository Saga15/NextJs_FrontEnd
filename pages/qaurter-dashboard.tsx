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
import TimeBasedChartComponent from "../components/reusableGraphComponents/timeChart";
import {
  chartData2,
  chartData4,
  QuarterlyColumns,
  QuarterlyRows,
} from "../utils/constants";
import SimpleTable from "../components/reusableComponents/Table/simpletable.component";

const QuarterDashboard = () => {
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
      <Container
        fluid
        className="d-flex justify-content-center align-items-center min-vh-100"
      >
        <Row className="w-100 text-center">
          <Col md={6} className="mb-4">
            <h3 className="text-start">QUARTERLY TABLE</h3>
            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "360px", minWidth: "250px" }}
            >
              <Card.Body>
                <SimpleTable
                  columns={QuarterlyColumns}
                  rows={QuarterlyRows}
                  showCheckbox={false}
                  onSelectRowsIndexes={{}}
                  tableClass={""}
                  tableContainerClass={""}
                  showPagination={true}
                  emptyMessage={"No records found!"}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <h3 className="text-start">Outlook VS Expectations</h3>

            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "360px", minWidth: "250px" }}
            >
              <Row>
                <Col md={12}>
                  <h3>Quarterly Outlook</h3>
                  <SimpleTable
                    columns={[
                      { id: "year", label: "Year" },
                      { id: "outlook", label: "Outlook" },
                    ]}
                    rows={[
                      { year: "2023", outlook: "100" },
                      { year: "2022", outlook: "90" },
                      { year: "2021", outlook: "95" },
                    ]}
                    showCheckbox={false}
                    onSelectRowsIndexes={{}}
                    tableClass={""}
                    tableContainerClass={""}
                    showPagination={true}
                    emptyMessage={"No records found!"}
                  />
                </Col>

                <Col md={12} className="">
                  <h3>Quarterly Exceptions</h3>
                  <SimpleTable
                    columns={[
                      { id: "year", label: "Year" },
                      { id: "exceptions", label: "Exceptions" },
                    ]}
                    rows={[
                      { year: "2023", exceptions: "120" },
                      { year: "2022", exceptions: "110" },
                    ]}
                    showCheckbox={false}
                    onSelectRowsIndexes={{}}
                    tableClass={""}
                    tableContainerClass={""}
                    showPagination={true}
                    emptyMessage={"No records found!"}
                  />
                </Col>
              </Row>
            </Card>
          </Col>

          <Col md={6}>
            <h3 className="text-start">MACRO DRIVERS</h3>
            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "360px", minWidth: "250px" }}
            >
              <Card.Body>
                <Row className="mb-2">
                  <Col
                    md={12}
                    className="border p-2"
                    style={{ height: "150px" }}
                  >
                    Main Macro Data Points
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={12}
                    className="border p-2"
                    style={{ height: "150px" }}
                  >
                    <TimeBasedChartComponent
                      data={chartData2}
                      width={400}
                      height={140}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6}>
            <h3 className="text-start">REVISIONS</h3>
            <Card
              className="p-4 d-flex flex-column justify-content-between rounded-4"
              style={{ height: "360px", minWidth: "250px" }}
            >
              <Card.Body>
                <Row className="mb-2">
                  <Col
                    md={12}
                    className="border p-2"
                    style={{ height: "150px" }}
                  >
                    Revisions
                  </Col>
                </Row>
                <Row>
                  <Col
                    md={12}
                    className="border p-2"
                    style={{ height: "150px" }}
                  >
                    <Row>
                      <Col md={4} className="d-flex justify-content-center">
                        <TimeBasedChartComponent
                          data={chartData2}
                          width={180}
                          height={140}
                        />
                      </Col>
                      <Col md={4} className="d-flex justify-content-center">
                        <TimeBasedChartComponent
                          data={chartData2}
                          width={180}
                          height={140}
                        />
                      </Col>
                      <Col md={4} className="d-flex justify-content-center">
                        <TimeBasedChartComponent
                          data={chartData2}
                          width={180}
                          height={140}
                        />
                      </Col>
                    </Row>
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

export default QuarterDashboard;
