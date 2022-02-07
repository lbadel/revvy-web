import React from "react";

import "./Options.css";

const Options = (props:any) => {
    const [disable, setDisable] = React.useState(false);
    console.log(props)
    const options: { text: string; handler: any; id: string; }[] = []
    props.options.forEach((option: any) => {
        options.push({
            text: option.text,
            handler: props.actionProvider.handleOptionSelected,
            id : option.optionId
        })
    });

    const disableAndSend = (optionId: string, optionName: string) => {
        setDisable(true)
        console.log(optionId)
        props.actionProvider.handleOptionSelected(optionId, optionName);
      };

    const buttonsMarkup = options.map((option) => (
        <button key={option.id} onClick={() => disableAndSend(option.id, option.text)} disabled={disable} className="option-button">
          {option.text}
        </button>
      ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default Options;
