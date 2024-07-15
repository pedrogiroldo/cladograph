/**
 * @jest-environment jsdom
 */
import StorageManager from "../storageManager.util";
import { mockedTokens } from "./mockedVars";

describe("Storage token tests", () => {
  test("Set token to cookies and get them and delete them", () => {
    StorageManager.Tokens.set(mockedTokens);

    const tokens = StorageManager.Tokens.getAccess();

    expect(tokens).toEqual(mockedTokens.accessToken);

    StorageManager.Tokens.delete();

    const tokensAfterDelete = StorageManager.Tokens.getAccess();

    expect(tokensAfterDelete).toEqual(undefined);
  });

  test("Verify if a token was saved", () => {
    const verificationBeforeSaving = StorageManager.Tokens.isSaved();
    expect(verificationBeforeSaving).toEqual(false);

    StorageManager.Tokens.set(mockedTokens);

    const verificationAfterSaving = StorageManager.Tokens.isSaved();
    expect(verificationAfterSaving).toEqual(true);
  });
});
