import type { NextPage } from "next";

// alias 적용할 것
// import { getPage } from "@whatap-experts/api/notion";
import { NotionRenderer } from "react-notion-x";
import { getPage } from "../../whatap-experts-api/src/notion";

const Home: NextPage = ({ recordMap }) => {
  return (
    <div>
      <NotionRenderer recordMap={recordMap} fullPage={true} darkMode={false} />
    </div>
  );
};

export async function getStaticProps() {
  const pageId = "78feeb56857345aaa929de668c918355";
  const recordMap = await getPage(pageId);

  return {
    props: {
      recordMap,
    },
  };
}

export default Home;
