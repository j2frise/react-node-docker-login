import { User } from "src/models/user.type";
import { ErrorResponse, requestAxios } from "./requestAxios";

export interface Token {
    token: string
}

export interface LoginType {
    email: FormDataEntryValue;
    password: FormDataEntryValue;
}

export type SignUpType = {
    firstname: FormDataEntryValue,
    lastname: FormDataEntryValue,
    email: FormDataEntryValue,
    password: FormDataEntryValue;
}

export async function login(params: LoginType): Promise<Token | ErrorResponse> {
    const response: Token | ErrorResponse = await requestAxios("POST", "/auth/login", params );
    return response;
}

export async function signup(params: SignUpType) {
    const response: Token | ErrorResponse = await requestAxios("POST", "/auth/signup", params );
    return response;
}

export async function getCurrentUser(): Promise<User | ErrorResponse> {
    const response: User | ErrorResponse = await requestAxios("GET", "/auth/connected");
    return response;
}