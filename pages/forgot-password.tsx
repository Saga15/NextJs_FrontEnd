import React, { useEffect, useRef, useState } from "react";
import SimpleReactValidator from "simple-react-validator";
import {
  Form,
  Button,
  Row,
  Col,
  Container,
  Image,
  Card,
  CardBody,
} from "react-bootstrap";
import swal from "sweetalert";
import {
  HelmetComponent,
  PasswordComponent,
} from "../components/reusableComponents/FormInputs/index";
import Api from "../helper/api";
import Loader from "../helper/loaderLayout/loader";
import { useRouter } from "next/router";
import { update } from "../helper/ApiHook";

const ForgetPassword: React.FC = () => {

  const validator = useRef(new SimpleReactValidator({
    messages: {
      in: "Password and confirm password are not matching",
    },
    validators: {
      password: {
        message: "The password must be at least 6 digits.",
        rule: (val) => {
          // Remove non-digit characters and check length
          const digits = val;
          return digits.length >= 6;
        },
      },
    },
  }));


  const router = useRouter();
  const [count, setCount] = useState<number>(0);

  const [showLoader, setShowLoader] = useState<boolean>(false);
  const { query, push } = useRouter();
  const [inputFields, setInputFields] = useState<any>({
    token: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (query?.token) {
      setInputFields({
        ...inputFields,
        token: query?.token,
      });
    }
  }, [query]);

  const resetPassword = async () => {
    push('/login');
    
    setShowLoader(true);
    const endpoint = `${Api?.resetPasswordUrl}`;
    const payload: any = {
      newpassword: inputFields?.password,
      confirmpassword: inputFields?.confirmPassword,
      token: inputFields?.token,
    };

    const { data, error } = await update(endpoint, payload);

    if (data?.success) {
      setShowLoader(false);
      swal('Password reset successfully!',
        'Login with your new password', 'success').then(() => {
          push('/login');
        })
    } else {
      setShowLoader(false);
      swal(error, "", "error");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (validator.current.allValid()) {
        resetPassword();
      } else {
        validator.current.showMessages();
        setCount(count + 1);
      }

      // Clear errors if validation passes
      setErrors({
        ...errors,
        ["password"]: "",
        ["confirmPassword"]: "",
      });
    } catch (error) {
      swal('Something went wrong', '', 'error');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputFields((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name == "password") {
      setErrors({
        ...errors,
        ["password"]: "",
      });
    }

    if (name == "confirmPassword") {
      setErrors({
        ...errors,
        ["confirmPassword"]: "",
      });
    }
  };

  return (
    <>
      <HelmetComponent title={"Reset Password"} />
      <Loader showLoader={showLoader} fullPage={true} />
      <section>
        <Container fluid>
          <Row className="vh-100">
            <Col md={6} className="bg-black"></Col>
            <Col md={6}>
              <Card className="text-center p-3 borderRadius-12 border-0 h-100">
                <CardBody className="p-0 d-flex align-items-center justify-content-center flex-wrap">
                  <Form
                    onSubmit={handleSubmit}
                    className=""
                  >
                    <Card.Title className={"fs-1 fw-normal  text-center"}>
                      Reset Password
                    </Card.Title>

                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="text-start mt-3 mb-3 errorWrapper "
                    >
                      <Form.Label>
                        New Password<span className="text-danger">*</span>
                      </Form.Label>
                      <PasswordComponent
                        onInputChange={handleChange}
                        name="password"
                        id="password"
                        containerClass="form-group"
                        inputClass="form-control"
                        label=""
                        asterisk=""
                        value={inputFields?.password}
                        type="password"
                        minlength="6"
                        placeholder="Enter new password"
                        errorMessage={
                          validator.current.message(
                            "password",
                            inputFields.password,
                            "required|password",
                            {
                              className: "text-danger",
                            }
                          )
                        }
                        switchElement="true"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="exampleForm.ControlInput1"
                      className="text-start mt-3 mb-3 errorWrapper"
                    >
                      <Form.Label>
                        Confirm Password<span className="text-danger">*</span>
                      </Form.Label>
                      <PasswordComponent
                        onInputChange={handleChange}
                        name="confirmPassword"
                        id="confirmPassword"
                        containerClass="form-group"
                        inputClass="form-control"
                        label=""
                        asterisk=""
                        value={inputFields?.confirmPassword}
                        type="password"
                        minlength="6"
                        placeholder="Enter confirm password"
                        errorMessage={
                          validator.current.message(
                            "confirm password",
                            inputFields?.confirmPassword,
                            `required|password|in:${inputFields?.password}`,
                            {
                              messages: {
                                in: "The new password and confirm password must be same."
                              },
                            },
                          )
                        }
                        switchElement="true"
                      />
                    </Form.Group>
                    <Button
                      variant="primary"
                      className="py-2 mt-5 mx-auto text-white fw-bold"
                      type="submit"
                      onClick={() => {}}
                    >
                      Submit
                    </Button>
                    <Button
                      variant="link"
                      className="border-0 display-6 w-100 mt-0 fw-normal bg-gold text-rdBronze mt-2"
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
                      <Image src="../../../arrow-left.svg" alt="" />
                      Back to Login
                    </Button>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default ForgetPassword;
