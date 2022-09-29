import { Device } from "@prisma/client";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";

const Data: NextPage = () => {
  const [device, setDevice] = useState<Device[]>([]);
  const [deviceId, setDeviceId] = useState("");
  const [value, setValue] = useState("");

  useEffect(() => {
    fetch("../api/device/device")
      .then((res) => res.json())
      .then((json) => setDevice(json.device));
  }, []);

  const inputValue = () => {
    const data = {
      value,
    };

    fetch(`../api/sencing/${deviceId}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.ok) {
          alert("등록 성공");
          setValue("");
        } else {
          alert(json.err);
        }
      });
  };

  return (
    <Layout title="DATA">
      <div className="p-6">
        <div className="text-2xl font-bold">Select Device</div>

        {/* 선택창 */}
        <select
          name="selectDevice"
          className="ring-2 ring-black w-full h-10 px-2 my-5 dark:text-black"
          onChange={(event) => {
            setDeviceId(event.currentTarget.value);
            setValue("");
          }}
        >
          {0 === device.length ? (
            <option hidden>등록된 장비가 없습니다.</option>
          ) : (
            <option hidden>장치를 선택해주세요.</option>
          )}

          {device.map((device, idx) => (
            <option key={idx} value={device.id}>
              {device.type} - {device.productName} ({device.location})
            </option>
          ))}
        </select>

        {deviceId ? (
          <div>
            <div className="py-7 text-lg">장비ID : {deviceId}</div>

            <div className="text-3xl my-5">value</div>
            <input
              type="text"
              className="w-full ring-2 ring-black h-10 my-3"
              maxLength={6}
              value={value}
              onChange={(event) => setValue(event.currentTarget.value)}
            ></input>
            <button
              className="w-full ring-2 ring-black h-10"
              onClick={inputValue}
            >
              등록
            </button>
          </div>
        ) : null}
      </div>
    </Layout>
  );
};

export default Data;
