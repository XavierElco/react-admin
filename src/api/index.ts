import type { ILoginParams } from "../types/index";
import request from "../utils/request";

export default {
    login: (params: ILoginParams) => {
        return request.post('/users/login', params)
    }
}