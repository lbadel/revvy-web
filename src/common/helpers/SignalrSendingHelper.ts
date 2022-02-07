const SignalrSendingHelper = async (stateRef : any, message : string) => {

  console.log(stateRef)
  console.log(stateRef.messages[stateRef.messages.length - 1])
  if (stateRef.signalrConnection) {
    try {
        console.log(stateRef.messages);
        await stateRef.signalrConnection.send('SendMessage', "user", message);
    }
    catch(e) {
        console.log(e);
    }
  }
  else {
      alert('No connection to server yet.');
  }
  
    // return <>
          
    // </>;
  };

export default SignalrSendingHelper;
