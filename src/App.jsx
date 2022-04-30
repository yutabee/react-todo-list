import React, { useState } from "react";
import "./styles.css";

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
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          type="text"
          value={todoText}
          onChange={oncChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="incomplete-area">
        <p className="title">未完了のTODO</p>
        <ul>
          {incompleteTodos.map((todo, index) => {
            // map関数は引数を２つとることができる→１つ目は配列の値、２つめはその順番を受ける
            return (
              //仮想DOMは変更前と変更後の差分のみを変更するため正確に把握するためkeyの設定が必要
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button
                  onClick={() => {
                    onClickComplete(index);
                  }}
                >
                  完了
                </button>
                {/* onClickDeleteに引数と括弧を渡すと読み込まれた時によりが実行されてしまうためアロー関数を生成する */}
                <button onClick={() => onClickDelete(index)}>削除</button>
              </div>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <p className="title">完了のTODO</p>
        <ul>
          {completeTodos.map((todo, index) => {
            return (
              <div key={todo} className="list-row">
                <li>{todo}</li>
                <button onClick={() => onClickBack(index)}>戻す</button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
};
