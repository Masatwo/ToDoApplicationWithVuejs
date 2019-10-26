<template>
    <body>
    <section class = "container">
        <div> 
        <h1>ToDoリスト</h1>
            <form>
                <input type="radio" name="condition" v-model="checkedList" value="すべて">すべて
                <input type="radio" name="condition" v-model="checkedList" value="作業中">作業中
                <input type="radio" name="condition" v-model="checkedList" value="完了">完了
            </form>

            <!-- ラジオボタンで選択されたものをベースに表示するアイテムを変更しています
            すべてで表示させる項目と、完了や作業中で表示させる方法を別で記載しました。
            1つのulタグ内で記載する方法がわからなかったためです。-->
            <ul v-if = "checkedList === 'すべて'">
                <li v-for = "(todo, index, key) in todos" :key="key">
                    {{ index }}, {{ todo.todo }}
                    <button @click="changeCondition(index)">{{ todo.condition }}</button>
                    <button @click="deleteItem(index)">削除</button>
                </li>
            </ul>

            <!-- ラジオボタンで”すべて”以外が選択されている場合にはこちらのマークアップが動作します。 -->
            <ul v-else>
                <li v-for = "(todo, index, key) in filteredTodos" :key="key">
                    {{ index }}  {{ todo.todo }}   
                    <button @click="changeCondition(index)">{{ todo.condition }}</button>
                    <button @click="deleteItem(index)">削除</button>
                </li>
            </ul>
            
            <!-- todosに何も含まれていない場合には、追加を促すメッセージが表示されます。 -->
            <p v-show="!todos.length">
                やるべき事を追加してください。
            </p>
            
            <!-- 追加ボタンを押すとTodosに項目が追加されます。 -->
            <form @submit.prevent = "addItem">
                <input type="text" v-model="newItem" class="inputForm">
                <input type="submit" value="追加">
            </form>
        </div>
    </section>
    </body>
</template>

<script>

    export default {
        data: function() {
            return {
            newItem: "",
            todos: [],
            checkedList: "すべて",
            }
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
                //何も入力されていない場合には、警告文を表示して追加しない
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
            },
        },
        // ---------------------------------------------------------------------
        // computedを用いて作業中や完了の状態になっている項目だけを表示しようとしてるのですがエラーが発生します。
        // Developer toolsでの表示はfilteredToDoList: "(error during evaluation)"
        // です。 
        // ---------------------------------------------------------------------
        computed: {
            filteredTodos: function(){
                return this.todos.filter(function(todo){
                    return todo.condition === this.checkedList;
                });
            }
        },
    }
</script>

<style scoped>
body {
    margin: 0px;
    padding-top: 60px;
    padding-bottom: 60px;
    font-size: 16px;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: #eee;
    
}

.container {
    width: 400px;
    margin: auto;
    padding: 10px;
    padding-bottom: 40px;
    text-align: center;;
    background-color: #fff;
    box-shadow: 2px 2px 2px rgba(0,0,0,0.4);

}

h1 {
    font-size: 30px;
    width: 60%;
    margin: 30px auto;
    padding-bottom: 15px;
    border-bottom: 1px solid #bbb;
    
}

li {
    list-style: none;
    width: 80%;
    margin-bottom: 5px;
}

.inputForm {
    padding: 2px;
}
</style>