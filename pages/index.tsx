import type { NextPage } from "next";
import { Device } from "@prisma/client";
import Link from "next/link";
import { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import Layout from "../components/Layout";

import Toggle from "react-toggle";
import { PacmanLoader } from "react-spinners";

const Home: NextPage = () => {
  const [device, setDevice] = useState<Device[]>([]);
  const [realTime, setRealTime] = useState(false);

  useEffect(() => {
    fetch("../api/device/device")
      .then((res) => res.json())
      .then((json) => setDevice(json.device));
  }, [realTime]);

  return (
    <Layout title="HOME">
      <div className="p-6 h-full  select-none">
        {/* Wellcome message */}
        <div className="flex justify-between">
          <div>
            <div className="text-3xl font-bold pb-1">Hello PJH ✨</div>
            <div className="text-gray-500">Wellcome back to home</div>
          </div>

          {/* Add Device btn */}
          <Link href={"/setting"}>
            <button className="rounded-2xl text-white sunmoon_btn py-4 px-5 flex space-x-2 items-center">
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
          </Link>
        </div>

        {/* Linked to you */}
        <div className="flex justify-between my-7  h-12 items-center">
          <div className="text-2xl font-bold">Linked to you</div>
          <div className="flex items-center space-x-2 select-none">
            {realTime || (
              <div className="w-[90px] h-12">
                <PacmanLoader color="red" />
              </div>
            )}

            <Toggle
              id="cheese-status"
              onClick={() => setRealTime(!realTime)}
              defaultChecked={realTime}
            ></Toggle>
            <label htmlFor="cheese-status">
              실시간 <span>{realTime ? "ON" : "OFF"}</span>
            </label>
          </div>
        </div>

        {/* 센서 목록 */}
        <div id="센서 목록" className="flex flex-wrap">
          {device.map((device) => (
            <DeviceCard key={device.id} device={device} realTime={realTime} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
