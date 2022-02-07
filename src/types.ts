export type ApiHeader = {
    key: string;
    value: string;
  };
  
  export type KeyValue<T, U> = {
    key: T,
    value: U,
  };
  
  export type ApiMethod = "POST" | "GET";
  
  export type ArticleCategory = "Typescript" | "React" | "Rust";
  
  export type ApiRequestAuthor = {
    author: string,
    category: ArticleCategory,
  };
  
  export type ApiResult = "success" | "failure";
  
  export type ApiError = {
    ErrorCode: string,
    Description: string,
  };
  
  export type ApiResponse<T> = {
    Result: ApiResult,
    Response: T | ApiError,
  };
  
  export type ApiChatHistoryResponse = {
    lastMessageNumber: number,
    messages: ReceivedMessage[]
  };
  export type ReceivedMessage = {
    memberId : string,
    chatId: string,
    messageId: string,
    messageNumber: number,    
    messageType: string,
    author: string,
    authorType: string,
    fromMe: Boolean, 
    time: Date,
    body: ReceivedBody,
  };

  export type ReceivedBody = {
    text: string,
    options: Option[],
    isAnswered: boolean
  }

  export type Option = {
    optionId: string,
    text: string,
    isSelected: boolean
  }

  export type SentMessage = {
    memberId: string,
    chatId: string,
    body: SentBody
  }
  export type SentBody = {
    text: string,
    options: string[]
  }