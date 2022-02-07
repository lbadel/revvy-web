import { get_history } from "../components/chatbot/configs/constants";

async function GetHistory(memberId: string, chatId: string, lastMessage?: number) {
    console.log("Getting history")
    console.log(get_history(memberId, chatId))
    let response: any
    await fetch(
    get_history(memberId, chatId))
    .then(res => {response = res.json()})
    .catch(() => {
      console.log("Fetch chat history request error");
    }); 
    return response;
}

export default GetHistory;