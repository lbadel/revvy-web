import React from "react";
import 'react-chatbot-kit/build/main.css';
import "./RevvyChatbot.css";
import config from './configs/config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';
import HistoryHelper from "../../helpers/HistoryHelper";
import { IMessage } from "react-chatbot-kit/build/src/interfaces/IMessages";
import Chatbot from "react-chatbot-kit";
import { from } from 'rxjs';
import ReactDOM from "react-dom";

type Props = {
  memberId: string,
  chatId: string
};

const RevvyChatbot: React.FC<Props> = ({
  memberId,
  chatId
}) => {
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  config.state = {memberId: memberId, chatId:chatId, options: []}
  
  React.useEffect(() => {
    var subscription = from(HistoryHelper(memberId, chatId)).subscribe(result=> {
      setMessages(result)
    })
    return () => subscription.unsubscribe()
  }, [])

  return (

    <div style={{
      position: 'fixed',
      right: '25px',
      bottom: '50px',
      boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px'
    }}>
      {messages.length < 1 ? 'Loading' : <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
        messageHistory={messages}
        runInitialMessagesWithHistory={true}
      />}
       
    </div>

  );

};


export default RevvyChatbot