'use strict'

{
    var vm = new Vue ({
        el: '#app',
        //TODOリストのデータを確定させている
        data: {
            newItem: "",
            todos: [
                {todo: "todo1", condition: "作業中"},
                {todo: "todo2", condition: "作業中"},
                {todo: "todo3", condition: "作業中"},
            ],
            checkedList: "すべて",
        },
        
        watch: {
            todos: {
                //todosの内容に変更が加わった場合に、Vuexにデータを保存する
                //Vuexがまだ理解できていないためとりあえずlocalStorageで代用しています。
                handler: function() {
                    localStorage.setItem('todos', JSON.stringify(this.todos));
                },
                deep: true
            }
        },
        mounted: function(){
            //ページが読み込まれた時に、Vuexから現在のデータを取り出してきて、todosに代入する
            this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        },
        methods: {
            addItem: function(){
                //”追加"ボタンが押されてた新しいTodo項目を追加する
                //何も入力されていない場合には、警告文を表示して追加はしない
                if(this.newItem.length === 0){
                    alert("Please input something you have to complete");
                    return;
                }
                this.todos.push({todo: this.newItem, condition: "作業中"});
                this.newItem = "";
            },
            deleteItem: function(index){
                //”削除”ボタンが押された場合に、当該の項目をTodosから削除する
                this.todos.splice(index, 1);
            },
            changeCondition: function(index){
                //"作業中"や”完了”のボタンが押された場合に、異なる状態へと変更するようにしている
                if(this.todos[index].condition === "完了") {
                    this.todos[index].condition = "作業中";
                }else {
                    this.todos[index].condition = "完了";
                }
            }
        },
    })
}