import { deleteAsync } from 'del';

// Если мы удалили какой то файл в папке ./src
// То эта функция сделает так чтобы папка ./dist очистился
export const reset = () => {
    return deleteAsync(['dist'])
}