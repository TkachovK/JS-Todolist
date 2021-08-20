import { listContainer as listContainer, todoTemplate as todoTemplate, DELETE_TASK_BUTTON as DELETE_TASK_BUTTON, 
    TASK_ITEM as TASK_ITEM, ADD_TASK_INPUT as ADD_TASK_INPUT, ADD_TASK_BUTTON as ADD_TASK_BUTTON } from '../config'
import '../../css/styles.css'

export default class TodoView {
    constructor($el, config = {}) {
        this._container = $el;
        this._$list = null;
        this._$input = null;
        this._$submitButton = null;
        this._config = config;
        this.initView();
    }

    initView() {
        this._$list = $(listContainer);
        this._$list.on('click', DELETE_TASK_BUTTON, this.onDeleteBtnClick.bind(this))
            .on('click', TASK_ITEM, this.onTaskClick.bind(this));
        this._$input = $(ADD_TASK_INPUT);
        this._$submitButton = $(ADD_TASK_BUTTON);
        this._$submitButton.on('click', this.submitForm.bind(this));
        this._container.append(this._$list);
    }

    onDeleteBtnClick(e) {
        e.stopPropagation();
        const id = this.getElementId($(e.target));
        this._config.onDelete(id);
    }

    onTaskClick(e) {
        const id = this.getElementId($(e.target));
        this._config.onToggle(id);
    }

    submitForm() {
        const task = this.getFormData();
        this._config.onSubmit(task);
        this.resetForm();
    }

    renderList(list) {
        this._$list.html(list.map(this.getListItemHtml).join(''));
    }

    getListItemHtml({ id, title, isDone }) {
        return todoTemplate.replace('{{id}}', id).replace('{{title}}', title).replace('{{done}}', isDone);
    }

    getElementId($el) {
        return $el.closest(TASK_ITEM).data('todoId');
    }

    getFormData() {
        return { title: this._$input.val(), isDone: false };
    }

    resetForm() {
        this._$input.val('');
    }
}