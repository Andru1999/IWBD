/**
 * Класс исключения возникающего при вызове не реализованного метода.
 *
 * @property name {string} - Имя метода
 */
class ExceptionNotImplemented extends BaseException{
    constructor(name){
        super(`Метод ${name} не реализван`);
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