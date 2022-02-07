// Config starter code
import { createChatBotMessage } from "react-chatbot-kit"
import LoadBubble from "../../LoadBubble/LoadBubble"
import MessageReceiver from "../../MessageReceiver/MessageReceiver"
import Options from "../../Options/Options"

const config = {
  initialMessages: [createChatBotMessage(`Howdy`, {})],
  botName : 'Chat',
  customStyles: {
    botMessageBox: {
      backgroundColor: 'rgb(196, 177, 12)',
    },
    chatButton: {
      backgroundColor: 'rgb(196, 177, 12)',
    }
  },
  state: {
    memberId: '',
    chatId: '',
    options: [{optionId:'', text:'', isSelected:false}],
  },
  customMessages: {custom: (props: any) => <LoadBubble {...props} />, receiver: (props: any) => <MessageReceiver {...props} />},
  widgets:[
    {
      widgetName: "options",
      widgetFunc: (props: any) => <Options {...props} />,
      props: "options",
      mapStateToProps: ["options"],
    },
    {
      widgetName: "messageReceiver",
      widgetFunc: (props: any) => <MessageReceiver {...props} />,
      props: "options",
      mapStateToProps: ["options"],
    },
  ],
}

export default config