import './CSS/App.css';
import floods from './data.js';
import Table from './components/Table.js';

function App() {
  return (
    <div className="App">
      <h3>Крупные наводнения России</h3>
      <Table data={floods} amountRows="10" pagination="1" />
    </div>
  );
}

export default App;