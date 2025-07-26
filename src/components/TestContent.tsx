import { useState } from "react";
import { MageMetricsContextProvider } from "@magemetrics/ai/react";
import { useClient } from "@hooks/use-client";
import { JwtConfiguration } from "./JwtConfiguration";
import {
  NewApiFlowCreator,
  LegacyFlowTester,
  StartFlowDemo,
} from "./FlowComponents";
import { BuildYourOwnChatLayout } from "./ChatLayout";
import { customComponents } from "./CustomDataComponents";
import { DashboardDemo } from "./DashboardDemo";

const API_URL = "https://api.magemetrics.com";

export const TestContent = () => {
  const { user } = useClient();
  const [activeTab, setActiveTab] = useState<string>("flow-creator");

  // Show JWT configuration if no session
  if (!user.session) {
    return <JwtConfiguration />;
  }

  const tabs = [
    {
      id: "flow-creator",
      label: "Create Flow",
      component: NewApiFlowCreator,
    },
    {
      id: "legacy-tester",
      label: "Existing Flows",
      component: LegacyFlowTester,
    },
    {
      id: "build-your-own-chat-layout",
      label: "Custom Chat",
      component: BuildYourOwnChatLayout,
    },
    {
      id: "analytics-trigger-demo",
      label: "In-Context triggers",
      component: StartFlowDemo,
      disabled: true,
    },
    {
      id: "dashboard-demo",
      label: "Dashboard & Analytics",
      component: DashboardDemo,
    },
  ];

  const ActiveComponent =
    tabs.find((tab) => tab.id === activeTab)?.component || NewApiFlowCreator;

  return (
    <MageMetricsContextProvider
      externalJwt={user.session.access_token}
      apiKey="mm-magemetrics-test"
      apiUrl={API_URL}
      experimental_components={customComponents}
    >
      <div className="flex flex-col h-full w-full">
        <JwtConfiguration />

        <div className="flex flex-col flex-1 bg-white border border-gray-200 rounded-xl p-6 shadow-sm min-h-0">
          <div className="flex flex-wrap gap-2 border-b border-gray-200 pb-4 flex-shrink-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                disabled={tab.disabled}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                } ${tab.disabled ? "cursor-not-allowed" : ""}`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <ActiveComponent />
        </div>
      </div>
    </MageMetricsContextProvider>
  );
};
