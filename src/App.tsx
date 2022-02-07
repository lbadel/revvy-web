import React from 'react';
import logo from './logo.svg';
import RevvyChatbot from './common/components/chatbot/RevvyChatbot';
import './App.css';
import SignalrHelper from './common/helpers/SignalrHelper';

function App() {

  const [id, setId] = React.useState<string>("5");
  SignalrHelper()
      
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <RevvyChatbot
      memberId={'b88ae818-6c2f-4f3f-88e0-4e06b6131ff7'}
      chatId={'67822232-f983-4441-934e-6b79e944abcd'}/>
    </div>
  );
}

export default App;
