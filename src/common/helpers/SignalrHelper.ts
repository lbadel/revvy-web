import {useEffect, useState} from 'react';
import * as signalR from "@microsoft/signalr";
import MessageParser from '../components/chatbot/MessageParser';
import { ReceivedMessage } from '../../types';
import { Subject } from 'rxjs';
import { messageService } from './MessageServices';


const SignalrHelper = () => {
  const [ connection, setConnection ] = useState<signalR.HubConnection | null>(null);
  const subject = new Subject();

  console.log("executed")
  console.log()
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
        .withUrl('http://localhost:61677/chatHub')
        .withAutomaticReconnect()
        .build();

    setConnection(newConnection);
  }, []);

  useEffect(() => {
    if (connection) {
      // if(messageParser.actionProvider){
      //   messageParser.actionProvider.setState((prev: { signalrConnection: any; }) => {
      //     return {
      //       ...prev,
      //       signalrConnection : connection
      //     }
      //   })
      // }
      console.log('Trying to connect!');
        connection.start()
            .then(result => {
                console.log('Connected!');

                connection.on('MessageFromServer', (user, message) => {
                  console.log("message received " + message)
                  const result: ReceivedMessage = {
                    memberId: "",
                    chatId: "",
                    messageId : "5",
                    messageNumber: 0,
                    messageType : "selector",
                    author : "bot",
                    authorType : "bot",
                    fromMe: false,
                    body: {
                    text : "Select one of the following choices.",
                    isAnswered: false,
                    options: [
                        {
                            optionId: "1",
                            text: "Option1",
                            isSelected: false
                        },
                        {
                            optionId: "2",
                            text: "Option2",
                            isSelected: false
                        }
                    ]
                    },
                    time: new Date,
                }
                console.log(result)
                messageService.sendMessage(result);
                // messageParser.receiveFromSignalr(result)
                });
            })
            .catch(e => console.log('Connection failed: ', e));
    }
  }, [connection]);

 
//   return <>
         
//   </>;
};

export default SignalrHelper;
