import { HashLoader } from "react-spinners";
import styles from "./Loading.module.css";
const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Loading() {
  return (
    <div className="sweet-loading py-10">
      <HashLoader
        size={100}
        color="#0aad0a"
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
