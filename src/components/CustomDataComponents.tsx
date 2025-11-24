import {
  DataTable,
  type Components,
  type DataReportMessageProps,
} from "@magemetrics/ai/react";

// =============================================================================
// CUSTOM COMPONENTS FOR DATA VISUALIZATION
// =============================================================================
export const CustomDataTableComponent = (props: DataReportMessageProps) => {
  return (
    <div
      style={{
        height: "400px",
        overflow: "hidden",
        display: "flex",
      }}
    >
      <DataTable {...props} />
    </div>
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
};
