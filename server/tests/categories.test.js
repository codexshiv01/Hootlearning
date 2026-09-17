import request from 'supertest';
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { app, prisma } from '../index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hoot_key';
const adminToken = jwt.sign({ id: 'admin123', role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
const userToken = jwt.sign({ id: 'user123', role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

describe('Categories API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 'user123', expiresAt: new Date(Date.now() + 100000) });
    jest.spyOn(prisma.admin, 'findUnique').mockResolvedValue({ id: 'admin123' });
    jest.spyOn(prisma.category, 'findMany').mockResolvedValue([]);
    jest.spyOn(prisma.category, 'create').mockResolvedValue({});
    jest.spyOn(prisma.category, 'delete').mockResolvedValue({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/categories', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/categories');
      expect(res.status).toBe(401);
    });

    it('should return 200 and categories if token is provided', async () => {
      const res = await request(app)
        .get('/api/categories')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/admin/categories', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .post('/api/admin/categories')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Test Category', allowDownload: true });
      expect(res.status).toBe(401);
    });

    it('should return 200 and create category if admin', async () => {
      const res = await request(app)
        .post('/api/admin/categories')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test Category', allowDownload: true });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/admin/categories/:id', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .delete('/api/admin/categories/test')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(401);
    });

    it('should return 200 and delete category if admin', async () => {
      const res = await request(app)
        .delete('/api/admin/categories/test')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });
});
