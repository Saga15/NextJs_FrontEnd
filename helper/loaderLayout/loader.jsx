import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "./loader.module.css";

function Loader(props) {
  const { showLoader, fullPage } = props;
  return showLoader ? (
    <div
      className={
        fullPage
          ? `${styles?.loadercontainer} ${styles?.fullPage}`
          : styles?.loadercontainer
      }
    >
      <div className={styles?.loaderoverlay}></div>
      <div className={styles?.spinnercontainer}>
        <Spinner animation="border" variant="primary" />
      </div>
    </div>
  ) : null;
}

export default Loader;
