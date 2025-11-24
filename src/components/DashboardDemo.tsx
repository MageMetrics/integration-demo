import { useState } from "react";
import { Visualization, DataReport, DomWrapper } from "@magemetrics/ai/react";

export const DashboardDemo = () => {
  const [activeView, setActiveView] = useState<"visualization" | "report">(
    "visualization"
  );
  const [visualizationId, setVisualizationId] = useState<string>("");
  const [reportId, setReportId] = useState<string>("");

  const renderVisualization = () => (
    <div className="space-y-6">
      {/* Input for Visualization ID */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-800 mb-2">
          Visualization Configuration
        </h4>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="vis-id"
              className="block text-sm font-medium text-blue-700 mb-1"
            >
              Visualization ID
            </label>
            <input
              id="vis-id"
              type="number"
              value={visualizationId}
              onChange={(e) => setVisualizationId(e.target.value)}
              placeholder="Enter visualization ID (e.g., 123)"
              className="w-full px-3 py-2 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <p className="text-xs text-blue-600">
            Enter a pre-defined visualization ID from your MageMetrics dashboard
            to display the chart.
          </p>
        </div>
      </div>

      {/* Visualization Component */}
      {visualizationId && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Visualization Component Demo
          </h3>
          <Visualization
            visualizationId={parseInt(visualizationId)}
            withTitle={true}
          />
        </div>
      )}

      {!visualizationId && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No Visualization Selected
          </h3>
          <p className="text-gray-600">
            Please enter a visualization ID above to display a chart from your
            MageMetrics dashboard.
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">
          About the Visualization component:
        </h4>
        <p className="text-sm text-gray-600">
          The Visualization component from @magemetrics/ai/react displays charts
          and graphs based on pre-defined visualizations in your MageMetrics
          dashboard. It requires a visualization ID that corresponds to an
          existing visualization configuration.
        </p>
      </div>
    </div>
  );

  const renderReport = () => (
    <div className="space-y-6">
      {/* Input for Report ID */}
      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">
          Report Configuration
        </h4>
        <div className="space-y-3">
          <div>
            <label
              htmlFor="report-id"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Report ID
            </label>
            <input
              id="report-id"
              type="number"
              value={reportId}
              onChange={(e) => setReportId(e.target.value)}
              placeholder="Enter report ID (e.g., 456)"
              className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <p className="text-xs text-green-600">
            Enter a pre-defined report ID from your MageMetrics dashboard to
            display the report.
          </p>
        </div>
      </div>

      {/* DataReport Component */}
      {reportId && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            DataReport Component Demo
          </h3>
          <DomWrapper>
            <DataReport reportId={parseInt(reportId)} />
          </DomWrapper>
        </div>
      )}

      {!reportId && (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No Report Selected
          </h3>
          <p className="text-gray-600">
            Please enter a report ID above to display a report from your
            MageMetrics dashboard.
          </p>
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-lg">
        <h4 className="font-medium text-gray-800 mb-2">
          About the DataReport component:
        </h4>
        <p className="text-sm text-gray-600">
          The DataReport component from @magemetrics/ai/react displays
          structured reports based on pre-defined report configurations in your
          MageMetrics dashboard. It requires a report ID that corresponds to an
          existing report template.
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      {/* View Toggle Buttons */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-4 ">
        <button
          onClick={() => setActiveView("visualization")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeView === "visualization"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
          }`}
        >
          Visualization
        </button>
        <button
          onClick={() => setActiveView("report")}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            activeView === "report"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
          }`}
        >
          Report
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        {activeView === "visualization" && renderVisualization()}
        {activeView === "report" && renderReport()}
      </div>
    </div>
  );
};
