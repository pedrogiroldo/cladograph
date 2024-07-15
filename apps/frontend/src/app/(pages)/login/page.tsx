"use client";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import { Button, TextField } from "@mui/material";
import Requests from "@/requests/requests";
import StorageManager from "@/utils/storageManager/storageManager.util";
import { useRouter } from "next/navigation";

export default function Login() {
  const requests = new Requests();
  const router = useRouter();

  const [loginFailed, setLoginFailed] = useState(false);
  const [loginFailedErrorMessage, setLoginFailedErrorMessage] = useState<
    string | string[]
  >("");

  const [emailInput, setEmailInput] = useState("");
  function setEmailInputFunc(e: any) {
    setEmailInput(e.target.value);
  }

  const [passwordInput, setPasswordInput] = useState("");
  function setPasswordInputFunc(e: any) {
    setPasswordInput(e.target.value);
  }

  async function login(email: string, password: string) {
    const response = await requests.userRequests.login({ email, password });

    if (!response.auth && response.message) {
      setLoginFailed(true);
      const errorMessage = response.message;

      if (typeof errorMessage === "object") {
        let formattedErrorMessage = formatErrorMessage(errorMessage);
        setLoginFailedErrorMessage(formattedErrorMessage);
      } else {
        setLoginFailedErrorMessage(response.message);
      }
    } else if (response.tokens) {
      StorageManager.Tokens.set(response.tokens);
      router.replace("/");
    } else console.error("Error on authentication!");
  }

  function formatErrorMessage(errorMessage: string[]) {
    let formattedErrorMessage = "";

    errorMessage.forEach((message) => {
      const messageWithFirstLetterUpCase =
        message[0].toLocaleUpperCase() + message.substring(1);
      formattedErrorMessage += " / " + messageWithFirstLetterUpCase;
    });
    formattedErrorMessage = formattedErrorMessage.substring(3);
    return formattedErrorMessage;
  }

  return (
    <div className={styles.main}>
      <h1>Bem-vindo!</h1>
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
        <Button
          variant="contained"
          onClick={() => login(emailInput, passwordInput)}
          style={{ marginTop: "2vh" }}
        >
          Entrar
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.replace("/signup")}
          style={{ marginTop: "5vh" }}
        >
          Cadastre-se!
        </Button>
        <div className={styles.itsFreeText}>É gratis :)</div>
      </div>
      <div className={styles.errorMessage}>{loginFailedErrorMessage}</div>
    </div>
  );
}
