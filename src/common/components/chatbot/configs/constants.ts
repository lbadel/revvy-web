export enum APIResult {
    SUCCESS = "success",
    FAILURE = "failure",
  };
  
  export enum Endpoints {
    signalr = '',
    post_message = '',
  };

  export const get_history = (memberId: string, chatId: string) => `https://btove4bp86.execute-api.us-east-1.amazonaws.com/Prod/v1/chatbot/${memberId}/chat/${chatId}`
