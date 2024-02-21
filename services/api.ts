import axios from "axios";

export const get = async (endPoint: string) => {
    return await axios.get(endPoint);
}