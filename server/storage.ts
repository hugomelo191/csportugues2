import { users, type User, type InsertUser, type Team, type Match, type Tournament, type News, type Player, type PlayerProfile, type Streamer, type UserProfile } from "@shared/schema";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import createMemoryStore from "memorystore";
import session from "express-session";

const scryptAsync = promisify(scrypt);

const MemoryStore = createMemoryStore(session);

// Interfaces adicionais para estruturas internas de dados
interface TeamApplication extends Team {
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
}

interface TeamMemberRequest {
  teamId: number;
  userId: number;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
}

interface StreamerApplication extends Streamer {
  userId: number;
  verified: boolean;
  rejectionReason?: string;
  applicationType: 'streamer' | 'caster' | 'both';
}

interface AdminStats {
  pendingTeams: number;
  pendingStreamers: number;
  totalUsers: number;
  totalTeams: number;
  totalPlayers: number;
  recentActivity: Array<{
    action: string;
    timestamp: Date;
    entityId: number;
    entityType: string;
  }>;
}

export interface IStorage {
  // User authentication
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Teams
  getTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: any): Promise<Team>;
  getPendingTeams(): Promise<Team[]>;
  approveTeam(id: number): Promise<Team>;
  rejectTeam(id: number, reason: string): Promise<void>;
  getTeamsByOwner(userId: number): Promise<Team[]>;
  
  // Team membership
  requestToJoinTeam(teamId: number, userId: number): Promise<TeamMemberRequest>;
  approveTeamMember(teamId: number, userId: number): Promise<Team>;
  
  // Matches
  getMatches(): Promise<Match[]>;
  getMatch(id: number): Promise<Match | undefined>;
  
  // Tournaments
  getTournaments(): Promise<Tournament[]>;
  getTournament(id: number): Promise<Tournament | undefined>;
  
  // News
  getNews(): Promise<News[]>;
  getNewsArticle(id: number): Promise<News | undefined>;
  
  // Streamers
  getStreamers(): Promise<Streamer[]>;
  createStreamerApplication(streamer: any): Promise<Streamer>;
  getPendingStreamers(): Promise<Streamer[]>;
  verifyStreamer(id: number): Promise<Streamer>;
  
  // Player profiles
  getPlayers(): Promise<Player[]>;
  createPlayerProfile(player: any): Promise<PlayerProfile>;
  getPlayerProfile(id: number): Promise<PlayerProfile | undefined>;
  updatePlayerProfile(id: number, data: any): Promise<PlayerProfile>;
  
  // User profiles
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  updateUserProfile(userId: number, profile: any): Promise<UserProfile>;
  
  // Notificações
  getUserNotifications(userId: number): Promise<Notification[]>;
  markNotificationAsRead(id: number): Promise<void>;
  createUserNotification(notification: any): Promise<Notification>;
  
  // Admin
  getAdminStats(): Promise<AdminStats>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teams: Map<number, TeamApplication>;
  private matches: Map<number, Match>;
  private tournaments: Map<number, Tournament>;
  private news: Map<number, News>;
  private streamers: Map<number, StreamerApplication>;
  private players: Map<number, Player>;
  private playerProfiles: Map<number, PlayerProfile>;
  private userProfiles: Map<number, UserProfile>;
  private notifications: Map<number, Notification>;
  private teamMemberRequests: TeamMemberRequest[];
  private activityLog: Array<{
    action: string;
    timestamp: Date;
    entityId: number;
    entityType: string;
  }>;
  
  currentId: number;
  sessionStore: session.SessionStore;

  constructor() {
    this.users = new Map();
    this.teams = new Map();
    this.matches = new Map();
    this.tournaments = new Map();
    this.news = new Map();
    this.streamers = new Map();
    this.players = new Map();
    this.playerProfiles = new Map();
    this.userProfiles = new Map();
    this.teamMemberRequests = [];
    this.activityLog = [];
    this.currentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }
  
  // Método privado para registar atividade
  private logActivity(action: string, entityId: number, entityType: string) {
    this.activityLog.push({
      action,
      timestamp: new Date(),
      entityId,
      entityType
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id, role: 'user' };
    this.users.set(id, user);
    
    // Create empty user profile for the new user
    const userProfile: UserProfile = {
      id,
      userId: id,
      displayName: user.username,
      avatarUrl: '',
      bio: '',
      socialLinks: {},
      createdAt: new Date()
    };
    this.userProfiles.set(id, userProfile);
    
    this.logActivity('create', id, 'user');
    return user;
  }

  // Teams
  async getTeams(): Promise<Team[]> {
    // Apenas equipas aprovadas devem ser visíveis publicamente
    return Array.from(this.teams.values())
      .filter(team => team.status === 'approved')
      .map(({status, rejectionReason, ...team}) => team); // Remover dados internos
  }

  async getTeam(id: number): Promise<Team | undefined> {
    const team = this.teams.get(id);
    if (!team) return undefined;
    
    if (team.status === 'approved') {
      // Remover dados internos para equipas aprovadas
      const {status, rejectionReason, ...publicTeam} = team;
      return publicTeam;
    }
    return undefined;
  }

  async createTeam(teamData: any): Promise<Team> {
    const id = this.currentId++;
    const team: TeamApplication = {
      id,
      name: teamData.name,
      logo: teamData.logo || '',
      ownerId: teamData.ownerId,
      members: teamData.members || [],
      description: teamData.description || '',
      createdAt: new Date(),
      region: teamData.region || 'Portugal',
      tier: teamData.tier || 'Amador',
      status: 'pending'
    };
    this.teams.set(id, team);
    this.logActivity('create', id, 'team');
    
    // Remover dados internos para o retorno
    const {status, rejectionReason, ...publicTeam} = team;
    return publicTeam;
  }
  
  async getPendingTeams(): Promise<Team[]> {
    return Array.from(this.teams.values())
      .filter(team => team.status === 'pending');
  }
  
  async approveTeam(id: number): Promise<Team> {
    const team = this.teams.get(id);
    if (!team) {
      throw new Error('Equipa não encontrada');
    }
    
    team.status = 'approved';
    this.teams.set(id, team);
    this.logActivity('approve', id, 'team');
    
    // Remover dados internos para o retorno
    const {status, rejectionReason, ...publicTeam} = team;
    return publicTeam;
  }
  
  async rejectTeam(id: number, reason: string): Promise<void> {
    const team = this.teams.get(id);
    if (!team) {
      throw new Error('Equipa não encontrada');
    }
    
    team.status = 'rejected';
    team.rejectionReason = reason;
    this.teams.set(id, team);
    this.logActivity('reject', id, 'team');
  }
  
  async getTeamsByOwner(userId: number): Promise<Team[]> {
    return Array.from(this.teams.values())
      .filter(team => team.ownerId === userId)
      .map(({status, rejectionReason, ...team}) => ({
        ...team,
        pendingStatus: status // Incluir status para o dono ver
      })) as Team[];
  }
  
  // Team membership
  async requestToJoinTeam(teamId: number, userId: number): Promise<TeamMemberRequest> {
    const team = this.teams.get(teamId);
    if (!team) {
      throw new Error('Equipa não encontrada');
    }
    
    if (team.status !== 'approved') {
      throw new Error('Equipa não aprovada ainda');
    }
    
    const existingRequest = this.teamMemberRequests.find(
      req => req.teamId === teamId && req.userId === userId
    );
    
    if (existingRequest) {
      throw new Error('Já existe um pedido pendente');
    }
    
    const request: TeamMemberRequest = {
      teamId,
      userId,
      status: 'pending',
      requestedAt: new Date()
    };
    
    this.teamMemberRequests.push(request);
    this.logActivity('request_join', teamId, 'team_member');
    
    return request;
  }
  
  async approveTeamMember(teamId: number, userId: number): Promise<Team> {
    const team = this.teams.get(teamId);
    if (!team) {
      throw new Error('Equipa não encontrada');
    }
    
    const requestIndex = this.teamMemberRequests.findIndex(
      req => req.teamId === teamId && req.userId === userId && req.status === 'pending'
    );
    
    if (requestIndex === -1) {
      throw new Error('Pedido não encontrado');
    }
    
    // Atualizar pedido
    this.teamMemberRequests[requestIndex].status = 'approved';
    
    // Adicionar utilizador à equipa se não for já membro
    if (!team.members.includes(userId)) {
      team.members.push(userId);
      this.teams.set(teamId, team);
    }
    
    this.logActivity('approve_member', teamId, 'team_member');
    
    // Remover dados internos para o retorno
    const {status, rejectionReason, ...publicTeam} = team;
    return publicTeam;
  }

  // Matches
  async getMatches(): Promise<Match[]> {
    return Array.from(this.matches.values());
  }

  async getMatch(id: number): Promise<Match | undefined> {
    return this.matches.get(id);
  }

  // Tournaments
  async getTournaments(): Promise<Tournament[]> {
    return Array.from(this.tournaments.values());
  }

  async getTournament(id: number): Promise<Tournament | undefined> {
    return this.tournaments.get(id);
  }

  // News
  async getNews(): Promise<News[]> {
    return Array.from(this.news.values());
  }

  async getNewsArticle(id: number): Promise<News | undefined> {
    return this.news.get(id);
  }

  // Streamers
  async getStreamers(): Promise<Streamer[]> {
    // Apenas streamers verificados são visíveis publicamente
    return Array.from(this.streamers.values())
      .filter(streamer => streamer.verified)
      .map(({verified, userId, rejectionReason, applicationType, ...streamer}) => streamer);
  }
  
  async createStreamerApplication(streamerData: any): Promise<Streamer> {
    const id = this.currentId++;
    const streamer: StreamerApplication = {
      id,
      name: streamerData.name,
      role: streamerData.role || '',
      social: streamerData.social || {},
      followers: streamerData.followers || '0',
      streams: streamerData.streams || '0',
      type: streamerData.type || 'streamer',
      userId: streamerData.userId,
      verified: false,
      applicationType: streamerData.applicationType || 'streamer'
    };
    
    this.streamers.set(id, streamer);
    this.logActivity('create', id, 'streamer');
    
    // Remover dados internos para o retorno
    const {verified, userId, rejectionReason, applicationType, ...publicStreamer} = streamer;
    return publicStreamer;
  }
  
  async getPendingStreamers(): Promise<Streamer[]> {
    return Array.from(this.streamers.values())
      .filter(streamer => !streamer.verified);
  }
  
  async verifyStreamer(id: number): Promise<Streamer> {
    const streamer = this.streamers.get(id);
    if (!streamer) {
      throw new Error('Streamer não encontrado');
    }
    
    streamer.verified = true;
    this.streamers.set(id, streamer);
    this.logActivity('verify', id, 'streamer');
    
    // Remover dados internos para o retorno
    const {verified, userId, rejectionReason, applicationType, ...publicStreamer} = streamer;
    return publicStreamer;
  }

  // Player profiles
  async getPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
  }
  
  async getPlayerProfile(id: number): Promise<PlayerProfile | undefined> {
    return this.playerProfiles.get(id);
  }

  async createPlayerProfile(playerData: any): Promise<PlayerProfile> {
    const id = this.currentId++;
    const playerProfile: PlayerProfile = {
      id,
      userId: playerData.userId,
      position: playerData.position || '',
      experience: playerData.experience || '',
      availability: playerData.availability || '',
      skills: playerData.skills || [],
      contact: playerData.contact || '',
      createdAt: new Date()
    };
    this.playerProfiles.set(id, playerProfile);
    
    const player: Player = {
      id,
      username: playerData.username || '',
      position: playerData.position || '',
      level: playerData.level || 'Amador',
      userId: playerData.userId
    };
    this.players.set(id, player);
    
    this.logActivity('create', id, 'player');
    return playerProfile;
  }
  
  async updatePlayerProfile(id: number, data: any): Promise<PlayerProfile> {
    const profile = this.playerProfiles.get(id);
    if (!profile) {
      throw new Error('Perfil de jogador não encontrado');
    }
    
    const updatedProfile = {
      ...profile,
      position: data.position || profile.position,
      experience: data.experience || profile.experience,
      availability: data.availability || profile.availability,
      skills: data.skills || profile.skills,
      contact: data.contact || profile.contact,
      updatedAt: new Date()
    };
    
    this.playerProfiles.set(id, updatedProfile);
    
    // Atualizar também o jogador correspondente
    const player = this.players.get(id);
    if (player) {
      this.players.set(id, {
        ...player,
        position: data.position || player.position,
        level: data.level || player.level
      });
    }
    
    this.logActivity('update', id, 'player');
    return updatedProfile;
  }

  // User profiles
  async getUserProfile(userId: number): Promise<UserProfile | undefined> {
    return Array.from(this.userProfiles.values()).find(
      (profile) => profile.userId === userId,
    );
  }

  async updateUserProfile(userId: number, profileData: any): Promise<UserProfile> {
    const existingProfile = await this.getUserProfile(userId);
    
    if (!existingProfile) {
      // Create profile if it doesn't exist
      const id = this.currentId++;
      const newProfile: UserProfile = {
        id,
        userId,
        displayName: profileData.displayName || '',
        avatarUrl: profileData.avatarUrl || '',
        bio: profileData.bio || '',
        socialLinks: profileData.socialLinks || {},
        createdAt: new Date(),
        updatedAt: new Date()
      };
      this.userProfiles.set(id, newProfile);
      this.logActivity('create', id, 'user_profile');
      return newProfile;
    }
    
    // Update existing profile
    const updatedProfile: UserProfile = {
      ...existingProfile,
      displayName: profileData.displayName || existingProfile.displayName,
      avatarUrl: profileData.avatarUrl || existingProfile.avatarUrl,
      bio: profileData.bio || existingProfile.bio,
      socialLinks: profileData.socialLinks || existingProfile.socialLinks,
      updatedAt: new Date()
    };
    
    this.userProfiles.set(existingProfile.id, updatedProfile);
    this.logActivity('update', existingProfile.id, 'user_profile');
    return updatedProfile;
  }
  
  // Admin
  async getAdminStats(): Promise<AdminStats> {
    const pendingTeams = Array.from(this.teams.values()).filter(team => team.status === 'pending').length;
    const pendingStreamers = Array.from(this.streamers.values()).filter(streamer => !streamer.verified).length;
    
    return {
      pendingTeams,
      pendingStreamers,
      totalUsers: this.users.size,
      totalTeams: this.teams.size,
      totalPlayers: this.players.size,
      recentActivity: this.activityLog.slice(-10).reverse() // Últimas 10 atividades, mais recentes primeiro
    };
  }
}

export const storage = new MemStorage();
