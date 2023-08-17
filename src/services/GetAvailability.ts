import endpoint from "./endpoint.json"
import { API_URL, API_KEY, USER_NAME } from "../constant/globalConstant"

const GetAvailability = async (dateFrom: Date, dateTo: Date) => {
    return await fetch(`${API_URL}${endpoint.GET_AVAILABILITY}?apiKey=${API_KEY}&username=${USER_NAME}&dateFrom=${dateFrom.toISOString()}&dateTo=${dateTo.toISOString()}`)
                    .then((response) => response.json())
                    .then((response) => response)
                    .catch((e) => console.error(e));
}

export default GetAvailability;