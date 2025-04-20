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
import PlayerProfilePage from "@/pages/player-profile-page";
import TeamCreationPage from "@/pages/team-creation-page";
import StreamerApplicationPage from "@/pages/streamer-application-page";
import AdminPage from "@/pages/admin-page";
import { ProtectedRoute } from "./lib/protected-route";
import { AuthProvider } from "./hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/teams" component={TeamsPage} />
      <ProtectedRoute path="/team-creation" component={TeamCreationPage} />
      <ProtectedRoute path="/player-profile" component={PlayerProfilePage} />
      <ProtectedRoute path="/matchmaking" component={MatchmakingPage} />
      <ProtectedRoute path="/streamer-application" component={StreamerApplicationPage} />
      <ProtectedRoute path="/admin" component={AdminPage} />
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
