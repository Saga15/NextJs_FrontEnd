import { useState, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Image,
  Form,
  Button,
} from "react-bootstrap";
import Api from "../helper/api";
import { post } from "../helper/ApiHook";
import SimpleReactValidator from "simple-react-validator";
import { useRouter } from "next/router";
import Loader from "../helper/loaderLayout/loader";
import swal from "sweetalert";
import { HelmetComponent } from "../components/reusableComponents/FormInputs";
import dynamic from "next/dynamic";
import "react-phone-input-2/lib/style.css";
import { PasswordComponent } from "../components/reusableComponents/FormInputs";

const PhoneInput = dynamic(() => import("react-phone-input-2"), { ssr: false });

const SignIn = () => {
  const router = useRouter();

  const validator = useRef(
    new SimpleReactValidator({
      messages: {
        in: "Password and confirm password are not matching",
      },
      validators: {
        email: {
          message: "The :attribute must be a valid email address.",
          rule: (val) => {
            return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/.test(
              val
            );
          },
        },
        phone: {
          message: "The :attribute should be of 10 digits only.",
          rule: (val) => {
            // Remove non-digit characters and check length
            const digits = val.replace(/\D/g, "");
            return digits.length > 10;
          },
        },
        password: {
          message: "The password must be at least 6 digits.",
          rule: (val) => {
            // Remove non-digit characters and check length
            const digits = val;
            return digits.length >= 6;
          },
        },
        confirmPassword: {
          message: "The password must be at least 6 digits.",
          rule: (val) => {
            // Remove non-digit characters and check length
            const digits = val;
            return digits.length >= 6;
          },
        },
      },
    })
  );

  const [formData, setFormData] = useState<any>({
    firstName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const [count, setCount] = useState<number>(0);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: any) => {
    if (value?.startsWith("1")) {
      setFormData({
        ...formData,
        phone: value,
      });
    } else {
      value = value ? "" + value : "";
      setFormData({
        ...formData,
        phone: value,
      });
    }
  };

  const signUp = async () => {
    setShowLoader(true);
    const url = `${Api.signUpUrl}`;

    const payload: any = {
      name: formData.firstName,
      email: formData.email,
      password: formData?.password,

      roleId: 2,
    };

    if (formData.phone) {
      payload.number = `${formData.phone}`;
    }

    const callback = post(url, payload);

    const response = await callback;

    if (response?.data?.success) {
      setShowLoader(false);
      swal(
        "Sign-up successful!",
        // "Please check your registered email for the verification link.",
        "",
        "success",
        {
          closeOnClickOutside: false,
          // timer: 5000,
        }
      ).then(() => {
        router.push("/login");
      });
    } else {
      setShowLoader(false);
      swal(response?.error || "Something went wrong!", "", "error");
    }
  };

  const handleSubmit = async () => {
    if (validator.current.allValid()) {
      signUp();
    } else {
      validator.current.showMessages();
      setCount(count + 1);
    }
  };

  return (
    <>
      <HelmetComponent title={"Sign Up"} />
      <Loader showLoader={showLoader} fullPage={true} />

      <Container fluid className="signUp-Page">
        <Row className="d-flex justify-content-center align-items-center vh-100">
          <Col md={6}></Col>
          <Col md={6} className="">
            <Card className="text-center p-3  border-0 px-5">
              <Card.Body className="p-0 px-5">
                <Form className="signupForm w-100 text-center">
                  <Card.Title className="display-2 h3 fw-normal text-primary mb-3 text-center">
                    Sign Up
                  </Card.Title>
                  <Row className="g-4">
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="validationCustom01"
                      className="text-start errorWrapper mb-3"
                    >
                      <Form.Label>
                        Full Name<span className="text-danger">*</span>
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        placeholder="Enter full name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e: any) => {
                          const re = /^[a-zA-Z ]*$/;
                          if (!e?.target?.value || re.test(e?.target?.value)) {
                            setFormData({
                              ...formData,
                              firstName: e?.target?.value,
                            });
                          }
                        }}
                      />
                      <p className="text text-danger">
                        {validator.current.message(
                          "firstName",
                          formData.firstName,
                          "required"
                        )}
                      </p>
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group
                      as={Col}
                      md="12"
                      controlId="exampleForm.ControlInput1"
                      className="text-start mb-3 errorWrapper"
                    >
                      <Form.Label>
                        Phone Number<span className="text-danger">*</span>
                      </Form.Label>

                      <PhoneInput
                        placeholder={"000-000-0000"}
                        inputClass={"w-100"}
                        country={"us"}
                        value={formData?.phone}
                        // onlyCountries={["us"]}
                        onChange={handlePhoneChange}
                        enableSearch={true}
                        disableDropdown={false}
                        countryCodeEditable={false}
                        inputProps={{
                          name: "phone",
                          required: true,
                          autoFocus: false,
                        }}
                      />

                      <p className="text text-danger">
                        {validator.current.message(
                          "phoneNumber",
                          formData.phone,
                          "required|phone"
                        )}
                      </p>
                    </Form.Group>
                  </Row>

                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    className="text-start mb-3 errorWrapper"
                  >
                    <Form.Label>
                      Email<span className="text-danger">*</span>
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      placeholder="Enter email"
                      onChange={handleInputChange}
                      className="email"
                      autoComplete="off"
                      // maxLength={25}
                    />
                    <p className="text text-danger">
                      {validator.current.message(
                        "email",
                        formData.email,
                        "required|email"
                      )}
                    </p>
                  </Form.Group>

                  <Form.Group className="text-start mb-3 errorWrapper">
                    <Form.Label>
                      Password<span className="text-danger">*</span>
                    </Form.Label>
                    <div className="password-wrapper">
                      <PasswordComponent
                        onInputChange={(e: any) => {
                          setFormData({
                            ...formData,
                            password: e?.target?.value,
                          });
                        }}
                        name="password"
                        id="password"
                        containerClass="form-group"
                        inputClass="form-control"
                        label=""
                        asterisk="*"
                        value={formData?.password}
                        type="password"
                        minLength="6"
                        placeholder="Enter password"
                        errorMessage={validator.current.message(
                          "password",
                          formData?.password,
                          "required|password",
                          {
                            className: "text-danger",
                          }
                        )}
                        switchElement="true"
                      />
                    </div>
                  </Form.Group>

                  <Form.Group
                    controlId="exampleForm.ControlInput1"
                    className="text-start mb-3 errorWrapper"
                  >
                    <Form.Label>
                      Confirm Password<span className="text-danger">*</span>
                    </Form.Label>
                    <div className="password-wrapper">
                      <PasswordComponent
                        onInputChange={(e: any) => {
                          setFormData({
                            ...formData,
                            confirmPassword: e?.target?.value,
                          });
                        }}
                        name="confirmPassword"
                        id="confirmPassword"
                        containerClass="form-group"
                        inputClass="form-control"
                        label=""
                        asterisk="*"
                        value={formData?.confirmPassword}
                        type="password"
                        minLength="6"
                        placeholder="Enter confirm password"
                        errorMessage={validator.current.message(
                          "confirmPassword",
                          formData?.confirmPassword,
                          `required|password|in:${formData?.password}`,
                          {
                            messages: {
                              in: "The new password and confirm password must be same.",
                            },
                            className: "text-danger",
                          }
                        )}
                        switchElement="true"
                      />
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="px-7 bg-primary py-2 mt-6 mx-auto px-16 text-white fw-bold"
                    onClick={(e: any) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    Create Account
                  </Button>
                  <div className="text-center mt-14 mb-10 d-flex align-items-center justify-content-center">
                    <span className="h4 mb-0 fw-normal">
                      Already have an account?{" "}
                    </span>
                    <Button
                      variant="link"
                      className="px-0 text-rdBronze border-0 w-auto ms-2 mb-0"
                      onClick={(e) => {
                        if (e.ctrlKey || e.metaKey) {
                          // Open in a new tab if Ctrl or Cmd is pressed
                          window.open("/login", "_blank");
                        } else {
                          // Otherwise, redirect in the same tab
                          router.push("/login");
                        }
                      }}
                    >
                      <span className="h4 fw-normal">Login</span>
                    </Button>
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

export default SignIn;
