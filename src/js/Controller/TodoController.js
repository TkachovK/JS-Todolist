import TodoView from '../View/TodoView'
import TodoModel from '../Model/TodoModel'
import {TODO_URL} from '../config'

export default class TodoController {
    constructor($el) {
        this.initModel();
        this.initView($el);
    }

    initModel(){
        this.todoModel = new TodoModel(TODO_URL);
        this.todoModel.fetchTodo()
        .then(()=>this.renderList())
    }   

    initView($el){
        this.todoView = new TodoView($el, {
            onDelete:this.deleteTodo.bind(this),
            onToggle:this.toggleTodo.bind(this),
            onSubmit:this.createTodo.bind(this),
        });
    }   

    renderList() {
        this.todoView.renderList(this.todoModel.list);
    }

    createTodo(todo) {
        this.todoModel.createTodo(todo)
        .then(()=>this.renderList());
    }

    toggleTodo(id){
        this.todoModel.toggleTodo(id);
        this.renderList();
    }

    deleteTodo(id) {
        this.todoModel.deleteTodo(id);
        this.renderList();
    }
}