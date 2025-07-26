import { ClientProvider } from "@hooks/use-client";
import { TestContent } from "./components/TestContent";

function App() {
  return (
    <ClientProvider>
      <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden">
        <div className="bg-white border-b border-gray-200 p-6 text-center flex-shrink-0 w-full">
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            MageMetrics Integration Demo
          </h1>
          <p className="text-gray-600 text-sm">
            Professional demo for testing MageMetrics AI integration
          </p>
        </div>

        <div className="flex-1 flex flex-col p-4 w-full overflow-hidden">
          <TestContent />
        </div>
      </div>
    </ClientProvider>
  );
}

export default App;
