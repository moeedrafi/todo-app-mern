import { TabsType } from "@/utils/types/types";

interface TabsProps {
  isActiveTab: TabsType;
  setIsActiveTab: React.Dispatch<React.SetStateAction<TabsType>>;
}

export const Tabs = ({ isActiveTab, setIsActiveTab }: TabsProps) => {
  return (
    <div
      role="tablist"
      aria-label="Todo Filter Tabs"
      className="flex items-center justify-center"
    >
      {["All", "Pending", "Completed"].map((tab) => (
        <button
          key={tab}
          role="tab"
          id={`tab-${tab.toLowerCase()}`}
          aria-selected={isActiveTab === tab}
          aria-controls={`panel-${tab.toLowerCase()}`}
          onClick={() => setIsActiveTab(tab as TabsType)}
          className={`p-2 ${
            isActiveTab === tab && "bg-sky-500 text-white"
          } cursor-pointer`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
