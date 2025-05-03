'use client'
import styles from "../css/main.module.css";
import { redirect } from "next/navigation";

export default function Page() {
  redirect('/home');
  return (
      <div className={styles.page}>
        <h1>Hello you shouldn't be here</h1>
    </div>
  );
}
