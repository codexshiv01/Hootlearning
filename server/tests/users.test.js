import request from 'supertest';
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { app, prisma } from '../index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hoot_key';
const adminToken = jwt.sign({ id: 'admin123', role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
const userToken = jwt.sign({ id: 'user123', role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

describe('Users API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 'user123', expiresAt: new Date(Date.now() + 100000) });
    jest.spyOn(prisma.admin, 'findUnique').mockResolvedValue({ id: 'admin123' });
    jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);
    jest.spyOn(prisma.user, 'create').mockResolvedValue({});
    jest.spyOn(prisma.user, 'delete').mockResolvedValue({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('POST /api/admin/users', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .post('/api/admin/users')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ email: 'test@test.com', password: 'pass', expiryMonths: '1' });
      expect(res.status).toBe(401);
    });
  });

  describe('DELETE /api/admin/users/:id', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .delete('/api/admin/users/test')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(401);
    });

    it('should return 200 and delete user if admin', async () => {
      const res = await request(app)
        .delete('/api/admin/users/test')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });
});
