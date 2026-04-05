import request from 'supertest';
import app from '../app';
import { AppDataSource } from '../config/data-source';
import { User, UserRole } from '../entities/User';
import bcrypt from 'bcrypt';

describe('Auth Routes', () => {
  
  const testUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'Password123'
  };

  describe('POST /api/auth/register', () => {
    it('should register a new user successfully', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user).toHaveProperty('id');
      expect(res.body.data.user.email).toBe(testUser.email);
      expect(res.body.data.tokens).toHaveProperty('accessToken');
      expect(res.body.data.tokens).toHaveProperty('refreshToken');

      // Verify in DB
      const userCount = await AppDataSource.getRepository(User).count();
      expect(userCount).toBe(1);
    });

    it('should reject registration if payload is invalid', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'not-an-email',
          password: 'pass'
        });

      expect(res.status).toBe(422);
      expect(res.body.success).toBe(false);
    });

    it('should prevent registering as Admin', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({
          ...testUser,
          role: 'Admin'
        });
      
      expect(res.status).toBe(422); // Because of auth validator filtering
      expect(res.body.errors[0].msg).toBe('Invalid role.');
    });
  });

  describe('POST /api/auth/login', () => {
    
    beforeEach(async () => {
      // Create user directly
      const repo = AppDataSource.getRepository(User);
      const user = repo.create({
        ...testUser,
        role: UserRole.Student,
      });
      await repo.save(user);
    });

    it('should login successfully with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: testUser.password
        });
        
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.tokens).toHaveProperty('accessToken');
    });

    it('should reject login with wrong password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: testUser.email,
          password: 'WrongPassword1'
        });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });
  });

  describe('POST /api/auth/refresh', () => {
    let oldRefreshToken: string;

    beforeEach(async () => {
      const res = await request(app).post('/api/auth/register').send(testUser);
      oldRefreshToken = res.body.data.tokens.refreshToken;
    });

    it('should refresh tokens and invalidate the old one', async () => {
      const res = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: oldRefreshToken });

      if (res.status === 401) {
        console.log("401 ERROR BODY:", res.body);
      }

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.accessToken).toBeDefined();

      const newRefreshToken = res.body.data.refreshToken;
      expect(newRefreshToken).not.toBe(oldRefreshToken);

      // Try using old one again (should fail)
      const res2 = await request(app)
        .post('/api/auth/refresh')
        .send({ refreshToken: oldRefreshToken });
      
      expect(res2.status).toBe(401);
    });
  });
});
