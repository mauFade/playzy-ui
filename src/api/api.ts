import Cookies from "js-cookie";
import { SessionPageResponse } from "./dto/sessions";

class Api {
  public async login(data: {
    email: string;
    password: string;
  }): Promise<{ user_id: string; token: string }> {
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
    const token = Cookies.get("jwtToken");
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
}

export const api = new Api();
