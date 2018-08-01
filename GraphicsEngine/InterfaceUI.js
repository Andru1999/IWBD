/**
 * Класс интерфейс с общими методами для всех UI
 */
class InterfaceUI {
    /**
     * Методо служащий для связывания событий с их обработчиками
     *
     * @param {BaseGraphicEvent} event - Некое событие
     * @param {function} handler - Некоторый обработчик (на вход будет передан instance события)
     */
    connect(event, handler) {
        throw new ExceptionNotImplemented("UI.connect");
    }
}