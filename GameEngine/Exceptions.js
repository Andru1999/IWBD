/**
 * Класс исключения возникающего при вызове не реализованного метода.
 *
 * @property message {string} - Текстовое сообщение
 */
class ExceptionNotImplemented extends BaseException{
    constructor(message){
        super(message || "Метод не реализван");
    }
}

/**
 * Класс исключения возникающего при выполнении действия
 *
 * @property message {string} - Текстовое сообщение
 */
class ExceptionDoAction extends BaseException {
    constructor(message=null){
        super(message || "Действие не удалось выполнить по неизвестной причине")
    }
}