import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {

    const [ox, setOx] = useState("Тип");
	const [oy, setOy] = useState([true, false])
    const [chartType, setChartType] = useState("Точечная диаграмма");
    const [error, setError] = useState("");

    const handleSubmit = (event) => {        
        event.preventDefault();

        const newOy = [
            event.target["oy"][0].checked,
            event.target["oy"][1].checked
        ];

        if (!newOy[0] && !newOy[1]){
            setError("Выберите значение по оси OY");
            return;
        }

        setError("");
        setOx(event.target["ox"].value);
        setOy(newOy);
        setChartType(event.target["chartType"].value); //по идее должна появиться ошибка, если я еще в select кину
    }

        const createArrGraph =(data, key)=>{   
        const groupObj = d3.group(data, d => d[key]); // не понял задания???
        let arrGraph =[];
        for(let entry of groupObj) {
            let minMax = d3.extent(entry[1].map(d => d['Высота, см']));
            arrGraph.push({labelX: entry[0], values: minMax});
        }

        if (key == "Год"){
            arrGraph.sort((a,b) => Number(a.labelX) - Number(b.labelX));
        }
        return arrGraph;	
    }
   return (
    <>
      <h4>Визуализация</h4>
      <form onSubmit={ handleSubmit}>
        <p> Значение по оси OX: </p>
		<div>    
          <input type="radio" name="ox" value="Тип" defaultChecked={ ox === "Тип" }/>
		  Тип
		  <br/>
          <input type="radio" name="ox" value="Регион"/>
		  Регион
		  <br/>	
          <input type="radio" name="ox" value="Год" />
		  Год
		</div>

        <p> Значение по оси OY </p>
		<div>
          <input type="checkbox" name="oy" defaultChecked={ oy[0] === true } />
		  Максимальная высота воды<br/>
          <input  type="checkbox" name="oy" />
		  Минимальная высота воды
		</div>

        <p>Тип диаграммы </p>
        <select name = "chartType" defaultValue={chartType}>
            <option value = "Точечная диаграмма"> Точечная диаграмма</option>
            <option value = "Гистограмма">Гистограмма</option>
        </select>

        <p>  
          <button type="submit">Построить </button>
        </p>
      </form>
      {error && <p style={{color:"red"}}>{error}</p>} 
      <ChartDraw 
      data={ createArrGraph(props.data, ox) }
      oy ={ oy }
      chartType = {chartType} 
      />  
	</>
    )
}

export default Chart;