import TableRow from './TableRow.js';

/*
   компонент, для вывода tbody таблицы
   пропсы:
      body - данные для таблицы в виде массива объектов
      numPage - номер текущей страницы
      amountRows - количество строк таблицы на странице
      pagination - 1 - выводить таблицу с пагинацией, 0 - выводить все строки
*/

const TableBody = (props) => {

    // номера строк, отображаемых на странице
    const begRange = (props.numPage - 1) * props.amountRows;
    const endRange = begRange + Number(props.amountRows);

    // формируем строки на основе переданных данных
    const tbody = props.body.map((item, index) =>
        <tr key={index} className={
            props.pagination == "0"
                ? "show"
                : (index >= begRange && index < endRange) ? "show" : "hide"
        }>
            <TableRow row={Object.values(item)} isHead="0" />
        </tr>
    );

    return (
        <tbody>
            {tbody}
        </tbody>
    )
}

export default TableBody;