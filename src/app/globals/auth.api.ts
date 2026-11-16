import {environment} from "../Environment/environment";

const API_URL=`${environment.API_URL}/api`;

export const AuthApi ={
    login:`${API_URL}/auth/login`
}