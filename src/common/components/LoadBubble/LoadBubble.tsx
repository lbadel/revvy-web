import React from "react";

import "./LoadBubble.css";

const LoadBubble = (props:any) => {
    const [disable, setDisable] = React.useState(false);
    console.log(props)
    const options: { text: string; handler: any; id: string; }[] = []
        options.push({
            text: 'Load more messages',
            handler: props.actionProvider.loadMoreMessages,
            id : props.state.messages[0].message
        });

    async function disableAndSend (optionId: string) {
        setDisable(true)
        console.log(optionId)
        await props.actionProvider.loadMoreMessages(optionId);
      };

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={() => disableAndSend(option.id)} disabled={disable} className="option-button">
          {option.text}
        </button>
      ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default LoadBubble;
