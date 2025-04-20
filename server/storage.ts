import { users, type User, type InsertUser, type Team, type Match, type Tournament, type News, type Player, type PlayerProfile, type Streamer, type UserProfile } from "@shared/schema";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import createMemoryStore from "memorystore";
import session from "express-session";

const scryptAsync = promisify(scrypt);

const MemoryStore = createMemoryStore(session);

export interface IStorage {
  // User authentication
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Teams
  getTeams(): Promise<Team[]>;
  getTeam(id: number): Promise<Team | undefined>;
  createTeam(team: any): Promise<Team>;
  
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
  
  // Player profiles
  getPlayers(): Promise<Player[]>;
  createPlayerProfile(player: any): Promise<PlayerProfile>;
  
  // User profiles
  getUserProfile(userId: number): Promise<UserProfile | undefined>;
  updateUserProfile(userId: number, profile: any): Promise<UserProfile>;
  
  // Session store
  sessionStore: session.SessionStore;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private teams: Map<number, Team>;
  private matches: Map<number, Match>;
  private tournaments: Map<number, Tournament>;
  private news: Map<number, News>;
  private streamers: Map<number, Streamer>;
  private players: Map<number, Player>;
  private playerProfiles: Map<number, PlayerProfile>;
  private userProfiles: Map<number, UserProfile>;
  
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
    this.currentId = 1;
    
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
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
    
    return user;
  }

  // Teams
  async getTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  async getTeam(id: number): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async createTeam(teamData: any): Promise<Team> {
    const id = this.currentId++;
    const team: Team = {
      id,
      name: teamData.name,
      logo: teamData.logo || '',
      ownerId: teamData.ownerId,
      members: teamData.members || [],
      description: teamData.description || '',
      createdAt: new Date(),
      region: teamData.region || 'Portugal',
      tier: teamData.tier || 'Amador'
    };
    this.teams.set(id, team);
    return team;
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
    return Array.from(this.streamers.values());
  }

  // Player profiles
  async getPlayers(): Promise<Player[]> {
    return Array.from(this.players.values());
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
    
    return playerProfile;
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
    return updatedProfile;
  }
}

export const storage = new MemStorage();
