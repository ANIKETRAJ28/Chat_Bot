import { SideBar } from "./components/Side-bar";
import { MainBar } from "./components/Main-bar";

function App() {
  return (
    <div className="w-full h-screen flex">
      <SideBar />
      <div className="w-0.5 bg-gray-300"></div>
      <MainBar />
    </div>
  );
}

export default App;
