import { useState } from "react";

/*
   компонент, для сортировки таблицы по трем уровням
   пропсы:
      data - данные для сортировки
      fullData - исходные данные таблицы
      sorting - функция обновления данных после сортировки
*/

const Sort = (props) => {

    const [firstSort, setFirstSort] = useState("Нет");
    const [secondSort, setSecondSort] = useState("Нет");
    const [thirdSort, setThirdSort] = useState("Нет");

    const [dataS, setDataS] = useState(props.data);

    const fields = [
        "Нет",
        "Название",
        "Тип",
        "Город",
        "Регион",
        "Год",
        "Высота, см",
        "Жертвы",
        "Ущерб, млрд руб."
    ];

    const handleChangeFirst = (event) => {
        setFirstSort(event.target.value);

        if (event.target.value === "Нет") {
            setSecondSort("Нет");
            setThirdSort("Нет");
        } else {
            if (secondSort === event.target.value) {
                setSecondSort("Нет");
                setThirdSort("Нет");
            }

            if (thirdSort === event.target.value) {
                setThirdSort("Нет");
            }
        }
    }

    const handleChangeSecond = (event) => {
        setSecondSort(event.target.value);

        if (event.target.value === "Нет") {
            setThirdSort("Нет");
        } else {
            if (thirdSort === event.target.value) {
                setThirdSort("Нет");
            }
        }
    }

    const handleChangeThird = (event) => {
        setThirdSort(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        setDataS(props.data);

        const sortFields = [
            firstSort,
            secondSort,
            thirdSort
        ];

        let arr = [...props.data];
        arr.sort((a, b) => {
            for (let i = 0; i < sortFields.length; i++) {
                const key = sortFields[i];

                if (key !== "Нет") {
                    if (a[key] > b[key]) {
                        return 1;
                    }

                    if (a[key] < b[key]) {
                        return -1;
                    }
                }
            }

            return 0;
        });

        props.sorting(arr); 
    }

    const handleReset = () => {
        setFirstSort("Нет");
        setSecondSort("Нет");
        setThirdSort("Нет");

        props.sorting(dataS);
    }

    return (
        <form >
            <p>
                <label>Первый уровень:</label>
                <select name="first" value={firstSort} onChange={handleChangeFirst}>
                    {
                        fields.map((item, index) =>
                            <option key={index}>{item}</option>
                        )
                    }
                </select>
            </p>

            <p>
                <label>Второй уровень:</label>
                <select
                    name="second"
                    value={secondSort}
                    onChange={handleChangeSecond}
                    disabled={firstSort === "Нет"}
                >
                    {
                        fields
                            .filter(item => item === "Нет" || item !== firstSort)
                            .map((item, index) =>
                                <option key={index}>{item}</option>
                            )
                    }
                </select>
            </p>

            <p>
                <label>Третий уровень:</label>
                <select
                    name="third"
                    value={thirdSort}
                    onChange={handleChangeThird}
                    disabled={secondSort === "Нет"}
                >
                    {
                        fields
                            .filter(item =>
                                item === "Нет" ||
                                (item !== firstSort && item !== secondSort)
                            )
                            .map((item, index) =>
                                <option key={index}>{item}</option>
                            )
                    }
                </select>
            </p>

            <p>
                <button type="button" onClick={handleSubmit}>Сортировать</button>
                <button type="button" onClick={handleReset}>Сбросить сортировку</button>
            </p>
        </form>
    )
}

export default Sort;