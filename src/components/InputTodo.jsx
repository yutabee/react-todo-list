import React from "react";

//コンポーネント内に書くことによってCssを扱いやすくする
//styleの定義の仕方は通常のCssと違ってstringで書く、プロパティは-使わずcamelcaseで書く
const style = {
  backgroundColor: "#c1ffff",
  width: "400px",
  height: "30px",
  borderRadius: "8px",
  padding: "8px",
  margin: "8px"
};

export const InputTodo = (props) => {
  const { todoText, onChange, onClick } = props;
  return (
    //styleのあて方も通常と少し変わる
    <div style={style}>
      <input placeholder="TODOを入力" value={todoText} onChange={onChange} />
      <button onClick={onClick}>追加</button>
    </div>
  );
};
