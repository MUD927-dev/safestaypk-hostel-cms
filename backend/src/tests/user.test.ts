import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';

describe('User Routes', () => {
  let studentToken: string;
  let adminToken: string;
  let otherUserId: string;

  beforeEach(async () => {
    // 1. Create a Student User & Login
    let res = await request(app).post('/api/auth/register').send({
      firstName: 'Student',
      lastName: 'User',
      email: 'student@example.com',
      password: 'Password123'
    });
    studentToken = res.body.data.tokens.accessToken;
    otherUserId = res.body.data.user.id;

    // 2. Create an Admin programmatically & Login
    const repo = AppDataSource.getRepository(User);
    const adminUser = repo.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@example.com',
      password: 'Password123',
      role: UserRole.Admin,
    });
    await repo.save(adminUser);

    res = await request(app).post('/api/auth/login').send({
      email: 'admin@example.com',
      password: 'Password123'
    });
    adminToken = res.body.data.tokens.accessToken;
  });

  describe('GET /api/users/me', () => {
    it('should return own profile', async () => {
      const res = await request(app)
        .get('/api/users/me')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.email).toBe('student@example.com');
    });

    it('should return 401 unauthenticated', async () => {
      const res = await request(app).get('/api/users/me');
      expect(res.status).toBe(401);
    });
  });

  describe('PATCH /api/users/:id/role', () => {
    it('should execute successfully for Admin modifying roles', async () => {
      const res = await request(app)
        .patch(`/api/users/${otherUserId}/role`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ role: 'HostelOwner' });

      expect(res.status).toBe(200);
      expect(res.body.data.role).toBe('HostelOwner');
    });

    it('should be forbidden for non-admin to update roles', async () => {
      const res = await request(app)
        .patch(`/api/users/${otherUserId}/role`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ role: 'Admin' });

      expect(res.status).toBe(403);
    });
  });

  describe('GET /api/users', () => {
    it('should be accessible by Admin', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should reject access for student', async () => {
      const res = await request(app)
        .get('/api/users')
        .set('Authorization', `Bearer ${studentToken}`);

      expect(res.status).toBe(403);
    });
  });
});
