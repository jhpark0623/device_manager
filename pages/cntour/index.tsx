import Layout from "../../components/Layout";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Item {
  mng_no: string;
  local_nm: string;
  type: string;
  nm: string;
  nm_sub: string;
  addr: string;
  lat: string;
  lng: string;
  tel: string;
  h_url: string;
  desc: string;
  list_img: string;
}

interface Item_info {
  item: Item[];
}

interface Result {
  item_info: Item_info;
}

interface CntourlistRes {
  name: String;
  result?: Result;
}

const Home: NextPage = () => {
  const [totalCnt, setTotalCnt] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [tours, setTours] = useState<Item[] | undefined>([]);

  const more = () => {
    fetch(`/api/tour/cntourlist?start=${pageNum}&end=${pageNum + 4}`)
      .then((res) => res.json())
      .then((json: CntourlistRes) => {
        const arr = tours || [];
        const newArr = json.result?.item_info.item || [];
        setTours([...arr, ...newArr]);
        setPageNum(pageNum + 5);
      });
  };

  useEffect(() => {
    fetch("/api/tour/cntour")
      .then((res) => res.json())
      .then((json) => setTotalCnt(json.totalCnt));
  }, []);

  useEffect(() => {
    more();
  }, []);

  return (
    <Layout title="chungnam gwangwangmyeongso">
      <div className="p-3">
        <div className="text-3xl">{totalCnt}개의 관광명소가 있데요</div>
        {tours?.map((list, idx) => (
          <Link href={`/cntour/${list.mng_no}`}>
            <button>
              <div
                key={idx}
                className=" border-2 border-red-500 space-y-2 p-2 relative my-3"
              >
                <div>{list.mng_no}</div>
                <div>{list.local_nm}</div>
                <div>{list.type}</div>
                <div>{list.nm}</div>
                <div>{list.nm_sub}</div>
                <div>주소 : {list.addr}</div>
                <div>
                  좌표 : {list.lat} , {list.lng}
                </div>
                <div>전화번호 : {list.tel}</div>
                {list.h_url ? <div>웹사이트 : {list.h_url}</div> : null}
                <div>{list.desc}</div>
                <div className="w-56 absolute top-1 right-3">
                  <img src={list.list_img}></img>
                </div>
              </div>
            </button>
          </Link>
        ))}
        <button className="bg-red-300 w-full h-10" onClick={more}>
          더보기 ({tours?.length} / {totalCnt}) - {pageNum}
        </button>
      </div>
    </Layout>
  );
};

export default Home;
