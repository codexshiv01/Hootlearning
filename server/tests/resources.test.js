import request from 'supertest';
import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

import { app, prisma } from '../index.js';

const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_hoot_key';
const adminToken = jwt.sign({ id: 'admin123', role: 'admin' }, JWT_SECRET, { expiresIn: '1h' });
const userToken = jwt.sign({ id: 'user123', role: 'user' }, JWT_SECRET, { expiresIn: '1h' });

describe('Resources API Endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 'user123', expiresAt: new Date(Date.now() + 100000) });
    jest.spyOn(prisma.admin, 'findUnique').mockResolvedValue({ id: 'admin123' });
    jest.spyOn(prisma.resource, 'findMany').mockResolvedValue([]);
    jest.spyOn(prisma.resource, 'create').mockResolvedValue({});
    jest.spyOn(prisma.resource, 'delete').mockResolvedValue({});
    jest.spyOn(prisma.resource, 'findUnique').mockResolvedValue({});
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  describe('GET /api/resources', () => {
    it('should return 401 if no token provided', async () => {
      const res = await request(app).get('/api/resources');
      expect(res.status).toBe(401);
    });

    it('should return 200 if token is provided', async () => {
      const res = await request(app)
        .get('/api/resources')
        .set('Authorization', `Bearer ${userToken}`);
      
      expect(res.status).toBe(200);
    });
  });

  describe('POST /api/resources', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .post('/api/resources')
        .set('Authorization', `Bearer ${userToken}`)
        .send({ title: 'Test', category: 'test', actionType: 'download' });
      expect(res.status).toBe(401);
    });
  });

  describe('DELETE /api/resources/:id', () => {
    it('should return 401 if not admin', async () => {
      const res = await request(app)
        .delete('/api/resources/test')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toBe(401);
    });
  });
});
