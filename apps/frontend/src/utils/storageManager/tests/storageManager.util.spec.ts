/**
 * @jest-environment jsdom
 */
import StorageManager from "../storageManager.util";
import { mockedTokens } from "./mockedVars";

describe("Storage token tests", () => {
  test("Set token to cookies and get them and delete them", () => {
    StorageManager.Token.set(mockedTokens);

    const tokens = StorageManager.Token.get();

    expect(tokens).toEqual(mockedTokens);

    StorageManager.Token.delete();

    const tokensAfterDelete = StorageManager.Token.get();

    expect(tokensAfterDelete).toEqual(null);
  });

  test("Verify if a token was saved", () => {
    const verificationBeforeSaving = StorageManager.Token.isSaved();
    expect(verificationBeforeSaving).toEqual(false);

    StorageManager.Token.set(mockedTokens);

    const verificationAfterSaving = StorageManager.Token.isSaved();
    expect(verificationAfterSaving).toEqual(true);
  });
});
