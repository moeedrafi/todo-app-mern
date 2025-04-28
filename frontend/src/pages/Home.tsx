import { useState } from "react";

import { Tabs } from "@/components/todos/Tabs";
import { TabsType } from "@/utils/types";
import { Todos } from "@/components/todos/Todos";
import { SearchInput } from "@/components/todos/SearchInput";

const Home = () => {
  const [isActiveTab, setIsActiveTab] = useState<TabsType>("All");

  return (
    <section
      aria-labelledby="home-section-title"
      className="py-8 px-8 md:px-16 lg:px-32 xl:px-64"
    >
      <SearchInput />
      <Tabs isActiveTab={isActiveTab} setIsActiveTab={setIsActiveTab} />
      <Todos isActiveTab={isActiveTab} />
    </section>
  );
};

export default Home;
