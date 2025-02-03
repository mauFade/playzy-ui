import { getCookie } from "cookies-next";

import { SessionPageResponse } from "./dto/sessions";
import {
  CreateUserInterface,
  CreateUserResponseInterface,
  LoginInterface,
  LoginResponseInterface,
} from "./dto/users";

class Api {
  public async login(data: LoginInterface): Promise<LoginResponseInterface> {
    const response = await fetch("http://localhost:8080/auth", {
      method: "POST",
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const r = await response.json();

    if (r.message) {
      throw new Error(r.message);
    }

    return r;
  }

  public async getSessions(page = 1): Promise<SessionPageResponse> {
    const token = getCookie("jwtToken");

    const url = "http://localhost:8080/sessions?page=" + page;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${token}`,
      },
    });

    const r = await response.json();

    if (r.message) {
      throw new Error(r.message);
    }

    return r;
  }

  public async createUser(
    data: CreateUserInterface
  ): Promise<CreateUserResponseInterface> {
    const response = await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        gamertag: data.gamertag,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    const r = await response.json();

    if (r.message) {
      throw new Error(r.message);
    }

    return r;
  }
}

export const api = new Api();
