import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth } from "./auth";
import { isAdmin } from "./middlewares";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up authentication routes
  setupAuth(app);

  // API routes
  // Teams
  app.get("/api/teams", async (req, res) => {
    try {
      const teams = await storage.getTeams();
      res.json(teams);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter equipas" });
    }
  });

  app.get("/api/teams/pending", isAdmin, async (req, res) => {
    try {
      const teams = await storage.getPendingTeams();
      res.json(teams);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter equipas pendentes" });
    }
  });

  app.get("/api/teams/:id", async (req, res) => {
    try {
      const team = await storage.getTeam(parseInt(req.params.id));
      if (!team) {
        return res.status(404).json({ message: "Equipa não encontrada" });
      }
      res.json(team);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter equipa" });
    }
  });

  app.post("/api/teams", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const teamData = req.body;
      teamData.ownerId = req.user.id;
      teamData.status = 'pending'; // Estado inicial: pendente para aprovação
      const team = await storage.createTeam(teamData);
      res.status(201).json(team);
    } catch (err) {
      res.status(500).json({ message: "Falha ao criar equipa" });
    }
  });

  app.put("/api/teams/:id/approve", isAdmin, async (req, res) => {
    try {
      const teamId = parseInt(req.params.id);
      const team = await storage.approveTeam(teamId);
      res.json(team);
    } catch (err) {
      res.status(500).json({ message: "Falha ao aprovar equipa" });
    }
  });

  app.put("/api/teams/:id/reject", isAdmin, async (req, res) => {
    try {
      const teamId = parseInt(req.params.id);
      const reason = req.body.reason || 'Sem motivo indicado';
      await storage.rejectTeam(teamId, reason);
      res.json({ success: true });
    } catch (err) {
      res.status(500).json({ message: "Falha ao rejeitar equipa" });
    }
  });

  app.get("/api/teams/owner/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const teams = await storage.getTeamsByOwner(userId);
      res.json(teams);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter equipas do utilizador" });
    }
  });

  // Team Membership
  app.post("/api/teams/:id/join", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const teamId = parseInt(req.params.id);
      const result = await storage.requestToJoinTeam(teamId, req.user.id);
      res.status(201).json(result);
    } catch (err) {
      res.status(500).json({ message: "Falha ao solicitar entrada na equipa" });
    }
  });

  app.put("/api/teams/:teamId/members/:userId/approve", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const teamId = parseInt(req.params.teamId);
      const userId = parseInt(req.params.userId);
      
      // Verificar se o utilizador autenticado é o dono da equipa
      const team = await storage.getTeam(teamId);
      if (!team || team.ownerId !== req.user.id) {
        return res.status(403).json({ message: "Não tem permissão para gerir esta equipa" });
      }
      
      const result = await storage.approveTeamMember(teamId, userId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Falha ao aprovar membro da equipa" });
    }
  });

  // Matches
  app.get("/api/matches", async (req, res) => {
    try {
      const matches = await storage.getMatches();
      res.json(matches);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter partidas" });
    }
  });

  app.get("/api/matches/:id", async (req, res) => {
    try {
      const match = await storage.getMatch(parseInt(req.params.id));
      if (!match) {
        return res.status(404).json({ message: "Partida não encontrada" });
      }
      res.json(match);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter partida" });
    }
  });

  // Tournaments
  app.get("/api/tournaments", async (req, res) => {
    try {
      const tournaments = await storage.getTournaments();
      res.json(tournaments);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter torneios" });
    }
  });

  app.get("/api/tournaments/:id", async (req, res) => {
    try {
      const tournament = await storage.getTournament(parseInt(req.params.id));
      if (!tournament) {
        return res.status(404).json({ message: "Torneio não encontrado" });
      }
      res.json(tournament);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter torneio" });
    }
  });

  // News
  app.get("/api/news", async (req, res) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter notícias" });
    }
  });

  app.get("/api/news/:id", async (req, res) => {
    try {
      const article = await storage.getNewsArticle(parseInt(req.params.id));
      if (!article) {
        return res.status(404).json({ message: "Artigo não encontrado" });
      }
      res.json(article);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter artigo" });
    }
  });

  // Streamers
  app.get("/api/streamers", async (req, res) => {
    try {
      const streamers = await storage.getStreamers();
      res.json(streamers);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter streamers" });
    }
  });

  app.post("/api/streamers/apply", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const streamerData = req.body;
      streamerData.userId = req.user.id;
      streamerData.verified = false; // Por padrão, não verificado até aprovação
      const streamer = await storage.createStreamerApplication(streamerData);
      res.status(201).json(streamer);
    } catch (err) {
      res.status(500).json({ message: "Falha ao submeter candidatura de streamer" });
    }
  });

  app.get("/api/streamers/pending", isAdmin, async (req, res) => {
    try {
      const streamers = await storage.getPendingStreamers();
      res.json(streamers);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter streamers pendentes" });
    }
  });

  app.put("/api/streamers/:id/verify", isAdmin, async (req, res) => {
    try {
      const streamerId = parseInt(req.params.id);
      const streamer = await storage.verifyStreamer(streamerId);
      res.json(streamer);
    } catch (err) {
      res.status(500).json({ message: "Falha ao verificar streamer" });
    }
  });

  // Player profiles
  app.get("/api/players", async (req, res) => {
    try {
      const players = await storage.getPlayers();
      res.json(players);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter jogadores" });
    }
  });

  app.post("/api/players", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const playerData = req.body;
      playerData.userId = req.user.id;
      const player = await storage.createPlayerProfile(playerData);
      res.status(201).json(player);
    } catch (err) {
      res.status(500).json({ message: "Falha ao criar perfil de jogador" });
    }
  });

  app.get("/api/players/:id", async (req, res) => {
    try {
      const playerId = parseInt(req.params.id);
      const player = await storage.getPlayerProfile(playerId);
      if (!player) {
        return res.status(404).json({ message: "Perfil de jogador não encontrado" });
      }
      res.json(player);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter perfil de jogador" });
    }
  });

  app.put("/api/players/:id", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const playerId = parseInt(req.params.id);
      const player = await storage.getPlayerProfile(playerId);
      
      if (!player) {
        return res.status(404).json({ message: "Perfil de jogador não encontrado" });
      }
      
      if (player.userId !== req.user.id) {
        return res.status(403).json({ message: "Não tem permissão para editar este perfil" });
      }
      
      const updatedProfile = await storage.updatePlayerProfile(playerId, req.body);
      res.json(updatedProfile);
    } catch (err) {
      res.status(500).json({ message: "Falha ao atualizar perfil de jogador" });
    }
  });

  // User profile
  app.get("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const profile = await storage.getUserProfile(req.user.id);
      if (!profile) {
        return res.status(404).json({ message: "Perfil não encontrado" });
      }
      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter perfil" });
    }
  });

  app.put("/api/profile", async (req, res) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Não autorizado" });
    }
    
    try {
      const profileData = req.body;
      const profile = await storage.updateUserProfile(req.user.id, profileData);
      res.json(profile);
    } catch (err) {
      res.status(500).json({ message: "Falha ao atualizar perfil" });
    }
  });

  // Admin Dashboard
  app.get("/api/admin/stats", isAdmin, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (err) {
      res.status(500).json({ message: "Falha ao obter estatísticas de administração" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
