import { useState } from "react";
import { Chat } from "@magemetrics/ai/react";
import { RecentFlowsDisplay } from "./FlowComponents";

// =============================================================================
// CHAT LAYOUT COMPONENT
// =============================================================================
export const BuildYourOwnChatLayout = () => {
  const [flowId, setFlowId] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-row size-full gap-6 overflow-hidden">
      <div className="flex flex-col flex-[0.3] h-full gap-6 overflow-hidden">
        <div className="text-lg font-semibold text-gray-700 flex items-center gap-2 flex-shrink-0">
          💬 Custom Chat
        </div>
        <p className="text-gray-600 text-sm leading-relaxed flex-shrink-0">
          Integrate chat functionality directly into your application.
        </p>

        <div className="flex flex-1 min-h-0 h-full">
          <RecentFlowsDisplay onFlowClick={setFlowId} />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="flex flex-col flex-1 min-h-0 w-full">
            <div className="flex-1 min-h-0">
              {flowId ? (
                <Chat flowId={flowId} />
              ) : (
                <div className="flex h-full text-center text-gray-500 items-center justify-center">
                  Select a flow to start chatting
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
