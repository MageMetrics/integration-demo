# 🔮 MageMetrics Integration Demo

A beautiful, production-ready demo showcasing the power of MageMetrics AI integration. Built with React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- **🚀 Flow Creator**: Start new AI conversations with natural language prompts
- **📂 Existing Flows**: Browse and reopen previous conversations
- **💬 Custom Chat**: Build your own chat interface with MageMetrics components
- **⚡ In-Context Triggers**: Programmatically start predefined analytics flows
- **📊 Dashboard & Analytics**: Display visualizations and reports from your MageMetrics dashboard
- **🎨 Beautiful UI**: Modern design with Mantine components and Tailwind CSS
- **🔑 JWT Authentication**: Secure integration with your existing auth system
- **🔧 Custom Components**: Extensible component system for data visualization

## 🚀 Quick Start

### Prerequisites

- Node.js 22+
- npm, yarn, or pnpm

### Installation

1. **Clone or fork this repository**

   ```bash
   git clone <your-repo-url> magemetrics-integration-demo
   cd magemetrics-integration-demo
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### 🔑 Adding Your JWT Token

When you first open the demo, you'll need to provide your JWT token:

1. **Get your JWT token** from your authentication system
2. **Paste it** in the JWT Configuration section
3. **Start exploring** the MageMetrics features!

The token will be saved in localStorage for convenience during development.

## 🏗️ Project Structure

```
magemetrics-ext-demo/
├── src/
│   ├── components/
│   │   ├── ChatLayout.tsx           # Custom chat interface components
│   │   ├── CustomDataComponents.tsx # Custom data visualization components
│   │   ├── DashboardDemo.tsx        # Visualization & report demos
│   │   ├── FlowComponents.tsx       # Flow creation and management
│   │   ├── JwtConfiguration.tsx     # JWT token management
│   │   ├── TestContent.tsx          # Main demo content
│   │   └── styles/
│   │       └── ChatLayoutStyles.tsx # Chat styling components
│   ├── config/                      # Configuration files
│   ├── hooks/
│   │   └── use-client.tsx           # Authentication context
│   ├── App.tsx                      # Main application entry
│   ├── main.tsx                     # React entry point
│   └── index.css                    # Tailwind + custom styles
├── index.html                       # HTML entry point
├── package.json                     # Dependencies & scripts
├── vite.config.ts                   # Vite configuration
├── eslint.config.js                 # ESLint configuration
├── tsconfig.json                    # TypeScript configuration
└── README.md                        # This file
```

## 🎯 Usage Examples

### Using the Standalone Modal

```tsx
import { StandaloneConversationModal } from "@magemetrics/ai/react";

<StandaloneConversationModal
  opened={isOpened}
  onOpenChange={setIsOpened}
  flowId={flowId}
/>;
```

### Building Custom Chat Layout

```tsx
import { Chat } from "@magemetrics/ai/react";

<div className="chat-container">
  <Chat flowId={flowId} />
</div>;
```

### Using Dashboard Components

```tsx
import {
  Visualization,
  StandaloneDataTable,
  useReport,
  DomWrapper,
} from "@magemetrics/ai/react";

// Display a visualization
<Visualization
  visualizationId="your-visualization-id"
  withTitle={true}
/>

// Display a data report
function ReportPreview({ reportId }: { reportId: string }) {
  const { data: report, isLoading, isError } = useReport(reportId);
  if (isLoading) return <p>Loading report…</p>;
  if (isError) return <p>Unable to load this report.</p>;
  if (!report) return <p>No report found.</p>;

  return (
    <DomWrapper>
      <div style={{ height: 400, display: "flex", overflow: "hidden" }}>
        <StandaloneDataTable key={report.uuid} report={report} />
      </div>
    </DomWrapper>
  );
}
```

### Triggering Predefined Flows

```typescript
import { useCreateFlow } from "@magemetrics/ai/react";

const { createFlow } = useCreateFlow({
  onSuccess({ flowId }, variables, context) {
    console.log("Flow started successfully", { flowId, variables, context });
  },
});

createFlow({
  triggerId: "best-supplier",
  variables: { year: "2024" },
});
```

## 🔧 Customization

### Custom Components

The demo includes custom component examples for data visualization:

```typescript
import { type Components, DataTable } from "@magemetrics/ai/react";

const customComponents: Components = {
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
    return (
      <div style={{ height: 400, display: "flex", overflow: "hidden" }}>
        <DataTable />
      </div>
    );
  },
};
```

### Styling & UI Framework

The demo uses a modern tech stack:

- **Tailwind CSS 4.x** - Utility-first CSS framework
- **Custom CSS** - Additional styling in `src/index.css`

Customize the look in:

- `src/index.css` - Main styles and custom CSS
- `src/components/styles/` - Component-specific styles

---

**Built with ❤️ by the MageMetrics team**
