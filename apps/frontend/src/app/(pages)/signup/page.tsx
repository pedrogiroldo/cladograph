"use client";
import { Button, TextField } from "@mui/material";
import styles from "./styles.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Requests from "@/requests/requests";
import StorageManager from "@/utils/storageManager/storageManager.util";

interface SignUpUserData {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const requests = new Requests();

  const [signUpFailed, setSignUpFailed] = useState(false);

  const [emailInput, setEmailInput] = useState("");
  function setEmailInputFunc(e: any) {
    setEmailInput(e.target.value);
  }

  const [nameInput, setNameInput] = useState("");
  function setNameInputFunc(e: any) {
    setNameInput(e.target.value);
  }

  const [passwordInput, setPasswordInput] = useState("");
  function setPasswordInputFunc(e: any) {
    setPasswordInput(e.target.value);
  }

  const [confirmPasswordInput, setConfirmPasswordInput] = useState("");
  function setConfirmPasswordInputFunc(e: any) {
    setConfirmPasswordInput(e.target.value);
  }

  async function signUp({ name, email, password }: SignUpUserData) {
    const auth = await requests.userRequests.signUp({ name, email, password });

    if (!auth.auth) {
      setSignUpFailed(true);
    } else if (auth.tokens) {
      StorageManager.Tokens.set(auth.tokens);
      router.replace("/");
    } else console.error("Error on authentication!");
  }

  return (
    <div className={styles.main}>
      <h1>Bem-vindo!</h1>
      <div className={styles.actionArea}>
        <TextField
          value={nameInput}
          style={{ marginTop: "2.5vh" }}
          variant={"filled"}
          label="Nome"
          onChange={setNameInputFunc}
        />
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
        <TextField
          value={confirmPasswordInput}
          style={{ marginTop: "2.5vh" }}
          variant={"filled"}
          label="Confirmar senha"
          onChange={setConfirmPasswordInputFunc}
        />
        <Button
          variant="contained"
          onClick={() =>
            signUp({
              name: nameInput,
              email: emailInput,
              password: passwordInput,
            })
          }
          style={{ marginTop: "2vh" }}
        >
          Cadastrar
        </Button>
        <Button
          variant="outlined"
          onClick={() => router.replace("/login")}
          style={{ marginTop: "5vh" }}
        >
          Faça login!
        </Button>
      </div>
    </div>
  );
}
