import Layout from "../../components/Layout";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [mng_no, setMng_no] = useState("");

  const router = useRouter();

  console.log(router.query);

  useEffect(() => {
    setMng_no(router.query.mng_no?.toString() || "");
  }, [router.query]);

  return (
    <Layout title="chungnam gwangwangmyeongso">
      <h1>{mng_no}</h1>
    </Layout>
  );
};

export default Home;
