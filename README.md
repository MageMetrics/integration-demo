# 🔮 MageMetrics Integration Demo

A beautiful, production-ready demo showcasing the power of MageMetrics AI integration. Built with React 19, TypeScript, and Tailwind CSS.

## ✨ Features

- **🚀 Flow Creator**: Start new AI conversations with natural language prompts
- **📂 Existing Flows**: Browse and reopen previous conversations
- **💬 Custom Chat**: Build your own chat interface with MageMetrics components
- **⚡ Trigger Demo**: Programmatically start predefined analytics flows
- **🎨 Beautiful UI**: Modern glassmorphism design with smooth animations
- **🔑 JWT Authentication**: Secure integration with your existing auth system

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone or fork this repository**

   ```bash
   git clone <your-repo-url>
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
demo/
├── src/
│   ├── hooks/
│   │   └── use-client.tsx     # Authentication context
│   ├── App.tsx                # Main demo application
│   ├── main.tsx              # React entry point
│   ├── index.css             # Tailwind + custom styles
│   └── vite-env.d.ts         # TypeScript environment types
├── index.html                # HTML entry point
├── package.json              # Dependencies & scripts
├── vite.config.ts            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
└── README.md                 # This file
```

## 🎯 Usage Examples

### Starting a New Flow

```typescript
import { ApiService } from "@magemetrics/ai/react";

const apiClient = new ApiService(API_URL);
const flowId = await apiClient.startFlow({
  query: "Show me sales data for Q4",
});
```

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
import {
  ChatLayoutProvider,
  ChatMessages,
  ChatInput,
} from "@magemetrics/ai/react";

<ChatLayoutProvider>
  <div className="chat-container">
    <ChatMessages flowId={flowId} />
    <ChatInput flowId={flowId} />
  </div>
</ChatLayoutProvider>;
```

### Triggering Predefined Flows

```typescript
import { useStartFlow } from "@magemetrics/ai/react";

const { startFlow } = useStartFlow({
  onSuccess(data, variables, context) {
    console.log("Flow started successfully", { data, variables, context });
  },
});

startFlow({
  triggerId: "best-supplier",
  variables: { year: "2024" },
});
```

## 🔧 Customization

### Custom Components

The demo includes custom component examples:

```typescript
const customComponents: Components = {
  dataTableCells: {
    empty: () => "N/A",
    renderTypes: {
      url: (props: unknown) => {
        if (typeof props !== "string") return null;
        return <a href={props}>VIEW LINK</a>;
      },
    },
  },
  dataReportTable: (props) => {
    return <CustomDataTableComponent {...props} />;
  },
};
```

### Styling

The demo uses Tailwind CSS with custom glassmorphism effects. Customize the look in:

- `src/index.css` - Main styles and custom CSS
- `tailwind.config.js` - Tailwind configuration
- Custom CSS classes for MageMetrics components

## 📚 MageMetrics Documentation

For complete documentation on MageMetrics AI components and APIs:

- [Component Documentation](https://docs.magemetrics.com/components)
- [API Reference](https://docs.magemetrics.com/api)
- [Integration Guide](https://docs.magemetrics.com/integration)

## 🤝 Support

Need help with your integration?

- 📧 Email: support@magemetrics.com
- 💬 Discord: [Join our community](https://discord.gg/magemetrics)
- 📖 Docs: [docs.magemetrics.com](https://docs.magemetrics.com)

## 📜 License

This demo is MIT licensed. Feel free to fork, modify, and use it in your own projects!

---

**Built with ❤️ by the MageMetrics team**
