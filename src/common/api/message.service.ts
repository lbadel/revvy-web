import { SentMessage } from "../../types";
import { Endpoints } from "../components/chatbot/configs/constants";

async function SendMessage(request: SentMessage) {
    console.log("Send Message")
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request)
  };
    let response: any
    await fetch(
    Endpoints.post_message, requestOptions)
    .then(res => {response = res.json()})
    .catch(() => {
      console.log("Fetch chat history request error");
    }); 
    return response;
}

export default SendMessage;