import endpoint from "./endpoint.json"
import { API_URL, API_KEY, USER_NAME } from "../constant/globalConstant"

const BookTime = async (start: Date, end: Date) => {
    const headers = {
        "accept": "*/*",
        "content-type": "application/json",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin"
    };
    const body = {
        "responses": {
            "email": "nakamurachassity@gmail.com",
            "name": "Chassity Nakamura",
            "guests": []
        },
        "user": USER_NAME,
        "start": start.toISOString(),
        "end": end.toISOString(),
        "eventTypeId": 3,
        "timeZone": "America/Chicago",
        "language": "en",
        "metadata": {}
    }

    return await fetch(`${API_URL}${endpoint.BOOK_TIME}?apiKey=${API_KEY}`, {
        "headers": headers,
        "body": JSON.stringify(body),
        "method": "POST",
        "mode": "cors",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "credentials": "include"
    }).then((response) => response.json())
      .then((response) => response)
      .catch((e) => console.error(e));
}

export default BookTime;