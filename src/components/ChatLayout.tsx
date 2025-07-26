import { useState } from "react";
import {
  ChatLayoutProvider,
  ChatMessages,
  ChatInput,
  Chat,
} from "@magemetrics/ai/react";
import { ChatLayoutStyles } from "./styles/ChatLayoutStyles";
import { RecentFlowsDisplay } from "./FlowComponents";

// =============================================================================
// CHAT LAYOUT COMPONENT
// =============================================================================
export const BuildYourOwnChatLayout = () => {
  const [flowId, setFlowId] = useState<string | undefined>(undefined);
  const [chatMode, setChatMode] = useState<"chat" | "messages-input">(
    "messages-input"
  );

  return (
    <div className="flex flex-col h-full gap-6 overflow-hidden">
      <div className="text-lg font-semibold text-gray-700 flex items-center gap-2 flex-shrink-0">
        💬 Custom Chat
        <button
          onClick={() =>
            setChatMode(chatMode === "chat" ? "messages-input" : "chat")
          }
          className="ml-auto px-3 py-1 text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-md transition-colors"
        >
          {chatMode === "chat"
            ? "Switch to Messages + Input"
            : "Switch to Chat Component"}
        </button>
      </div>
      <p className="text-gray-600 text-sm leading-relaxed flex-shrink-0">
        Integrate chat functionality directly into your application.
      </p>

      <ChatLayoutStyles />

      <div className="flex-1 flex overflow-hidden min-h-0 gap-5">
        <div className="flex flex-[0.3] min-h-0 h-full">
          <RecentFlowsDisplay onFlowClick={setFlowId} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          <ChatLayoutProvider>
            <div className="flex flex-1 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <div className="flex flex-col flex-1 min-h-0 w-full">
                <div className="flex-1 min-h-0">
                  {flowId ? (
                    chatMode === "chat" ? (
                      <Chat flowId={flowId} />
                    ) : (
                      <div className="h-full overflow-y-auto">
                        <ChatMessages flowId={flowId} />
                      </div>
                    )
                  ) : (
                    <div className="flex h-full text-center text-gray-500 items-center justify-center">
                      Select a flow to start chatting
                    </div>
                  )}
                </div>
                {flowId && chatMode === "messages-input" && (
                  <div className="flex-shrink-0 bg-transparent">
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
