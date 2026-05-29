import { useState } from "react";
import TableHead from './TableHead.js';
import TableBody from './TableBody.js';
import Filter from './Filter.js';
import Sort from './Sort.js';

/*
   компонент, выводящий на страницу таблицу с пагинацией, фильтрацией и сортировкой
   пропсы:
      data - данные для таблицы в виде массива объектов
      amountRows - количество строк таблицы на странице
      pagination - 1 - выводить блок пагинации, 0 - не выводить
*/

const Table = (props) => {

    const [activePage, setActivePage] = useState("1");
    const [dataTable, setDataTable] = useState(props.data);

    const updateDataTable = (value) => {
        setDataTable(value);
        setActivePage("1");
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
                fullData={props.data}
            />

            <h4>Сортировка</h4>

            <Sort
                sorting={updateDataTable}
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
                props.pagination == "1" &&
                <div>
                    {pages}
                </div>
            }
        </>
    )
}

export default Table;