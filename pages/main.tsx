import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { get } from "../helper/ApiHook";
import Api from "../helper/api";
import { generateUrl } from "../helper/customFunctions";
import swal from "sweetalert";
import { Button, Container } from "react-bootstrap";
import Loader from "../helper/loaderLayout/loader";
import { HelmetComponent } from "../components/reusableComponents/FormInputs";
import Image from "next/image";

const MainPage = () => {
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
    };

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
      <HelmetComponent title={"Main-Page"} />
      <Container fluid>
        <div className="d-flex justify-content-between">
          <div>
            <Button
              variant="lightPink"
              className="text-white rounded-pill border-1"
              onClick={()=>{
                router.push("/pathway")
              }}
            >
              PROGRESS
            </Button>
          </div>
          <Image
            src={"./theme-logo.svg"}
            alt={"logo"}
            width={250}
            height={250}
            loading="lazy"
          ></Image>
          <div>
            <Button
              variant="lightPink"
              className="text-white rounded-pill border-1"
              onClick={()=>{
                router.push("/pathway")
              }}
            >
              UNIVERSE
            </Button>
            <div className="mt-5">
              <ul>
                <li>Stock 01</li>
                <li>Stock 02</li>
                <li>Stock 03</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="align-item-center"></div>
      </Container>
    </>
  );
};

export default MainPage;
