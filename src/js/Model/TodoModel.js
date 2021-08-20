export default class TodoModel {
    constructor(url) {
        this._url = url;
        this.list=[];
    }

    fetchTodo() {
        return fetch(this._url)
        .then((resp) => resp.json())
        .then((data) => this.setData(data));
    }

    setData(data) {
        this.list=data;
    }

    createTodo(todo) {
        return fetch(this._url, {
            method:'POST',
            body:JSON.stringify(todo),
            headers:{
              'Content-type':'application/json'
            },
          }).then(resp => resp.json())
          .then((data) =>this.list.push(data));
    }

    toggleTodo(id){
        const todo=this.list.find((item)=>item.id==id);
        todo.isDone?todo.isDone=false:todo.isDone=true;
        fetch(`${this._url}/${id}`, {
            method:'PUT',
            body:JSON.stringify(todo),
            headers:{
              'Content-type':'application/json'
            },
          }).then(resp => resp.json())
    }

    deleteTodo(id) {
        this.list=this.list.filter((item)=>item.id!=id);
        return fetch(`${this._url}/${id}`, {
            method:'DELETE',
        }).then((resp)=>resp.json());
    }
}