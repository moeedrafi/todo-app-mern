import { useState } from "react";

import { Tabs } from "@/components/Tabs";
import { TabsType } from "@/utils/types";
import { Todos } from "@/components/Todos";
import { SearchInput } from "@/components/SearchInput";

const Home = () => {
  const [isActiveTab, setIsActiveTab] = useState<TabsType>("All");

  return (
    <div className="py-8 px-8 md:px-16 lg:px-32 xl:px-64">
      <SearchInput />
      <Tabs isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
      <Todos isActiveTab={isActiveTab} />
    </div>
  );
};

export default Home;
