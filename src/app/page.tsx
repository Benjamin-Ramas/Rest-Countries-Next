'use client'
import styles from "../css/main.module.css";
import BackgroundRef from "./components/backgroundRef";
import { redirect } from "next/navigation";

export default function Page() {
  redirect('/home');
  return (
      <div className={styles.page}>
        <BackgroundRef />
        <h1>AHHHHHhhh</h1>
    </div>
  );
}
