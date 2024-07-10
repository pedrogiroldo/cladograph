"use client";

import Navbar from "@/components/Navbar/Navbar";
import styles from "./styles.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function User() {
  const router = useRouter();

  const [user, setUser] = useState<object | null>(null);

  const [nameInput, setNameInput] = useState("");
  function setNameInputFunc(e: any) {
    setNameInput(e.target.value);
  }
  const [emailInput, setEmailInput] = useState("");
  function setEmailInputFunc(e: any) {
    setEmailInput(e.target.value);
  }
  const [usernameInput, setUsernameInput] = useState("");
  function setUsernameInputFunc(e: any) {
    setUsernameInput(e.target.value);
  }
  const [newPasswordInput, setNewPasswordInput] = useState("");
  function setNewPasswordInputFunc(e: any) {
    setNewPasswordInput(e.target.value);
  }
  const [newPasswordConfirmInput, setNewPasswordConfirmInput] = useState("");
  function setNewPasswordConfirmInputFunc(e: any) {
    setNewPasswordConfirmInput(e.target.value);
  }

  const [isSaved, setIsSaved] = useState(false);

  function saveUser() {
    setIsSaved(true);
  }

  useEffect(() => {
    getUserDataOrRedirect();
  });

  function getUserDataOrRedirect() {
    if (isLogged()) {
      //@ts-ignore (condition verified with isLogged function)
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      router.replace("/login");
    }
  }

  function isLogged() {
    const localStorageUser = localStorage.getItem("user");
    return localStorageUser ? true : false;
  }

  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.actionArea}>
        <div className={styles.icon}>
          <FaRegUserCircle style={{ width: "100%", height: "100%" }} />
        </div>
        <div className={styles.fields}>
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
            value={usernameInput}
            style={{ marginTop: "2.5vh" }}
            variant={"filled"}
            label="Nome de Usuário"
            onChange={setUsernameInputFunc}
          />
          <TextField
            value={newPasswordInput}
            style={{ marginTop: "2.5vh" }}
            variant={"filled"}
            label="Nova senha"
            onChange={setNewPasswordInputFunc}
          />
          <TextField
            value={newPasswordConfirmInput}
            style={{ marginTop: "2.5vh" }}
            variant={"filled"}
            label="Confirmar nova senha"
            onChange={setNewPasswordConfirmInputFunc}
          />
          {isSaved ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => saveUser()}
              style={{ marginTop: "2vh" }}
            >
              Salvar
            </Button>
          ) : (
            <Button
              variant="outlined"
              onClick={() => saveUser()}
              style={{ marginTop: "2vh" }}
            >
              Salvar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
