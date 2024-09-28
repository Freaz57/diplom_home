import { Oval } from "react-loader-spinner";
import styles from "./styles.module.css";

interface LoadingComponentProps {
  loading: boolean;
}

function LoadingComponent({ loading }: LoadingComponentProps) {
  return (
    <div className={styles.loader}>
      <div className={styles.container}>
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          visible={loading}
          ariaLabel="oval-loading"
          secondaryColor="#4fa94d"
        />
      </div>
    </div>
  );
}

export default LoadingComponent;
