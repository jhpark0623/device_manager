import { Device } from "@prisma/client";
import { useEffect, useState } from "react";
import { cls } from "../libs/client/utils";

interface DeviceCardProps {
  device: Device;
  realTime: boolean;
}

const DeviceCard = ({ device, realTime }: DeviceCardProps) => {
  const [value, setValue] = useState();
  const [bbong, setBbong] = useState("");
  const [timerId, setTimerId] = useState<NodeJS.Timer>();

  const sencingDataUpdate = () => {
    fetch(`../api/sencing/${device.id}`)
      .then((res) => res.json())
      .then((json) => {
        setValue(json.value);
        setBbong(" text-red-500");
        setTimeout(() => {
          setBbong("");
        }, 1000);
      });
  };

  useEffect(() => {
    if (realTime) setTimerId(setInterval(() => sencingDataUpdate(), 5000));
    else clearInterval(timerId);
  }, [realTime]);

  useEffect(() => {
    sencingDataUpdate();
  }, []);

  return (
    <div
      key={device.id}
      data-comment="장비카드"
      className="bg-[#7fceff] hover:bg-[#44b3f8] dark:hover:bg-[#494f53] dark:bg-[#2f3238] rounded-xl w-[250px] h-52 justify-between p-4 flex flex-col m-2"
    >
      <div className="flex justify-end space-x-1">
        <span className={cls("text-5xl font-bold" + bbong)}>
          {value ? value : "-"}
        </span>
        <span className="text-2xl">{device.unit}</span>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-700 dark:text-gray-300">
          {device.location}
          {device.memo ? <span> - {device.memo}</span> : null}
        </span>
        <span className="text-3xl font-bold">{device.productName}</span>
      </div>
    </div>
  );
};

export default DeviceCard;
