import { User } from "@prisma/client";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Counter from "../components/Counter";

const Home: NextPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState<String>("");
  const [age, setAge] = useState<String>("");
  const [addr, setAddr] = useState<String>("");
  const [rename, setRename] = useState<String>("");

  const router = useRouter;

  const 사용자추가함수 = () => {
    console.log("사용자 추가 함수 클릭");

    if (name)
      fetch(`/api/adduser?name=${name}&age=${age}&addr=${addr}`)
        .then((res) => res.json())
        .then((json) => setUsers([...users, json.user]));
    else
      fetch(`/api/adduser?name=박종훈&age=20&addr=일산`)
        .then((res) => res.json())
        .then((json) => setUsers([...users, json.user]));
  };

  const 사용자삭제함수 = (targetId: String) => {
    fetch(`/api/user/delete/${targetId}`)
      .then((res) => res.json())
      .then((json) =>
        setUsers(users.filter((user) => (json.id !== user.id ? true : false)))
      );
  };

  useEffect(() => {
    // 컴포넌트가 로딩될때 한번만 실행됨
    // 사용자 목록을 가져와서 변수(state)에 저장

    fetch("/api/alluser")
      .then((res) => res.json())
      .then((json) => setUsers(json.users));
  }, []);

  const inputName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  const inputAge = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };
  const inputAddr = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddr(e.target.value);
  };

  const 이름변경 = (targetId: String) => {
    if (!rename) return;

    const data = { name: rename };

    fetch(`/api/user/update/${targetId}`, {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  return (
    <div id="div" className=" relative dark:bg-blue-500">
      <div className="text-red-400">한장씩 너를 지울때~마다~</div>
      <div className="text-red-400">가슴이 아려와~</div>
      <Counter title={"카운터"} />

      <div>
        <input
          className="border-2"
          onChange={inputName}
          value={name?.toString()}
          placeholder="이름"
        ></input>
      </div>
      <div>
        <input
          className="border-2"
          onChange={inputAge}
          value={age?.toString()}
          placeholder="나이"
        ></input>
      </div>
      <div>
        <input
          className="border-2"
          onChange={inputAddr}
          value={addr?.toString()}
          placeholder="주소"
        ></input>
      </div>

      <button
        className="bg-gray-300 p-2 rounded-full hover:bg-black hover:text-white"
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
            <div>
              <input
                type="text"
                className="border-2"
                value={rename?.toString()}
                onChange={(e) => setRename(e.currentTarget.value)}
              ></input>
              <button
                className="bg-gray-300 p-2 rounded-full hover:bg-black hover:text-white"
                onClick={() => 이름변경(user.id)}
              >
                등록
              </button>
            </div>
            <button
              className="bg-gray-300 p-2 rounded-full hover:bg-black hover:text-white"
              onClick={() => 사용자삭제함수(user.id)}
            >
              삭제
            </button>
            <div>{user.id}</div>
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
