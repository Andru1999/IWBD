/**
 * Интерфейс игрового движка
 */
class InterfaceGameEngine {
    /**
     * Метод выполняющий некоторое действие
     * @param {BaseAction} action - Некоторое действие
     */
    do_action(action) {
        throw new ExceptionNotImplemented();
    };
}