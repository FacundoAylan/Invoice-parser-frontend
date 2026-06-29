import { Outlet } from "react-router";
import { Footer, Navbar } from "@/components";

function App() {

  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <main className="flex-1 min-h-0 flex">
        <Outlet/>
      </main>

      <Footer />
    </div>
  );
}

export default App;
