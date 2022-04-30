import React from "react";

export const ImcompleteTodos = (props) => {
  const { todos, onClickComplete, onClickDelete } = props; //propsを分割代入
  return (
    <div className="incomplete-area">
      <p className="title">未完了のTODO</p>
      <ul>
        {todos.map((todo, index) => {
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
  );
};
