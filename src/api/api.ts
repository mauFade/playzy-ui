import axios, { AxiosError, AxiosInstance } from "axios";
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
  private axios: AxiosInstance;

  constructor() {
    this.axios = axios.create({
      baseURL: "http://localhost:8080",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    this.axios.interceptors.request.use((config) => {
      const token = getCookie("jwtToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
  }

  public async login(data: LoginInterface): Promise<LoginResponseInterface> {
    try {
      const response = await this.axios.post("/auth", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  public async getSessions(
    page = 1,
    selectedGame: string | null,
    rank: string | null
  ): Promise<SessionPageResponseInterface> {
    const params = new URLSearchParams({
      page: page.toString(),
    });

    if (selectedGame) {
      params.append("game", selectedGame);
    }

    if (rank) {
      params.append("rank", rank);
    }

    try {
      const response = await this.axios.get(`/sessions?${params.toString()}`);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  public async createUser(
    data: CreateUserInterface
  ): Promise<CreateUserResponseInterface> {
    try {
      const response = await this.axios.post("/users", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  public async createSession(
    data: CreateSessionRequestInterface
  ): Promise<CreateSessionResponseInterface> {
    try {
      const response = await this.axios.post("/sessions", data);
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }

  public async updateSession(): Promise<void> {
    try {
      await this.axios.put("/sessions", { name: "test" });
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      throw error;
    }
  }
}

export const api = new Api();
