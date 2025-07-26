import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ApiService,
  StandaloneConversationModal,
  useStartFlow,
} from "@magemetrics/ai/react";

const API_URL = "https://api.magemetrics.com";
// =============================================================================
// FLOWS-RELATED COMPONENTS
// =============================================================================

export const RecentFlowsDisplay = ({
  onFlowClick,
}: {
  onFlowClick?: (flowId: string) => void;
}) => {
  const { data } = useQuery({
    queryKey: ["recentFlows", { limit: 10 }],
    queryFn: async () => {
      const client = new ApiService(API_URL);
      return client.getRecentFlows({
        limit: 20,
      });
    },
  });

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="text-lg font-semibold text-gray-700 flex items-center gap-2 flex-shrink-0">
        Recent Flows
      </div>

      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="flex flex-col gap-3 pr-2">
          {data ? (
            data.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:border-blue-300 hover:shadow-sm transition-all"
                onClick={() => onFlowClick?.(item.id)}
              >
                <div className="font-medium text-gray-800 text-sm mb-1 line-clamp-2">
                  {item.request || "Unnamed Flow"}
                </div>
                <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded inline-block">
                  {item.id}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">
              Loading recent flows...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const StartFlowDemo = () => {
  const { startFlow } = useStartFlow({
    onSuccess(data, variables, context) {
      console.log("Flow started successfully", { data, variables, context });
    },
  });

  return (
    <div className="space-y-6">
      <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        ⚡ Trigger Demo
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        Start a predefined flow with specific variables.
      </p>
      <button
        onClick={() => {
          startFlow({
            triggerId: "best-supplier",
            variables: {
              year: "2024",
            },
          });
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
      >
        Start "Best Supplier" Flow
      </button>
    </div>
  );
};

export const NewApiFlowCreator = () => {
  const [prompt, setPrompt] = useState("");
  const [flowId, setFlowId] = useState<string | null>(null);
  const [isOpened, setIsOpened] = useState(false);

  const handleStartFlow = async () => {
    if (!prompt) return;

    try {
      const apiClient = new ApiService(API_URL);
      const newFlowId = await apiClient.startFlow({ query: prompt });
      setFlowId(newFlowId);
      setIsOpened(true);
    } catch (error) {
      console.error("Failed to start flow", error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        🚀 Create New Flow
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        Start a new conversation by entering a natural language prompt.
      </p>

      <div className="flex flex-col space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your prompt (e.g., 'Show me sales data for Q4')"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-500 text-gray-900"
          />
        </div>

        <button
          onClick={() => void handleStartFlow()}
          disabled={!prompt}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
        >
          Create & Open Flow
        </button>
      </div>

      {flowId && (
        <StandaloneConversationModal
          opened={isOpened}
          onOpenChange={setIsOpened}
          flowId={flowId}
        />
      )}
    </div>
  );
};

export const LegacyFlowTester = () => {
  const [flowId, setFlowId] = useState<string | undefined>(undefined);
  const [isOpened, setIsOpened] = useState(false);

  return (
    <div className="flex flex-1 flex-col space-y-6">
      <div className="text-lg font-semibold text-gray-700 flex items-center gap-2">
        📂 Open Existing Flow
      </div>
      <p className="text-gray-600 text-sm leading-relaxed">
        Open an existing conversation by ID or select from recent flows.
      </p>

      <div className="flex flex-1 flex-col gap-6 content-center">
        <RecentFlowsDisplay
          onFlowClick={(flowId) => {
            setFlowId(flowId);
            setIsOpened(true);
          }}
        />
      </div>

      {flowId && (
        <StandaloneConversationModal
          opened={isOpened}
          onOpenChange={setIsOpened}
          flowId={flowId}
        />
      )}
    </div>
  );
};
