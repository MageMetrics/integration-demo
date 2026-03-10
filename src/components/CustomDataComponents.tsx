import {
  DataTable,
  useDownloadReportData,
  type Components,
  type Report,
} from "@magemetrics/ai/react";

// =============================================================================
// CUSTOM COMPONENTS FOR DATA VISUALIZATION
// =============================================================================
export const CustomDataTableComponent = (_props: { report: Report }) => {
  return (
    <div
      style={{
        height: "400px",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <DataTable />
    </div>
  );
};

const DownloadReportButton = ({ reportId }: { reportId: number }) => {
  const { download } = useDownloadReportData();
  return (
    <button
      onClick={() => download({ reportId })}
      className="text-sm text-blue-600 hover:text-blue-800 underline"
    >
      Download CSV
    </button>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const customComponents: Components = {
  dataTableCells: {
    empty: () => "N/A",
    renderTypes: {
      url: (props: unknown) => {
        if (typeof props !== "string") return null;
        return (
          <a
            href={props}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Link
          </a>
        );
      },
    },
  },
  dataReportTable: (props) => {
    return <CustomDataTableComponent {...props} />;
  },
  // avatar: <img src="https://example.com/image.jpg" alt="Avatar" />,
  dataReportMessageActions: (props) => {
    return <DownloadReportButton reportId={props.report.id} />;
  },
};
