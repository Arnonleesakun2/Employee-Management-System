import AppRoute from "./routes/AppRoute";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AppRoute />
        <Toaster />
      </ThemeProvider>
    </>
  );
}

export default App;
