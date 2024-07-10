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

export default class UserRequests {
  private baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/users`;

  public async updateUser(id: string, userUpdateData: UserUpdateDto) {
    await fetch(`${this.baseUrl}/${id}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(userUpdateData),
    });
  }
  public async login(userLoginData: LoginUserDto) {
    await fetch();
  }
}
