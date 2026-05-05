import request from 'supertest';
import app from '../app'; // Assurez-vous que le chemin vers votre application est correct


describe('GET /health', () => {
  it('devrait retourner le statut de santé', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('timestamp');
    expect(response.body).toHaveProperty('environment');
    expect(response.body).toHaveProperty('version');
  });
});