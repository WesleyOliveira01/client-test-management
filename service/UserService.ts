import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export class UserService {
  constructor(private token?: string) {
    this.token = token;
  }
  GetAllUser() {
    return api.get("/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: this.token,
      },
    });
  }

  GetUserById(id: number) {
    return api.get(`/users/${id}`);
  }

  CreateUser(data: any) {
    return api.post("/users", data);
  }

  DisableUser(id: number) {
    return api.put(
      `/users/${id}/disable`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: this.token,
        },
      }
    );
  }
}
