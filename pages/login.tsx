import { Container, Button, Row, Col, Form, Card } from "react-bootstrap";
import Api from "../helper/api";
import { signIn } from "next-auth/react";
import { post } from "../helper/ApiHook";
import { useState, useRef, ChangeEvent } from "react";
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from "next/router";
import Loader from "../helper/loaderLayout/loader";
import swal from "sweetalert";
import {
  HelmetComponent,
  PasswordComponent,
  TextInput,
} from "../components/reusableComponents/FormInputs";

const SignIn: React.FC = () => {
  const router = useRouter();
  const validator = useRef(new SimpleReactValidator());
  const [count, setCount] = useState<number>(0);
  const [inputFields, setInputFields] = useState<{
    email: string;
    password: string;
    mobileNumber?: string;
  }>({
    email: "",
    password: "",
  });
  const [visible, setVisible] = useState(true);
  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async (e, type: string) => {
    e.preventDefault();
    if (type === "submit") {
      validator.current.fields["password"] = true;
      validator.current.errorMessages["password"] = null;
      validator.current.hideMessageFor("password");
    }
    if (type === "login" && validator.current.allValid()) {
      await postLogin();
    } else if (type === "submit" && validator.current.allValid()) {
      await forgetPassword();
    } else {
      validator.current.showMessages();
      setCount(count + 1); // Force component to re-render to display errors
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const postLogin = async () => {
    setShowLoader(true);
    const { email, password } = inputFields;
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    setShowLoader(false);
    if (result?.ok) {
      router.push("/");
    } else {
      swal(result?.error || "Login failed", "", "error");
    }
  };

  const forgetPassword = async () => {
    setShowLoader(true);
    // temparary comment code forgotPasswordUrl correct as per project
    const endPoint = `${Api?.forgotPasswordUrl}`;
    const payload = { email: inputFields?.email };

    const res = await post(endPoint, payload);
    setShowLoader(false);

    if (res?.data?.success) {
      swal(
        res?.data?.data?.message || "Email has been sent successfully",
        "",
        "success"
      ).then(() => {
        setVisible(true);
      });
    } else {
      swal("Something went wrong!", "", "error");
    }
  };

  return (
    <>
      <Loader showLoader={showLoader} fullPage={true} />
      <HelmetComponent title={"Login"} />
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
                <Card.Title className="display-2 fw-bold text-white card-title h5">
                  {visible ? "Login" : "Forgot Password"}
                </Card.Title>
                <Form className="text-start loginForm">
                  <TextInput
                    value={inputFields?.email}
                    onInputChange={(e) => {
                      handleChange(e);
                    }}
                    asterisk="*"
                    containerClass="form-group mb-2"
                    inputClass="email "
                    type="email"
                    name="email"
                    // label="Email"
                    id="email"
                    placeholder="Enter your email"
                    errorMessage={validator.current.message(
                      "email",
                      inputFields?.email,
                      "required|email"
                    )}
                    autoComplete="off"
                  />
                  {visible && (
                    <Form.Group className="">
                      {/* <Form.Label>Password<span className="text-danger">*</span></Form.Label> */}
                      <div className="password-wrapper">
                        <PasswordComponent
                          onInputChange={handleChange}
                          name="password"
                          value={inputFields?.password}
                          placeholder="Enter your password"
                          autoComplete="off"
                          id="password"
                          containerClass="form-group"
                          inputClass=""
                          label=""
                          asterisk="*"
                          type="password"
                          minlength="6"
                          errorMessage={
                            // login && !backButtonFlag &&
                            validator.current.message(
                              "password",
                              inputFields.password,
                              "required",
                              {
                                className: "text-danger py-0",
                              }
                            )
                          }
                          switchElement="true"
                        />
                      </div>
                    </Form.Group>
                  )}
                  <Button
                    variant="lightPink"
                    className="w-100 py-2 mt-1 text-white rounded-pill"
                    type="submit"
                    onClick={(e) => {
                      if (visible) {
                        handleSubmit(e, "login");
                      } else {
                        handleSubmit(e, "submit");
                      }
                    }}
                  >
                    {visible ? "Login" : "Submit"}
                  </Button>

                  {visible && (
                    <Button
                      variant="link"
                      className="border-0 w-100 py-1 fw-normal text-white"
                      onClick={() => {
                        validator.current.hideMessages();
                        setVisible(false);
                      }}
                    >
                      <span>Forgot Password?</span>
                    </Button>
                  )}

                  {visible ? (
                    <div className="text-center d-flex align-items-center justify-content-center">
                      <span className="text-white mb-0 fw-normal">
                        Don't have an account?{" "}
                      </span>
                      <Button
                        variant="link"
                        className="px-0 text-white border-0 w-auto py-1 ms-2 mb-0 fw-normal"
                        onClick={(e) => {
                          if (e.ctrlKey || e.metaKey) {
                            // Open in a new tab if Ctrl or Cmd is pressed
                            window.open("/sign-up", "_blank");
                          } else {
                            // Otherwise, redirect in the same tab
                            router.push("/sign-up");
                          }
                        }}
                      >
                        <span className="text-white fw-normal">Sign Up</span>
                      </Button>
                    </div>
                  ) : null}

                  {!visible && (
                    <div className="text-center mb-10 d-flex align-items-center justify-content-center">
                      <span className="h4 mb-0 fw-normal">
                        Already have an account?{" "}
                      </span>
                      <Button
                        variant="link"
                        className="px-0 text-rdBronze border-0 w-auto ms-2 h4 mb-0 fw-normal"
                        onClick={(e) => {
                          validator.current.hideMessages();
                          setVisible(true);
                          if (e.ctrlKey || e.metaKey) {
                            // Open in a new tab if Ctrl or Cmd is pressed
                            window.open("/login", "_blank");
                          } else {
                            // Otherwise, redirect in the same tab
                            router.push("/login");
                          }
                        }}
                      >
                        <span className="text-white h4 fw-normal">Login</span>
                      </Button>
                    </div>
                  )}
                  {/* } */}
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SignIn;
