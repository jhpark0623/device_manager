import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  let [darkMode, setdarkMode] = useState(false);

  const 사용자추가함수 = () => {
    console.log("사용자 추가 함수 클릭");
    fetch("/api/adduser");
  };

  useEffect(() => {
    // 컴포넌트가 로딩될때 한번만 실행됨
    // 사용자 목록을 가져와서 변수(state)에 저장

    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, [users]);

  function toggle() {
    setdarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <div id="div" className=" relative dark:bg-blue-500">
      <div>안녕 세상</div>
      <div>
        <input
          id="toggle_dark"
          type="checkBox"
          checked={darkMode}
          onChange={toggle}
        ></input>
        <label htmlFor="toggle_dark">다크모드</label>
      </div>
      <Counter title={"카운터"} />

      <button
        className="bg-gray-300 p-2 rounded-full hover:bg-black hover:text-white absolute top-5 right-5"
        onClick={사용자추가함수}
      >
        사용자추가
      </button>
      <div className="flex flex-wrap">
        {users.map((user) => (
          <div
            key={user.id}
            className=" border-2 border-gray-500 p-2 m-4 w-[300px]"
          >
            <div className="text-3xl font-bold mb-2">
              <span>{user.name}</span> <span>({user.age}세)</span>
            </div>
            <div>{user.addr}</div>
            <div>{user.createAt.toString()}</div>
            <div>{user.updateAt.toString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
