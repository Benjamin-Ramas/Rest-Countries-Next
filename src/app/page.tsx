'use client'
import styles from "../css/main.module.css";
import BackgroundRef from "./components/backgroundRef";
import StyleWrapper from "./components/styleWrapper";

export default function Home() {
  return (
    <StyleWrapper>
      <div className={styles.page}>
      <BackgroundRef />
      <h1>AHHHHHhhh</h1>
    </div>
    </StyleWrapper>
  );
}
