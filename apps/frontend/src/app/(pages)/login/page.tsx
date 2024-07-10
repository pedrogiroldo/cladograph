"use client";
import { useState } from "react";
import styles from "./styles.module.css";
import { Button, TextField } from "@mui/material";

export default function Login() {
  const [isSaved, setIsSaved] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  function setEmailInputFunc(e: any) {
    setEmailInput(e.target.value);
  }

  const [passwordInput, setPasswordInput] = useState("");
  function setPasswordInputFunc(e: any) {
    setPasswordInput(e.target.value);
  }

  function login() {}

  return (
    <div className={styles.main}>
      <div className={styles.actionArea}>
        <TextField
          value={emailInput}
          style={{ marginTop: "2.5vh" }}
          variant={"filled"}
          label="Nova senha"
          onChange={setEmailInputFunc}
        />
        <TextField
          value={passwordInput}
          style={{ marginTop: "2.5vh" }}
          variant={"filled"}
          label="Confirmar nova senha"
          onChange={setPasswordInputFunc}
        />
        <Button
          variant="contained"
          color="success"
          onClick={() => login()}
          style={{ marginTop: "2vh" }}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
