import { TabsType } from "@/utils/types";

interface TabsProps {
  isActiveTab: TabsType;
  setIsActiveTab: React.Dispatch<React.SetStateAction<TabsType>>;
}

export const Tabs = ({ isActiveTab, setIsActiveTab }: TabsProps) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={() => setIsActiveTab("All")}
        className={`p-2 ${
          isActiveTab === "All" && "bg-sky-500 text-white"
        } cursor-pointer`}
      >
        All
      </button>
      <button
        onClick={() => setIsActiveTab("Pending")}
        className={`p-2 ${
          isActiveTab === "Pending" && "bg-sky-500 text-white"
        } cursor-pointer`}
      >
        Pending
      </button>
      <button
        onClick={() => setIsActiveTab("Completed")}
        className={`p-2 ${
          isActiveTab === "Completed" && "bg-sky-500 text-white"
        } cursor-pointer`}
      >
        Completed
      </button>
    </div>
  );
};
