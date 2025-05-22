import React, { useEffect, useState, useRef } from "react";
import {
  Form,
  Button,
  Container,
  Card,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import swal from "sweetalert";
import Api from "../helper/api";
import SimpleReactValidator from "simple-react-validator";
import Loader from "../helper/loaderLayout/loader";
import { useRouter } from "next/router";
import { get, update } from "../helper/ApiHook";
import { HelmetComponent } from "../components/reusableComponents/FormInputs";

const ResetPassword: React.FC = () => {
  const validator = useRef(new SimpleReactValidator());
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [cpassErr, setCpassErr] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [switchItem, setSwitchItem] = useState<boolean>(false);
  const [confPasSwitchItem, setConfPasSwitchItem] = useState<boolean>(false);

  const { token } = router.query;

  useEffect(() => {
    if (!token) return;
    verifyTo();
  }, [token]);

  const verifyTo = async () => {
    setShowLoader(true);
    const { data } = await get(`${Api.verifyTokenUrl}?token=${token}`);

    if (data && data.success === true && data.data) {
      setShowLoader(false);
    } else {
      setShowLoader(false);
      swal("Invalid token", "", "error").then(() => {
        router.push("/login");
      });
    }
  };

  const validateForm = (e: React.FormEvent) => {
    e.preventDefault();
    let isValid = true;
    let cpassErr = "";

    if (password !== confirmPassword) {
      cpassErr = "Password did not match";
      isValid = false;
    }
    setCpassErr(cpassErr);

    if (validator.current.allValid() && isValid) {
      changePassword();
    } else {
      validator.current.showMessages();
      setCount(count + 1);
    }
  };

  const changePassword = async () => {
    setShowLoader(true);
    const payload = {
      token: token as string,
      newpassword: password,
      confirmpassword: confirmPassword,
    };
    const endpoint = `${Api.resetPasswordUrl}`;

    const res = await update(endpoint, payload);

    if (res && res?.data?.success === true) {
      setShowLoader(false);
      if (
        res?.data?.res ===
        "This Token has been expired, please created new Token."
      ) {
        swal(
          "This Token has been expired, please created new Token.",
          "",
          "error"
        ).then(() => {
          router.push("/login");
        });
      } else {
        swal("Password changed successfully", "", "success", {
          closeOnClickOutside: false,
          timer: 2000,
        }).then(() => {
          router.push("/login");
        });
      }
    } else {
      setShowLoader(false);
      swal(res?.error ?? "Something went wrong", "", "error");
    }
  };

  const handlePasswordView = (e: React.MouseEvent) => {
    e.preventDefault();
    setSwitchItem(!switchItem);
  };

  const handleConfPasswordView = (e: React.MouseEvent) => {
    e.preventDefault();
    setConfPasSwitchItem(!confPasSwitchItem);
  };

  return (
    <>
      <Loader showLoader={showLoader} fullPage={true} />
      <HelmetComponent title={"Reset Password"} />

      <Container
        fluid
        className="login-Page"
        style={{
          backgroundImage: `url('/login-page.svg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100vw",
        }}
      >
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col md="4" className="px-1">
            <Card className="text-center p-3 bg-transparent  border-0">
              <Card.Body className="p-0">
                <Form>
                  <div className="title text-center">
                    <h5 className="h1 fw-normal mb-13">Reset Password</h5>
                  </div>
                  <div className="form-group">
                    <label
                      className="m-1 text-start d-flex align-items-center w-100"
                      htmlFor="password"
                    >
                      <img
                        src="/password.svg"
                        alt="Password Icon"
                        className="me-2"
                      />
                      Enter Password:
                    </label>

                    <input
                      id="password"
                      className="form-control form-control-lg"
                      type={switchItem ? "text" : "password"}
                      name="password"
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                    />
                    {password && (
                      <Image
                        style={{ cursor: "pointer" }}
                        src={!switchItem ? "/visibility.svg" : "/eyePass.svg"}
                        alt="Username"
                        className="showpass"
                        onClick={handlePasswordView}
                      />
                    )}
                    {validator.current.message(
                      "new password",
                      password,
                      "required",
                      {
                        className: "text-danger",
                      }
                    )}
                  </div>
                  <div className="form-group mb-13">
                    <label
                      className="m-1 text-start d-flex align-items-center w-100"
                      htmlFor="confirmPassword"
                    >
                      <img
                        src="/password.svg"
                        alt="Password Icon"
                        className="me-2"
                      />
                      Confirm Password:
                    </label>

                    <input
                      className="form-control form-control-lg"
                      type={confPasSwitchItem ? "text" : "password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      minLength={6}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Re-enter the password"
                    />
                    {confirmPassword && (
                      <Image
                        style={{ cursor: "pointer" }}
                        src={
                          !confPasSwitchItem
                            ? "/visibility.svg"
                            : "/eyePass.svg"
                        }
                        alt="Username"
                        className="showpass"
                        onClick={handleConfPasswordView}
                      />
                    )}
                    {password !== "" && (
                      <span>
                        {validator.current.message(
                          "re-enter password",
                          confirmPassword,
                          "required",
                          { className: "text-danger" }
                        )}
                      </span>
                    )}
                    {confirmPassword !== "" && (
                      <span className="text-danger">{cpassErr}</span>
                    )}
                  </div>
                  <div className="text-center mt-3">
                    <Button type="submit" id="submit" onClick={validateForm} 
                     className="w-100 py-2.5 mt-1 text-white rounded-pill"
                     style={{
                       backgroundColor: "#FF96FF",
                       border: "2px solid #D870D8",
                     }}>
                      Reset
                    </Button>
                  </div>
                  <div className="text-center mt-3">
                    <a
                      href="/login"
                      id="back-link"
                      className="text-white h2 fw-lighter"
                    >
                      Back to Login
                    </a>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ResetPassword;
