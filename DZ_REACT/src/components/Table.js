import { useState } from "react";
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';

/*
   компонент, выводящий на страницу таблицу с пагинацией и фильтрацией
   пропсы:
      data - данные для таблицы в виде массива объектов
      amountRows - количество строк таблицы на странице
      pagination - 1 - выводить блок пагинации, 0 - не выводить
*/

const Table = (props) => {

    const M = Math.ceil(props.data.length / props.amountRows);

    let S;

    if (M === 0) {
        S = "1";
    } else {
        S = String(M);
    }

    const [activePage, setActivePage] = useState(S);
    const [dataTable, setDataTable] = useState(props.data);

    const c = (value) => {
        const NN = Math.ceil(value.length / props.amountRows);

        if (NN === 0) {
            setActivePage("1");
        } else {
            setActivePage(String(NN));
        }
    }

    const updateDataTable = (value) => {
        setDataTable(value);
        c(value);
        props.filtering(value);
    };

    const changeActive = (event) => {
        setActivePage(event.target.innerHTML);
    };

    // количество страниц разбиения таблицы
    const n = Math.ceil(dataTable.length / props.amountRows);

    // массив с номерами страниц
    const arr = Array.from({ length: n }, (v, i) => i + 1);

    // формируем совокупность span с номерами страниц
    const pages = arr.map((item, index) =>
        <span
            key={index}
            onClick={changeActive}
            className={item == activePage ? "active" : ""}
        >
            {item}
        </span>
    );

    return (
        <>
            <h4>Фильтры</h4>

            <Filter
                filtering={updateDataTable}
                data={dataTable}
                fullData={props.data}
            />

            <table>
                <TableHead head={Object.keys(props.data[0])} />
                <TableBody
                    body={dataTable}
                    amountRows={props.amountRows}
                    numPage={activePage}
                    pagination={props.pagination}
                />
            </table>

            {
                props.pagination == "1" && n > 1 &&
                <div>
                    {pages}
                </div>
            }
        </>
    )
}

export default Table;