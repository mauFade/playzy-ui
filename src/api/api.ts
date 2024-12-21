class Api {
  private baseUrl: string;

  constructor() {
    this.baseUrl = "http://localhost:8080";
  }

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
}

export const api = new Api();
