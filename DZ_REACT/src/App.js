import './CSS/App.css';
import { floods } from './data.js';
import Table from './components/Table.js';
import Chart from './components/Chart.js';
import {useState} from "react";

function App() {
  const[dataTable, setDataTable] = useState(floods);

  const updateDataTable = (value) => {
    setDataTable(value);
  }

  return (
    <div className="App">
       <h3>Самые сильные наводнения</h3>

       <Chart data={ dataTable } />
       <Table data={ floods } amountRows="30" pagination="1" filtering = {updateDataTable} />
    </div>
  );
}

export default App;