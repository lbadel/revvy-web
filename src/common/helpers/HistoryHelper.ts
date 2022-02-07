import { createChatBotMessage, createClientMessage, createCustomMessage } from "react-chatbot-kit";
import { IMessage } from "react-chatbot-kit/build/src/interfaces/IMessages";
import { ApiChatHistoryResponse } from "../../types";
import GetHistory from "../api/history.service";

async function HistoryHelper(memberId: string, chatId: string, lastMessage?: number) {
    console.log("Getting history")
    console.log(`memberId: ${memberId}, chatId: ${chatId}, lastMessage: ${lastMessage}`)
    const messages : IMessage[] = []
    await GetHistory(memberId, chatId, lastMessage)
    .then(data => {
      const response: any = data;
      console.log(response)
      if (response) {
        console.log("success")
        const end = response as ApiChatHistoryResponse
        console.log(end)
        if(end.lastMessageNumber > 1){
          const loadMessage = 
          createCustomMessage(end.lastMessageNumber.toString(), 'custom', {})
          messages.push(loadMessage)
        }
        if(!lastMessage) {
          const receiver = createCustomMessage('','receiver',{})
          messages.push(receiver)
        }
        end.messages.forEach( (value) => {
          let message
          console.log(Boolean(value.fromMe))
          if(Boolean(value.fromMe)) {
            message = createClientMessage(value.body.text, {})
          }else{
            message = createChatBotMessage(value.body.text, {})
          }
          messages.push(message)
      });
      console.log(messages);
      } else if (!response) {
        console.log("failed")
        messages.push(createChatBotMessage(`Hello there`, {}))
      }
    })
    return messages
     
}

export default HistoryHelper;