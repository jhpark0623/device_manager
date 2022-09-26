import type { NextPage } from "next";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  return (
    <>
      <div>안녕 세상</div>
      <Counter title={[1, 2, 3, 4, 5]} />
    </>
  );
};

export default Home;
