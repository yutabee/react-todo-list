import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { ImcompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodo";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  //onchangeでinputのstateを変更する
  const oncChangeTodoText = (e) => setTodoText(e.target.value);
  //追加ボタン機能
  const onClickAdd = () => {
    if (todoText === "") return; //if分も処理１行の場合はbracketなしでもOK
    const newTodos = [...incompleteTodos, todoText]; //スプレッド構文＞すでにある配列のコピーを作成し、新規のTodリスト追加
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1); //spliceは１つ目の引数に何番目を削除するかを受けて、２つ目に何個削除するかを指定
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newInCompleteTodos = [...incompleteTodos];
    // 今回は完了したTodoも扱っていくのでimCompleteTodosとしておく
    newInCompleteTodos.splice(index, 1);
    //新しくコピーした未完了のtodoからインデックスを指定して削除する
    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    //完了todoをコピーして、指定した未完了のtodoを追加する
    setIncompleteTodos(newInCompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newInCompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newInCompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={oncChangeTodoText}
        onClick={onClickAdd}
      />
      <ImcompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
