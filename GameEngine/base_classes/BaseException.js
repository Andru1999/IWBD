/**
 * Класс базового исключения
 *
 * @property {string} message - Текстовое сообщение
 */
class BaseException {
    /**
     * Конструирует BaseException
     *
     * @this {BaseException}
     * @param {string} message - Текстовое сообщение
     */
    constructor(message){
        this.message = message;
    }
}