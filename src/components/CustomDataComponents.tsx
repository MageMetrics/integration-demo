import {
  DataTable,
  useDownloadReportData,
  type Components,
} from "@magemetrics/ai/react";

// =============================================================================
// CUSTOM COMPONENTS FOR DATA VISUALIZATION
// =============================================================================
export const CustomDataTableComponent = () => {
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

const DownloadReportButton = ({ reportId }: { reportId: string }) => {
  const { download, isPending, isError } = useDownloadReportData();

  return (
    <div>
      <button
        type="button"
        onClick={() => download({ reportId })}
        disabled={isPending}
        className="text-blue-600 hover:text-blue-800 disabled:opacity-50"
      >
        {isPending ? "Downloading…" : "Download CSV"}
      </button>
      {isError && <p role="alert">Download failed. Please try again.</p>}
    </div>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const customComponents: Components = {
  dataTableCells: {
    empty: () => "N/A",
    renderTypes: {
      url: ({ formattedValue }) => {
        const url = formattedValue?.display;
        if (!url || !/^https?:\/\//i.test(url)) return url ?? null;
        return (
          <a
            href={url}
            className="text-blue-600 hover:text-blue-800 underline"
          >
            View Link
          </a>
        );
      },
    },
  },
  dataReportTable: () => {
    return <CustomDataTableComponent />;
  },
  // avatar: <img src="https://example.com/image.jpg" alt="Avatar" />,
  dataReportMessageActions: (props) => {
    return <DownloadReportButton reportId={props.report.uuid} />;
  },
};
