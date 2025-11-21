import { Outlet } from "react-router-dom";
import AgentSidebar from "../../components/agent/AgentSidebar";
import Header from "../../components/Header";

export default function AgentLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <AgentSidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />  
        <main className="p-4 overflow-y-auto">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
}
