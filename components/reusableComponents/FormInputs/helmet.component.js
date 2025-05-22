import { Helmet } from "react-helmet";

const HelmetComponent = (props) => {
  const { title } = props;
  return (
    <div>
      <Helmet>
        <title>{title} | ChronInvest</title>
      </Helmet>
    </div>
  );
};

export default HelmetComponent;
