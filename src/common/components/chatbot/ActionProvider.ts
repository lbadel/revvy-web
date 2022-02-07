import { IMessage } from "react-chatbot-kit/build/src/interfaces/IMessages";
import { from } from "rxjs";
import { ReceivedMessage, SentMessage } from "../../../types";
import SendMessage from "../../api/message.service";
import HistoryHelper from "../../helpers/HistoryHelper";
import { messageService } from "../../helpers/MessageServices";
import SignalrSendingHelper from "../../helpers/SignalrSendingHelper";

class ActionProvider {
    [x: string]: any;
    constructor(
     createChatBotMessage: any,
     setStateFunc: any,
     createClientMessage: any,
     stateRef: any,
     createCustomMessage: any,
     ...rest: any[]
   ) {
     this.createChatBotMessage = createChatBotMessage;
     this.setState = setStateFunc
     this.createClientMessage = createClientMessage;
     this.stateRef = stateRef;
     this.createCustomMessage = createCustomMessage;
     if (this.stateRef) {
      console.log('entered')
      console.log(this.stateRef.signalrConnection)
      // if (!this.stateRef.signalrConnection){
      //     const subscription = messageService.getMessage().subscribe(message => {
      //     console.log(message as ReceivedMessage)
      //     this.receiveFromSignalrHandler(message as ReceivedMessage)
      //   })
      // }
  }
   }

   connectToSignalR = () => {
     console.log(this.stateRef)
    if (this.stateRef) {
        if (this.stateRef.signalrConnection === false){
            const subscription = messageService.getMessage().subscribe(message => {
            console.log(message as ReceivedMessage)
            this.receiveFromSignalrHandler(message as ReceivedMessage)
          })
        }
    }

   }

   receiveFromSignalrHandler = (message : ReceivedMessage) => {
    console.log(message)
    console.log(this.stateRef)
    if (message.body.options.length > 0) {
      this.storeOptions(message.body.options)
      const receivedMessage = this.createChatBotMessage(
        message.body.text,
        {
          widget: "options",
        }
      );
      this.setChatbotMessage(receivedMessage)
    }else{
      const receivedMessage = this.createChatBotMessage(message)
      this.setChatbotMessage(receivedMessage)
    }
  }

  loadMoreMessages = (messageId: string) => {
    this.deleteLoadMoreBubble()
    var subscription = from(HistoryHelper(this.stateRef.memberId, this.stateRef.chatId, parseInt(messageId))).subscribe(result=> {
      this.setChatbotPrevMessage(result)
    })
    console.log('After Modify')
    console.log(this.stateRef)
    return () => subscription.unsubscribe()
  }

  deleteLoadMoreBubble = () => {
    this.setState((prev: { messages: any; }) => {
      const deletedBubbleMessages = prev.messages.slice(1); 
      return {
        ...prev,
        messages : [deletedBubbleMessages]
      }
    })
  }

  sendMessage = (message: any, optionId?: string) => {
    const messageToSend: SentMessage = {
      memberId: this.stateRef.memberId,
      chatId: this.stateRef.chatId,
      body: {
        text: message,
        options: optionId ? [optionId] : []
      }
    }
    SendMessage(messageToSend)
  }

  setChatbotMessage = (message: any) => {
    this.setState((prev: { messages: any; }) => {
      return {
        ...prev,
        messages : [...prev.messages, message]
      }
    })
  }

  setChatbotPrevMessage = (message: IMessage[]) => {
    console.log(message)
    this.setState((prev: { messages: any; }) => {
      const result = message.concat(...prev.messages)
      console.log('result: ')
      console.log(result)
      console.log(message)
      console.log(prev.messages)
      return {
        ...prev,
        messages : result,
      }
    })
  }

  storeOptions = (options: any) => {
    console.log(options)
    this.setState((prev: { options: any; }) => {
      return {
        ...prev,
        options: options
      }
    })
  }

  handleOptionSelected = (optionId: string, optionName: string) => {
    console.log(optionId)
    const receivedMessage = this.createClientMessage(optionName)
    this.setChatbotMessage(receivedMessage)
    //TODO: Invoke method to send message
  }

 }
 
 export default ActionProvider;