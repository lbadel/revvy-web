import React from "react";
import { messageService } from "../../helpers/MessageServices";

const MessageReceiver = (props:any) => {
  console.log("entereeeeed")
  React.useEffect(() => {
    var subscription = messageService.getMessage().subscribe(message => {
      console.log(message)
      if (message){
        props.actionProvider.receiveFromSignalrHandler(message);
      }
    })
    return () => subscription.unsubscribe()
  }, [])

    // async function disableAndSend (optionId: string) {
    //     setDisable(true)
    //     console.log(optionId)
    //     await props.actionProvider.loadMoreMessages(optionId);
    //   };

  return <> </>;
};

export default MessageReceiver;
