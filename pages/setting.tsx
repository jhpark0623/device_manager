import { Device } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Setting: NextPage = () => {
  const [product, setProduct] = useState<String>();
  const [location, setLocation] = useState<String>();
  const [type, setType] = useState("");
  const [unit, setUnit] = useState<String>();
  const [memo, setMemo] = useState<String>();
  const [device, setDevice] = useState<Device[]>([]);
  const [errMsg, setErrMsg] = useState("");

  const 장비추가버튼클릭 = () => {
    document.querySelector("#container_add_device")?.classList.toggle("hidden");
    setProduct("");
    setLocation("");
    setUnit("");
    setMemo("");
    setErrMsg("");
    setType("");
  };

  const inputDB = () => {
    const data = {
      productName: product,
      location: location,
      unit: unit,
      memo: memo,
      type: type,
    };

    if (!product) setErrMsg("제품명을 입력하세요.");
    else if (!location) setErrMsg("설치위치를 입력하세요.");
    else if (!type) setErrMsg("장치종류를 선택하세요.");
    else if (!unit) setErrMsg("단위를 입력하세요.");
    else {
      fetch("../api/device/add_device", {
        method: "POST",
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.ok) {
            setDevice([...device, json.device]);
            document
              .querySelector("#container_add_device")
              ?.classList.toggle("hidden");
            setErrMsg("");
            alert("제품 등록을 완료하였습니다.");
          } else {
            alert("제품 등록에 실패했습니다.");
          }
        });
    }
  };

  const deleteBtn = (deleteid: string) => {
    fetch(`../api/device/${deleteid}`)
      .then((res) => res.json())
      .then((json) => {
        setDevice(
          device.filter((device) =>
            json.deleteId !== device.id ? true : false
          )
        );
      });
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.currentTarget.value);

    switch (event.currentTarget.value) {
      case "TEMP":
        setUnit("℃");
        break;
      case "HUMI":
        setUnit("%");
        break;
      case "CO2":
        setUnit("PPM");
        break;
    }
  };

  useEffect(() => {
    fetch("../api/device/device")
      .then((res) => res.json())
      .then((json) => setDevice(json.device));
  }, []);

  return (
    <Layout title="SETTING">
      <div className="p-6 space-y-6">
        {/* 추가 버튼 */}
        <div data-comment="장비추가버튼" className="flex justify-end">
          <button
            onClick={장비추가버튼클릭}
            className="rounded-2xl text-white sunmoon_btn py-4 px-5 flex space-x-2 items-center"
          >
            <div>Add Device</div>
            <div data-coment="plus icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </button>
        </div>

        {/* 추가 목록 */}
        <div
          id="container_add_device"
          data-comment="New Device"
          className="space-y-5 hidden"
        >
          <hr></hr>
          <div className="text-3xl font-bold">New Device</div>

          {/* 제품명 */}
          <div className="flex flex-col">
            <span className="text-lg">제품명 *</span>
            <input
              maxLength={7}
              type="text"
              value={product?.toString()}
              onChange={(event) => setProduct(event.currentTarget.value)}
              placeholder="제품명를 입력하세요."
              className="h-10 text-black ring-2 ring-black px-2"
            />
          </div>

          {/* 설치위치 */}
          <div className="flex flex-col">
            <span className="text-lg">설치위치 *</span>
            <input
              type="text"
              value={location?.toString()}
              onChange={(event) => setLocation(event.currentTarget.value)}
              placeholder="거실, 안방... etc"
              className="h-10 text-black ring-2 ring-black px-2"
            />
          </div>

          {/* 장치 종류 */}
          <div className="flex flex-col">
            <span className="text-lg">장치종류 *</span>
            <select
              name="choice"
              value={type}
              className="ring-2 ring-black w-full h-10 px-2 dark:text-black"
              onChange={(event) => selectChange(event)}
            >
              <option value="" hidden>
                장치 종류를 선택하세요
              </option>
              <option value="TEMP">온도 센서</option>
              <option value="HUMI">습도 센서</option>
              <option value="CO2">CO2</option>
            </select>
          </div>

          {/* 단위 */}
          <div className="flex flex-col">
            <span className="text-lg">단위 *</span>

            {unit === "" ? (
              <label
                id="unit"
                className="h-10 text-gray-400 ring-2 ring-black px-3 flex items-center text-lg"
              >
                장치종류 선택시 자동 입력됩니다.
              </label>
            ) : (
              <label
                id="unit"
                className="h-10 text-black ring-2 ring-black px-3 flex items-center text-lg"
              >
                {unit?.toString()}
              </label>
            )}
          </div>

          {/* 메모 */}
          <div className="flex flex-col">
            <span className="text-lg">메모</span>
            <input
              type="text"
              value={memo?.toString()}
              onChange={(event) => setMemo(event.currentTarget.value)}
              placeholder="Memo"
              className="h-10 text-black ring-2 ring-black px-2"
            />
          </div>

          {errMsg ? <div className="text-red-500">{errMsg}</div> : null}

          {/* 등록버튼 */}
          <button
            className=" sunmoon_btn w-full py-3 font-bold rounded-lg"
            onClick={inputDB}
          >
            등록
          </button>

          <hr></hr>
        </div>

        {/* Device List */}
        <div>
          <div className="text-3xl font-bold">Device List</div>
          {0 === device.length ? (
            <div className="w-full flex justify-center my-10 text-2xl font-bold">
              장치를 입력해주세요.
            </div>
          ) : (
            <>
              <div>
                {device.map((device) => (
                  <div
                    key={device.id}
                    className="flex justify-between border-b-2 py-3"
                  >
                    <div>
                      <div>ID : {device.id}</div>
                      <div>
                        {device.type} - {device.location}{" "}
                        {device.memo ? "(" + device.memo + ")" : ""}
                      </div>
                    </div>

                    {/* 삭제 버튼 */}
                    <button
                      onClick={() => deleteBtn(device.id)}
                      className="text-red-500 bg-red-200 p-3 rounded-xl"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Setting;
