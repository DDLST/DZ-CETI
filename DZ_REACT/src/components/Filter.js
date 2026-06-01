/*
   компонент, для фильтрации таблицы
   пропсы:
      fullData - полные данные, по которым формировалась таблица при загрузке страницы
      filtering - функция обновления данных для фильтрации
*/

const Filter = (props) => {

    const handleSubmit = (event) => {
        event.preventDefault();

        // создаем словарь со значениями полей формы
        const filterField = {
            "Название": event.target["name"].value.toLowerCase(),
            "Тип": event.target["type"].value.toLowerCase(),
            "Город": event.target["city"].value.toLowerCase(),
            "Регион": event.target["region"].value.toLowerCase(),

            "Год": [
                event.target["yearFrom"].value,
                event.target["yearTo"].value
            ],

            "Высота, см": [
                event.target["heightFrom"].value,
                event.target["heightTo"].value
            ],

            "Жертвы": [
                event.target["victimsFrom"].value,
                event.target["victimsTo"].value
            ],

            "Ущерб, млрд руб.": [
                event.target["damageFrom"].value,
                event.target["damageTo"].value
            ]
        };

        // фильтруем данные по значениям всех полей формы
        let arr = props.fullData;

        for (const key in filterField) {
            if (
                key === "Год" ||
                key === "Высота, см" ||
                key === "Жертвы" ||
                key === "Ущерб, млрд руб."
            ) {
                arr = arr.filter(item =>
                    (filterField[key][0] === "" || item[key] >= Number(filterField[key][0])) &&
                    (filterField[key][1] === "" || item[key] <= Number(filterField[key][1]))
                );
            } else {
                arr = arr.filter(item =>
                    item[key].toLowerCase().includes(filterField[key])
                );
            }
        }

        // передаем родительскому компоненту новое состояние - отфильтрованный массив
        props.filtering(arr);
    }

    const handleReset = () => {
        props.filtering(props.fullData);
    }

    return (
        <form onSubmit={handleSubmit} onReset={handleReset}>
            <p>
                <label>Название:</label>
                <input name="name" type="text" />
            </p>

            <p>
                <label>Тип:</label>
                <input name="type" type="text" />
            </p>

            <p>
                <label>Город:</label>
                <input name="city" type="text" />
            </p>

            <p>
                <label>Регион:</label>
                <input name="region" type="text" />
            </p>

            <p>
                <label>Год от:</label>
                <input name="yearFrom" type="number" />
            </p>

            <p>
                <label>Год до:</label>
                <input name="yearTo" type="number" />
            </p>

            <p>
                <label>Высота от:</label>
                <input name="heightFrom" type="number" />
            </p>

            <p>
                <label>Высота до:</label>
                <input name="heightTo" type="number" />
            </p>

            <p>
                <label>Жертвы от:</label>
                <input name="victimsFrom" type="number" />
            </p>

            <p>
                <label>Жертвы до:</label>
                <input name="victimsTo" type="number" />
            </p>

            <p>
                <label>Ущерб от:</label>
                <input name="damageFrom" type="number" step="0.1" />
            </p>

            <p>
                <label>Ущерб до:</label>
                <input name="damageTo" type="number" step="0.1" />
            </p>

            <p>
                <button type="submit">Фильтровать</button>
                <button type="reset">Очистить фильтр</button>
            </p>
        </form>
    )
}

export default Filter;