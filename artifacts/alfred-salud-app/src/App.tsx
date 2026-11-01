import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { BottomNav } from "@/components/layout/bottom-nav";
import { MobileContainer } from "@/components/layout/mobile-container";

// Pages
import { ConsultaPage } from "@/pages/consulta";
import { MedicamentosPage } from "@/pages/medicamentos";
import { HerbolariaPage } from "@/pages/herbolaria";
import { RecordatoriosPage } from "@/pages/recordatorios";
import { RecetaPage } from "@/pages/receta";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={ConsultaPage} />
      <Route path="/medicamentos" component={MedicamentosPage} />
      <Route path="/herbolaria" component={HerbolariaPage} />
      <Route path="/recordatorios" component={RecordatoriosPage} />
      <Route path="/receta" component={RecetaPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <MobileContainer>
            <main className="flex-1 overflow-y-auto pb-16">
              <Router />
            </main>
            <BottomNav />
          </MobileContainer>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
