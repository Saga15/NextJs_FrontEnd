import { ReactElement, ReactNode } from "react";
import { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { AuthProvider } from "../helper/useAuth";
import Layout from "../helper/loaderLayout/loaderLayout";
import "rsuite/dist/rsuite.min.css";
import "react-phone-input-2/lib/style.css";
import "react-datepicker/dist/react-datepicker.css";
import "./scss/theme.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "../components/reusableComponents/Sidebar/sidebar";
import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/reusableComponents/Header/header";
import { useRouter } from "next/router";
import { renderDefaultLayout } from "../helper/customFunctions";

// Define a type for components with custom layout options
type NextPageWithLayout = {
  getLayout?: (page: ReactElement) => ReactNode;
} & React.FC;

interface CustomAppProps extends AppProps {
  Component: NextPageWithLayout;
}

const CustomApp: React.FC<CustomAppProps> = ({ Component, pageProps: { session, ...pageProps } }) => {
  const getLayout = Component.getLayout || ((page) => page);
  const router = useRouter();

  return (
    <Layout>
      
      <SessionProvider session={session} refetchOnWindowFocus={false} refetchInterval={0}>
        <AuthProvider>
          {
            renderDefaultLayout(router?.pathname) ?
              <Container fluid className="px-0">
                <Row className="g-0">
                  {/* <Col md={3}>
                    <Sidebar />
                  </Col> */}
                  <Col sm={12}>
                    <Layout>
                      <div className="vh-100 overflow-hidden overflow-y-auto">
                        <Header />
                        <main
                          // className="app"
                          suppressHydrationWarning
                          suppressContentEditableWarning
                        >
                          {getLayout(<Component {...pageProps} />)}
                        </main>
                      </div>
                    </Layout>
                  </Col>
                </Row>
              </Container> :
              <main suppressHydrationWarning suppressContentEditableWarning>
                {getLayout(<Component {...pageProps} />)}
              </main>}
        </AuthProvider>
      </SessionProvider>
    </Layout>
  );
};
export default CustomApp;
