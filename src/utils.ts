import { createChatBotMessage } from "react-chatbot-kit";
import { ReceivedMessage } from "./types";

export const receiveFromSignalrHandler = (message : ReceivedMessage) => {
    if (message.body.options.length > 0) {
      const receivedMessage = createChatBotMessage(
        message.body.text,
        {
          widget: "options",
        }
      );
      return receivedMessage;
      
    }else{
      const receivedMessage = createChatBotMessage(message.body.text, {})
      return receivedMessage;
    }
}

// export const receiveExternalMessages = (messageParser: MessageParser) => {
//     if(messageParser.state && messageParser.state.signalrConnection === false) {
//         console.log(messageParser.state.signalrConnection)
//         var subscription = messageService.getMessage().subscribe(message => {
//             console.log(message)
//             if (message){
//               messageParser.receiveFromSignalr(message)
//               console.log(message)
//             //   setMessages([...messages, receiveFromSignalrHandler(message as ReceivedMessage)])
//             }
//         })
//     }
// }
    
