import { useState } from "react";
import { Button } from "@mantine/core";
import { useClient } from "@hooks/use-client";

// =============================================================================
// JWT CONFIGURATION COMPONENT
// =============================================================================

export const JwtConfiguration = () => {
  const { user, setExternalJwt } = useClient();
  const [jwtInput, setJwtInput] = useState("");

  const handleSaveJwt = () => {
    if (jwtInput.trim()) {
      setExternalJwt(jwtInput.trim());
      localStorage.setItem("magemetrics_jwt", jwtInput.trim());
      setJwtInput("");
    }
  };

  const clearJwt = () => {
    setExternalJwt("");
    localStorage.removeItem("magemetrics_jwt");
  };

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6">
      <div className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
        🔑 Authentication Setup
      </div>

      {!user.session ? (
        <div className="space-y-6">
          <p className="text-gray-600 text-sm leading-relaxed">
            Provide your JWT token to authenticate with the MageMetrics API.
          </p>

          <div className="space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Paste your JWT token here..."
                value={jwtInput}
                onChange={(e) => setJwtInput(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all placeholder-gray-500 text-gray-900"
              />
            </div>
            <button
              onClick={handleSaveJwt}
              disabled={!jwtInput.trim()}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Save Token
            </button>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-blue-800 font-semibold text-sm mb-2">
              How to get your JWT token:
            </h3>
            <ol className="text-blue-700 text-sm space-y-1 list-decimal list-inside">
              <li>Log into your application</li>
              <li>Open browser developer tools (F12)</li>
              <li>Check localStorage or session storage for your auth token</li>
              <li>Copy the token and paste it above</li>
            </ol>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full">
              ✓ Token Configured
            </div>
            <Button onClick={clearJwt} variant="outline" size="sm">
              Clear
            </Button>
          </div>
          <div className="font-mono text-xs text-gray-600 bg-gray-100 p-2 rounded border">
            {user.session.access_token.substring(0, 30)}...
          </div>
        </div>
      )}
    </div>
  );
};
