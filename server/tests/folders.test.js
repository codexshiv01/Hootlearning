import request from 'supertest';
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { app, prisma } from '../index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hoot_key';
const adminToken = jwt.sign({ id: 'admin123', role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
const userToken = jwt.sign({ id: 'user123', role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

describe('Folders API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 'user123', expiresAt: new Date(Date.now() + 100000) });
    jest.spyOn(prisma.admin, 'findUnique').mockResolvedValue({ id: 'admin123' });
    jest.spyOn(prisma.folder, 'findMany').mockResolvedValue([]);
    jest.spyOn(prisma.folder, 'create').mockResolvedValue({});
    jest.spyOn(prisma.folder, 'delete').mockResolvedValue({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/folders', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/folders');
      expect(res.status).toBe(401);
    });

    it('should return 200 if token is provided', async () => {
      const res = await request(app)
        .get('/api/folders')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/admin/folders', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .post('/api/admin/folders')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'Test', categorySlug: 'test' });
      expect(res.status).toBe(401);
    });

    it('should return 200 and create folder if admin', async () => {
      const res = await request(app)
        .post('/api/admin/folders')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'Test Folder', categorySlug: 'test' });
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /api/admin/folders/:id', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .delete('/api/admin/folders/test')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(401);
    });

    it('should return 200 and delete folder if admin', async () => {
      const res = await request(app)
        .delete('/api/admin/folders/test')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toBe(200);
    });
  });
});
