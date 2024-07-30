import "./App.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import AppRouter from "./routes/AppRouter";
import { AuthProvider } from "./context/AuthProvider";
import { SidebarProvider } from "./context/SidebarProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SidebarProvider>
          <AppRouter />
        </SidebarProvider>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
