import ActionProvider from "./ActionProvider";
import { ReceivedMessage } from "../../../types";

class MessageParser {
    actionProvider: ActionProvider;
    state: any;

    constructor(actionProvider: ActionProvider, state: any) {
      this.actionProvider = actionProvider;
      this.state = state;
    }
  
    parse(message: any) {
      console.log('Recceived')
      this.actionProvider.sendMessage(message)
    }

    receiveFromSignalr(message: ReceivedMessage){
      console.log(message)
      this.actionProvider.receiveFromSignalrHandler(message)
    }
  }
  
  export default MessageParser;
