import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react"; // добавил новый хук useMemo , тут их 4 

const ChartDraw = (props) => {
	const chartRef = useRef(null);

	
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

    	// задаем отступы в svg-элементе
	const  margin = {
		top:10, 
		bottom:60, 
		left:40, 
		right:10
	};

	// заносим в состояния ширину и высоту svg-элемента
	useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
		setHeight(parseFloat(svg.style('height')));
    }); 

	// вычисляем ширину и высоту области для вывода графиков
    const boundsWidth = width -  margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    let arrValues = [];

    if(props.oy[0]) {
        arrValues = arrValues.concat(props.data.map(d => d.values[1])); // максимальная высота
    }
    if(props.oy[1]) {
        arrValues = arrValues.concat(props.data.map(d => d.values[0])); // минимальная высота
    }

    let [min, max] = d3.extent(arrValues);

	// формируем шкалы для осей
    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0,boundsWidth])
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1 ])
            .range([boundsHeight, 0])
    }, [boundsHeight, min, max]);


	useEffect(() => { // тут новая часть с шага 3
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();


        const O = 5;

        // рисуем оси
        const xAxis = d3.axisBottom(scaleX);     
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", d => "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        if (props.chartType === "Точечная диаграмма"){
            if (props.oy[0]){
                svg .selectAll(".dotMax")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 - O)
                    .attr("cy", d => scaleY(d.values[1]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red")
            }
            if (props.oy[1]){
                svg .selectAll(".dotMin")
                    .data(props.data)
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2 + O)
                    .attr("cy", d => scaleY(d.values[0]))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")
            }
            
        }
        if (props.chartType === "Гистограмма"){
            if(props.oy[0]) {
                svg .selectAll(".barMax")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX))
                    .attr("y", d => scaleY(d.values[1]))

                    .attr("width",props.oy[1] ? scaleX.bandwidth() / 2 - O: scaleX.bandwidth())
                    .attr("height", d => boundsHeight - scaleY(d.values[1]))

                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red")
            }

            if(props.oy[1]) {
                svg .selectAll(".barMin")
                    .data(props.data)
                    .enter()
                    .append("rect")
                    .attr("x", d => props.oy[0] ? scaleX(d.labelX) + scaleX.bandwidth()/2 : scaleX(d.labelX))
                    .attr("y", d => scaleY(d.values[0]))

                    .attr("width",props.oy[0] ? scaleX.bandwidth() / 2 - O: scaleX.bandwidth())
                    .attr("height", d => boundsHeight - scaleY(d.values[0]))

                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue")


            }
        }


    }, [scaleX, scaleY, props.data, props.oy, props.chartType]); // забыл поменять

    return (
      <svg ref={ chartRef }>  </svg>
	)
}

export default ChartDraw;
