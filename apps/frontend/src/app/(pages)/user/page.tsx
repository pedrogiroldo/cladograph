"use client";
import styles from "./styles.module.css";
import { FaRegUserCircle } from "react-icons/fa";
import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StorageManager from "@/utils/storageManager/storageManager.util";
import Requests from "@/requests/requests";

export default function User() {
  const router = useRouter();
  const requests = new Requests();

  const [user, setUser] = useState<any | null>(null);

  const [updateFailed, setUpdateFailed] = useState(false);
  const [equalPasswordsError, setEqualPasswordsError] = useState(false);
  const [updateFailedErrorMessage, setUpdateFailedErrorMessage] = useState("");

  const [nameInput, setNameInput] = useState(undefined);
  function setNameInputFunc(e: any) {
    setNameInput(e.target.value);
  }
  const [emailInput, setEmailInput] = useState(undefined);
  function setEmailInputFunc(e: any) {
    setEmailInput(e.target.value);
  }
  const [newPasswordInput, setNewPasswordInput] = useState(undefined);
  function setNewPasswordInputFunc(e: any) {
    if (e.target.value === "") {
      setNewPasswordInput(undefined);
    } else {
      setNewPasswordInput(e.target.value);
    }
  }
  const [newPasswordConfirmInput, setNewPasswordConfirmInput] =
    useState(undefined);
  function setNewPasswordConfirmInputFunc(e: any) {
    if (e.target.value === "") {
      setNewPasswordConfirmInput(undefined);
    } else {
      setNewPasswordConfirmInput(e.target.value);
    }
  }

  const [isSaved, setIsSaved] = useState(false);

  async function saveUser() {
    const isPasswordsEqual = verifyIfPasswordsAreEqual(
      newPasswordInput,
      newPasswordConfirmInput
    );

    if (user !== null && isPasswordsEqual) {
      const response = await requests.userRequests.updateUser(user.id, {
        email: emailInput,
        name: nameInput,
        password: newPasswordInput,
      });
      if (response.message) {
        handleErrorMessage(response.message);
      } else {
        setIsSaved(true);
        setUpdateFailed(false);
        setEqualPasswordsError(false);
        setUpdateFailedErrorMessage("");
      }
    } else {
      setIsSaved(false);
      setUpdateFailed(true);
      setEqualPasswordsError(true);
      setUpdateFailedErrorMessage("A senhas precisam ser iguais!");
    }
  }

  function verifyIfPasswordsAreEqual(
    password: string | undefined,
    confirmPassword: string | undefined
  ) {
    if (password !== confirmPassword) {
      throwPasswordsAreNotEqualError();
      return false;
    } else {
      setEqualPasswordsError(false);
      setUpdateFailed(false);
      setUpdateFailedErrorMessage("");
      return true;
    }
  }

  function throwPasswordsAreNotEqualError() {
    setEqualPasswordsError(true);
    setUpdateFailedErrorMessage("As senhas precisam ser iguais!");
  }

  useEffect(() => {
    getUserDataOrRedirect();
  }, []);

  async function getUserDataOrRedirect() {
    if (isLogged()) {
      const response = await requests.userRequests.fetchUser();

      if (response.message) {
        handleErrorMessage(response.message);
      } else {
        setNameInput(response.name);
        setEmailInput(response.email);
        setUser(response);
      }
    } else {
      router.replace("/login");
    }
  }

  function handleErrorMessage(errorMessage: string | Array<string>) {
    if (typeof errorMessage === "object") {
      let formattedErrorMessage = formatErrorMessage(errorMessage);
      setIsSaved(false);
      setUpdateFailed(true);
      setUpdateFailedErrorMessage(formattedErrorMessage);
    } else {
      setIsSaved(false);
      setUpdateFailed(true);
      setUpdateFailedErrorMessage(errorMessage);
    }
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

  function isLogged() {
    return StorageManager.Tokens.isSaved();
  }

  return (
    <div className={styles.main}>
      <div className={styles.actionArea}>
        <div className={styles.icon}>
          <FaRegUserCircle style={{ width: "100%", height: "100%" }} />
        </div>
        <div className={styles.fields}>
          <TextField
            value={nameInput}
            className={styles.textField}
            variant={"outlined"}
            label="Nome"
            onChange={setNameInputFunc}
            focused={true}
          />
          <TextField
            value={emailInput}
            className={styles.textField}
            variant={"outlined"}
            label="E-mail"
            onChange={setEmailInputFunc}
            focused={true}
          />
          {equalPasswordsError ? (
            <>
              <TextField
                value={newPasswordInput}
                className={styles.textField}
                variant={"outlined"}
                label="Nova senha"
                onChange={setNewPasswordInputFunc}
                focused={true}
                color="error"
              />
              <TextField
                value={newPasswordConfirmInput}
                className={styles.textField}
                variant={"outlined"}
                label="Confirmar nova senha"
                size="medium"
                onChange={setNewPasswordConfirmInputFunc}
                focused={true}
                color="error"
              />
            </>
          ) : (
            <>
              <TextField
                value={newPasswordInput}
                className={styles.textField}
                variant={"outlined"}
                focused={true}
                label="Nova senha"
                onChange={setNewPasswordInputFunc}
              />
              <TextField
                value={newPasswordConfirmInput}
                className={styles.textField}
                variant={"outlined"}
                focused={true}
                label="Confirmar nova senha"
                size="medium"
                onChange={setNewPasswordConfirmInputFunc}
              />
            </>
          )}
          {isSaved ? (
            <Button
              variant="contained"
              color="success"
              onClick={() => saveUser()}
              style={{ marginTop: "2vh" }}
            >
              Salvar
            </Button>
          ) : updateFailed ? (
            <Button
              variant="outlined"
              color="error"
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
          <div className={styles.errorMessage}>{updateFailedErrorMessage}</div>
        </div>
      </div>
    </div>
  );
}
