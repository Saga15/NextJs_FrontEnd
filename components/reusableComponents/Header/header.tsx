import React from "react";
import {
  Container,
  Card,
  Image,
  Navbar,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// Define the type for the Header component's props (if any)
interface HeaderProps {}

export const Header: React.FC<HeaderProps> = () => {
  const router = useRouter();
  // Handle sign-out logic
  const handleSignout = async () => {
    const callbackUrl = "/login";
    await signOut({ redirect: true, callbackUrl: callbackUrl });
  };

  return (
    <Card className="rounded-4 border-0">
      <Card.Body className="px-6">
        <Navbar expand="lg" className="bg-white border-0 px-0">
          <Container fluid className="p-0 rounded-4">
            <Nav.Link href="/" className="p-0 me-4 ms-4">
                  <Image src="/theme-logo.svg" alt="Logo" width={30} height={30} loading="lazy"/>
                </Nav.Link>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse
              id="navbarScroll"
              className="border-1 border-altlight rounded-4"
            >
              <Nav
                className="ms-auto my-2 my-lg-0 d-flex justify-content-between"
                navbarScroll
              >
                <NavDropdown
                  title=""
                  id="basic-nav-dropdown"
                  className="customDropdown"
                >
                  {/* <NavDropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      router.push('/change-password')
                    }}
                  >
                    Change Password
                  </NavDropdown.Item> */}
                  <NavDropdown.Item
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignout();
                    }}
                    className="d-flex justify-content-between"
                  >
                    <span>Logout</span> 
                    <i
                    className="bi bi-box-arrow-right"
                    title="Logout"
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  ></i>
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <Nav className="text-greysslate fw-light px-4">
                  <i
                    className="mr-2 bi bi-box-arrow-right"
                    title="Logout"
                    style={{
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleSignout();
                    }}
                  ></i>{" "}
                </Nav> */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Card.Body>
    </Card>
  );
};

export default Header;
