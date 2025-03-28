import { getCookie } from "cookies-next";

import {
  CreateSessionRequestInterface,
  CreateSessionResponseInterface,
  SessionPageResponseInterface,
} from "./dto/sessions";
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
        ...data,
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

  public async getSessions(
    page = 1,
    selectedGame: string | null,
    rank: string | null
  ): Promise<SessionPageResponseInterface> {
    const token = getCookie("jwtToken");

    // const url = "http://localhost:8080/sessions?page=" + page;

    const params = new URLSearchParams({
      page: page.toString(),
    });

    if (selectedGame) {
      params.append("game", selectedGame);
    }

    if (rank) {
      params.append("rank", rank);
    }

    const response = await fetch(
      `http://localhost:8080/sessions?${params.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${token}`,
        },
      }
    );

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
        ...data,
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

  public async createSession(
    data: CreateSessionRequestInterface
  ): Promise<CreateSessionResponseInterface> {
    const token = getCookie("jwtToken");

    const response = await fetch("http://localhost:8080/sessions", {
      method: "POST",
      body: JSON.stringify({
        ...data,
      }),
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
}

export const api = new Api();
