import { useState } from "react";

interface CounterProps {
  title: String | Number | number[];
}

const Counter = (props: CounterProps) => {
  const [count, setCount] = useState(2);

  return (
    <div>
      <h1>{props.title.toString()}</h1>
      <h2>counter : {count}</h2>
      <button onClick={() => setCount(count * count)}>plus</button>
      <button onClick={() => setCount(count - count)}>minus</button>
    </div>
  );
};

export default Counter;
