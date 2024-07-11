"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, TextField } from "@mui/material";
import Navbar from "@/components/Navbar/Navbar";
import Requests from "@/requests/requests";
import StorageManager from "@/utils/storageManager/storageManager.util";

export default function Login() {
  const requests = new Requests();

  const [loginFailed, setLoginFailed] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  function setEmailInputFunc(e: any) {
    setEmailInput(e.target.value);
  }

  const [passwordInput, setPasswordInput] = useState("");
  function setPasswordInputFunc(e: any) {
    setPasswordInput(e.target.value);
  }

  async function login(email: string, password: string) {
    const auth = await requests.userRequests.login({ email, password });
    // console.log(auth);

    if (!auth.auth) {
      setLoginFailed(true);
    } else if (auth.tokens) {
      StorageManager.Token.set(auth.tokens);
    } else console.error("Error on authentication!");
  }

  return (
    <div className={styles.main}>
      <Navbar />
      <h1>Bem vindo!</h1>
      <div className={styles.actionArea}>
        <TextField
          value={emailInput}
          style={{ marginTop: "2.5vh" }}
          variant={"filled"}
          label="E-mail"
          onChange={setEmailInputFunc}
        />
        <TextField
          value={passwordInput}
          style={{ marginTop: "2.5vh" }}
          variant={"filled"}
          label="Senha"
          onChange={setPasswordInputFunc}
        />
        x
        <Button
          variant="contained"
          onClick={() => login(emailInput, passwordInput)}
          style={{ marginTop: "2vh" }}
        >
          Entrar
        </Button>
      </div>
    </div>
  );
}
