import { useState } from "react";
import {
  ChatLayoutProvider,
  ChatMessages,
  ChatInput,
} from "@magemetrics/ai/react";
import { ChatLayoutStyles } from "./styles/ChatLayoutStyles";
import { RecentFlowsDisplay } from "./FlowComponents";

// =============================================================================
// CHAT LAYOUT COMPONENT
// =============================================================================
export const BuildYourOwnChatLayout = () => {
  const [flowId, setFlowId] = useState<string | undefined>(undefined);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="text-lg font-semibold text-gray-700 flex items-center gap-2 flex-shrink-0">
        💬 Custom Chat
      </div>
      <p className="text-gray-600 text-sm leading-relaxed flex-shrink-0">
        Integrate chat functionality directly into your application.
      </p>

      <ChatLayoutStyles />

      <div className="flex-1 flex overflow-hidden min-h-0 gap-5">
        <div className="flex flex-[0.3]">
          <RecentFlowsDisplay onFlowClick={setFlowId} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <ChatLayoutProvider>
            <div className="flex flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex flex-col flex-1 overflow-hidden w-full">
                <div className="flex overflow-hidden gap-5 flex-1">
                  {flowId ? (
                    <div className="flex flex-1 overflow-hidden w-full">
                      <ChatMessages flowId={flowId} />
                    </div>
                  ) : (
                    <div className="flex flex-1 text-center py-8 text-gray-500">
                      Select a flow to start chatting
                    </div>
                  )}
                </div>
                {flowId && (
                  <div className="flex align-bottom border-t border-gray-200 p-4 bg-gray-50 overflow-x-hidden">
                    <ChatInput flowId={flowId} />
                  </div>
                )}
              </div>
            </div>
          </ChatLayoutProvider>
        </div>
      </div>
    </div>
  );
};
