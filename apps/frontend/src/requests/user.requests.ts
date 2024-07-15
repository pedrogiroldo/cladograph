import StorageManager from "@/utils/storageManager/storageManager.util";

interface UserUpdateDto {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
}
interface LoginUserDto {
  email: string;
  password: string;
}

interface SignUpUserData {
  name: string;
  email: string;
  password: string;
}

interface ResponseBody {
  auth: boolean;
  tokens: Tokens | undefined;
  message?: string | Array<string>;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export default class UserRequests {
  private baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;

  public async updateUser(id: string, userUpdateData: UserUpdateDto) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userUpdateData),
    });

    const responseBody = await response.json();

    if (responseBody.message) {
      return { message: responseBody.message };
    } else {
      return responseBody;
    }
  }
  public async login(loginUserData: LoginUserDto): Promise<ResponseBody> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(loginUserData),
    });

    const responseBody: any = await response.json();

    if (responseBody.auth === true) {
      return { auth: true, tokens: responseBody.tokens };
    } else if (responseBody.auth === false) {
      return { auth: false, tokens: undefined, message: responseBody.message };
    } else {
      return { auth: false, tokens: undefined, message: responseBody.message };
    }
  }

  public async signUp(signUpUserData: SignUpUserData): Promise<ResponseBody> {
    const response = await fetch(`${this.baseUrl}/signup`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(signUpUserData),
    });

    const responseBody: any = await response.json();

    if (responseBody.auth === true) {
      return { auth: true, tokens: responseBody.tokens };
    } else if (responseBody.auth === false) {
      return { auth: false, tokens: undefined, message: responseBody.message };
    } else {
      return { auth: false, tokens: undefined, message: responseBody.message };
    }
  }

  public async fetchUser() {
    const accessToken = StorageManager.Tokens.getAccess();

    const response = await fetch(this.baseUrl, {
      method: "GET",
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const responseBody = await response.json();

    if (responseBody.message) {
      return { message: responseBody.message };
    } else {
      return responseBody;
    }
  }
}
