import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import HomePage from "@/pages/home-page";
import TeamsPage from "@/pages/teams-page";
import MatchesPage from "@/pages/matches-page";
import TournamentsPage from "@/pages/tournaments-page";
import NewsPage from "@/pages/news-page";
import StreamersPage from "@/pages/streamers-page";
import MatchmakingPage from "@/pages/matchmaking-page";
import AuthPage from "@/pages/auth-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <ProtectedRoute path="/teams" component={TeamsPage} />
      <ProtectedRoute path="/matchmaking" component={MatchmakingPage} />
      <Route path="/matches" component={MatchesPage} />
      <Route path="/tournaments" component={TournamentsPage} />
      <Route path="/news" component={NewsPage} />
      <Route path="/streamers" component={StreamersPage} />
      <Route path="/auth" component={AuthPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
