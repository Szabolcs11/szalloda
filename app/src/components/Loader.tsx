import { ThreeDots } from "react-loader-spinner";

function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 800 }}>
      <ThreeDots color="#8c8c8" height={100} width={100} />
    </div>
  );
}

export default Loader;
