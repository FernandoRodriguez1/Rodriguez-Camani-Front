import api from "../API/api-hook";

export const LoginUser= async()=> {return await api.get('User/get-users')}
