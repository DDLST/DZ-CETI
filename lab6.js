const encrypted = "28 11 28 13 14 18 21 28 14 12 45 12 14 14 16 33 11 26 17 13 24 41 13 14 31 24 12 34 14 34 13 14 48 31 17 17 12 45 32 14 18 31 17 13 21 14 32 33 24 23 24 18 24 31 31 14 24 23 24 18 14 34 46 13 14 22 14 15 14 15 24 31 13 11 24 22 14 14 34 35 43 24 34 13 12 18 24 31 17 24 34 13 11 31 14 12 17 13 34 48 23 18 48 12 11 34 31 24 12 14 26 15 14 25 31 45 15";
const keys = ["поражение", "звезда", "гимнастика", "проигрыш", "грузовик", "экзамен", "такси", "автомобиль"];

const alphabet = "абвгдежзийклмнопрстуфхцчшщъыьэюя";

// Создаем алфавит с учетом ключа без повторений
function createAlphabet(key) {
    key = key.replace(/ё/g, 'е');
    
    // удаление повторов в ключе
    let uniqueKey = '';
    for (let char of key) {
        if (!uniqueKey.includes(char)) {
            uniqueKey += char;
        }
    }
    
    //добавление основного алфавита
    let result = uniqueKey;
    for (let char of alphabet) {
        if (!result.includes(char)) {
            result += char;
        }
    }
    
    return result;
}

function decrypt(encryptedNumbers, key, rows, cols) {
  const fullAlphabet = createAlphabet(key);

  // строим матрицу
  const matrix = [];
  let index = 0;
  for (let i = 0; i < rows; i++) {
    matrix[i] = [];
    for (let j = 0; j < cols; j++) {
      matrix[i][j] = fullAlphabet[index++];
    }
  }


  let result = '';

 
  for (let i = 0; i < encryptedNumbers.length; i += 5) {
    const pair = encryptedNumbers.substr(i, 2); 

    const r = Number(pair[0]);
    const c = Number(pair[1]);

    if (r < 1 || r > rows || c < 1 || c > cols) continue;

    result += matrix[r - 1][c - 1];
  }

  return result;
}


// 2 матрицы
function tryAllCombinations() {
    const matrixSizes = [
        { rows: 4, cols: 8 },
        { rows: 8, cols: 4 }
    ]; // 2 варианта размера матрицей
    //перебор ключей
    for (let key of keys) {
        for (let size of matrixSizes) {
            console.log(`Ключ: "${key}", Размер матрицы: ${size.rows}x${size.cols}`);
            const decrypted = decrypt(encrypted, key, size.rows, size.cols);
            console.log(`Результат: ${decrypted}`);
        }
    }
}

tryAllCombinations();