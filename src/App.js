import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p Please wait few seconds after clicking the link to view the content of table. /p>
        <a
          className="App-link"
          href="http://reactapps3pratheek.s3-website-us-east-1.amazonaws.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click to Open the Project
        </a>
      </header>
    </div>
  );
}

export default App;
