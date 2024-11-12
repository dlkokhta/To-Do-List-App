import Header from "../components/Header";
import SearchNotes from "../components/SearchNotes";
import CreateTask from "../components/CreateTask";

export default function Home() {
  return (
    <div className="pt-[30px] px-5 bg-bgColor h-screen">
      <Header />
      <SearchNotes />
      <CreateTask />
    </div>
  );
}
