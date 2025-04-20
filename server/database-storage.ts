import { IStorage } from "./storage";
import * as schema from "@shared/schema";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import { Pool } from "@neondatabase/serverless";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PgSessionStore = connectPg(session);

/**
 * Implementação do armazenamento usando banco de dados PostgreSQL com Drizzle ORM
 */
export class DatabaseStorage implements IStorage {
  sessionStore: session.Store;

  constructor() {
    // Inicializando o armazenamento de sessão PostgreSQL
    this.sessionStore = new PgSessionStore({
      pool: db.driver as Pool,
      tableName: 'sessions',
      createTableIfMissing: true
    });
  }

  // Métodos de autenticação e usuários
  async getUser(id: number): Promise<schema.User | undefined> {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.id, id)
    });
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<schema.User | undefined> {
    const user = await db.query.users.findFirst({
      where: eq(schema.users.username, username)
    });
    return user || undefined;
  }

  async createUser(insertUser: schema.InsertUser): Promise<schema.User> {
    const [user] = await db.insert(schema.users)
      .values({
        ...insertUser,
        role: 'user'
      })
      .returning();
    
    // Criar perfil de utilizador automaticamente
    await db.insert(schema.userProfiles)
      .values({
        userId: user.id,
        displayName: user.username,
        bio: '',
        avatarUrl: '',
        socialLinks: {}
      });
      
    return user;
  }

  // Métodos de equipas
  async getTeams(): Promise<schema.Team[]> {
    const teams = await db.query.teams.findMany({
      where: eq(schema.teams.status, 'approved'),
      orderBy: desc(schema.teams.createdAt)
    });
    return teams;
  }

  async getTeam(id: number): Promise<schema.Team | undefined> {
    return await db.query.teams.findFirst({
      where: eq(schema.teams.id, id)
    });
  }

  async createTeam(team: schema.InsertTeam): Promise<schema.Team> {
    const [createdTeam] = await db.insert(schema.teams)
      .values({
        ...team,
        status: 'pending'
      })
      .returning();
    
    // Criar notificação para admin
    await this.createAdminNotification('Nova Equipa Pendente', 
      `A equipa "${team.name}" está aguardando aprovação.`, 
      'team_pending', 
      createdTeam.id);
    
    return createdTeam;
  }

  async getPendingTeams(): Promise<schema.Team[]> {
    return await db.query.teams.findMany({
      where: eq(schema.teams.status, 'pending'),
      orderBy: desc(schema.teams.createdAt)
    });
  }

  async approveTeam(id: number): Promise<schema.Team> {
    const [team] = await db.update(schema.teams)
      .set({ status: 'approved' })
      .where(eq(schema.teams.id, id))
      .returning();
    
    // Criar notificação para o dono da equipa
    await this.createUserNotification(
      team.ownerId,
      'Equipa Aprovada',
      `A tua equipa "${team.name}" foi aprovada.`,
      'team_approved',
      team.id
    );
    
    return team;
  }

  async rejectTeam(id: number, reason: string): Promise<void> {
    const [team] = await db.update(schema.teams)
      .set({ 
        status: 'rejected',
        rejectionReason: reason
      })
      .where(eq(schema.teams.id, id))
      .returning();
    
    // Criar notificação para o dono da equipa
    await this.createUserNotification(
      team.ownerId,
      'Equipa Rejeitada',
      `A tua equipa "${team.name}" foi rejeitada. Motivo: ${reason}`,
      'team_rejected',
      team.id
    );
  }

  async getTeamsByOwner(userId: number): Promise<schema.Team[]> {
    return await db.query.teams.findMany({
      where: eq(schema.teams.ownerId, userId),
      orderBy: desc(schema.teams.createdAt)
    });
  }

  // Métodos de entrada em equipas
  async requestToJoinTeam(teamId: number, userId: number): Promise<any> {
    // Esta teria que ser uma tabela adicional de requisições
    // Para simplificar, vamos apenas retornar um objeto mockado
    
    // Criar notificação para o dono da equipa
    const team = await this.getTeam(teamId);
    if (team) {
      await this.createUserNotification(
        team.ownerId,
        'Novo Pedido de Equipa',
        `Um jogador pediu para entrar na tua equipa "${team.name}".`,
        'team_join_request',
        teamId
      );
    }
    
    return {
      teamId,
      userId,
      status: 'pending',
      requestedAt: new Date()
    };
  }

  async approveTeamMember(teamId: number, userId: number): Promise<schema.Team> {
    const team = await this.getTeam(teamId);
    if (!team) throw new Error("Equipa não encontrada");
    
    const members = team.members || [];
    if (!members.includes(userId)) {
      const [updatedTeam] = await db.update(schema.teams)
        .set({ 
          members: [...members, userId]
        })
        .where(eq(schema.teams.id, teamId))
        .returning();
      
      // Criar notificação para o jogador
      await this.createUserNotification(
        userId,
        'Pedido Aceito',
        `Foste aceito na equipa "${team.name}".`,
        'team_join_approved',
        teamId
      );
      
      return updatedTeam;
    }
    
    return team;
  }

  // Métodos de jogos e partidas
  async getMatches(): Promise<any[]> {
    // Por implementar - retornaria dados da tabela de partidas
    return [];
  }

  async getMatch(id: number): Promise<any | undefined> {
    // Por implementar
    return undefined;
  }

  // Métodos de torneios
  async getTournaments(): Promise<any[]> {
    // Por implementar - retornaria dados da tabela de torneios
    return [];
  }

  async getTournament(id: number): Promise<any | undefined> {
    // Por implementar
    return undefined;
  }

  // Métodos de notícias
  async getNews(): Promise<any[]> {
    // Por implementar - retornaria dados da tabela de notícias
    return [];
  }

  async getNewsArticle(id: number): Promise<any | undefined> {
    // Por implementar
    return undefined;
  }

  // Métodos de streamers
  async getStreamers(): Promise<schema.Streamer[]> {
    return await db.query.streamers.findMany({
      where: eq(schema.streamers.verified, true),
      orderBy: desc(schema.streamers.createdAt)
    });
  }

  async createStreamerApplication(streamer: schema.InsertStreamer): Promise<schema.Streamer> {
    const [createdStreamer] = await db.insert(schema.streamers)
      .values({
        ...streamer,
        verified: false
      })
      .returning();
    
    // Criar notificação para admin
    await this.createAdminNotification(
      'Novo Streamer Pendente', 
      `${createdStreamer.name} candidatou-se como ${createdStreamer.type || 'streamer'}.`, 
      'streamer_pending', 
      createdStreamer.id
    );
    
    return createdStreamer;
  }

  async getPendingStreamers(): Promise<schema.Streamer[]> {
    return await db.query.streamers.findMany({
      where: and(
        eq(schema.streamers.verified, false),
        eq(schema.streamers.rejectionReason, null)
      ),
      orderBy: desc(schema.streamers.createdAt)
    });
  }

  async verifyStreamer(id: number): Promise<schema.Streamer> {
    const [streamer] = await db.update(schema.streamers)
      .set({ verified: true })
      .where(eq(schema.streamers.id, id))
      .returning();
    
    // Criar notificação para o streamer
    if (streamer.userId) {
      await this.createUserNotification(
        streamer.userId,
        'Perfil de Streamer Verificado',
        `O teu perfil de streamer "${streamer.name}" foi verificado.`,
        'streamer_verified',
        streamer.id
      );
    }
    
    return streamer;
  }

  // Métodos de perfis de jogador
  async getPlayers(): Promise<any[]> {
    // Por implementar
    return [];
  }

  async createPlayerProfile(player: schema.InsertPlayerProfile): Promise<schema.PlayerProfile> {
    const [profile] = await db.insert(schema.playerProfiles)
      .values(player)
      .returning();
    
    return profile;
  }

  async getPlayerProfile(id: number): Promise<schema.PlayerProfile | undefined> {
    return await db.query.playerProfiles.findFirst({
      where: eq(schema.playerProfiles.id, id)
    });
  }

  async updatePlayerProfile(id: number, data: Partial<schema.PlayerProfile>): Promise<schema.PlayerProfile> {
    const [profile] = await db.update(schema.playerProfiles)
      .set(data)
      .where(eq(schema.playerProfiles.id, id))
      .returning();
    
    return profile;
  }

  // Métodos de perfis de utilizador
  async getUserProfile(userId: number): Promise<schema.UserProfile | undefined> {
    return await db.query.userProfiles.findFirst({
      where: eq(schema.userProfiles.userId, userId)
    });
  }

  async updateUserProfile(userId: number, profile: Partial<schema.UserProfile>): Promise<schema.UserProfile> {
    // Verificar se o perfil já existe
    const existingProfile = await this.getUserProfile(userId);
    
    if (existingProfile) {
      // Atualizar perfil existente
      const [updatedProfile] = await db.update(schema.userProfiles)
        .set({
          ...profile,
          updatedAt: new Date()
        })
        .where(eq(schema.userProfiles.userId, userId))
        .returning();
      
      return updatedProfile;
    } else {
      // Criar novo perfil
      const [newProfile] = await db.insert(schema.userProfiles)
        .values({
          userId,
          displayName: profile.displayName || '',
          avatarUrl: profile.avatarUrl || '',
          bio: profile.bio || '',
          socialLinks: profile.socialLinks || {}
        })
        .returning();
      
      return newProfile;
    }
  }
  
  // Métodos de notificações
  async getUserNotifications(userId: number): Promise<schema.Notification[]> {
    return await db.query.notifications.findMany({
      where: eq(schema.notifications.userId, userId),
      orderBy: desc(schema.notifications.createdAt)
    });
  }
  
  async markNotificationAsRead(id: number): Promise<void> {
    await db.update(schema.notifications)
      .set({ read: true })
      .where(eq(schema.notifications.id, id));
  }
  
  async createUserNotification(
    userId: number,
    title: string,
    message: string,
    type: string,
    relatedId?: number
  ): Promise<schema.Notification> {
    const [notification] = await db.insert(schema.notifications)
      .values({
        userId,
        title,
        message,
        type,
        relatedId: relatedId || null,
        read: false
      })
      .returning();
    
    return notification;
  }
  
  async createAdminNotification(
    title: string,
    message: string,
    type: string,
    relatedId?: number
  ): Promise<void> {
    // Buscar todos os administradores
    const admins = await db.query.users.findMany({
      where: eq(schema.users.role, 'admin')
    });
    
    // Criar uma notificação para cada admin
    for (const admin of admins) {
      await this.createUserNotification(
        admin.id,
        title,
        message,
        type,
        relatedId
      );
    }
  }

  // Métodos de administração
  async getAdminStats(): Promise<any> {
    const pendingTeams = await db.query.teams.findMany({
      where: eq(schema.teams.status, 'pending')
    });
    
    const pendingStreamers = await db.query.streamers.findMany({
      where: and(
        eq(schema.streamers.verified, false),
        eq(schema.streamers.rejectionReason, null)
      )
    });
    
    const totalUsers = await db.select({ count: count() }).from(schema.users);
    const totalTeams = await db.select({ count: count() }).from(schema.teams);
    const totalPlayers = await db.select({ count: count() }).from(schema.playerProfiles);
    
    // Pegar as ações administrativas recentes
    const recentActions = await db.query.adminActions.findMany({
      orderBy: desc(schema.adminActions.createdAt),
      limit: 10
    });
    
    return {
      pendingTeams: pendingTeams.length,
      pendingStreamers: pendingStreamers.length,
      totalUsers: totalUsers[0]?.count || 0,
      totalTeams: totalTeams[0]?.count || 0,
      totalPlayers: totalPlayers[0]?.count || 0,
      recentActivity: recentActions
    };
  }
  
  // Registrar ação de administrador
  async logAdminAction(
    adminId: number,
    action: string,
    entityId: number,
    entityType: string,
    reason?: string
  ): Promise<void> {
    await db.insert(schema.adminActions)
      .values({
        adminId,
        action,
        entityId,
        entityType,
        reason
      });
  }
}

// Função auxiliar para contagem
function count() {
  return sql`count(*)`;
}

// Importar sql para uso na função count
import { sql } from "drizzle-orm";