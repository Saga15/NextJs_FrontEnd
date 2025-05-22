import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
import { HelmetComponent } from "../components/reusableComponents/FormInputs";
import MainPage from "./main";

const Index: FC = () => {
  const router = useRouter();

  const { data: session, status }: any = useSession();

  // useEffect(() => {
  //   const pathname = router.pathname;

  //   if (pathname == "/") { 
  //     if (session?.accessToken) {
  //       router.push("/");
  //     } else {
  //       router.push("/login");
  //     }
  //   }
  // }, [session]);

  return (
    <>
      {/* <SeoHead title="Dashboard" description="This is dashboard of Admin Theme" /> */}
      {/* <h1>Base Project</h1> */}
      <MainPage />
    </>
  );
};

export default Index;
