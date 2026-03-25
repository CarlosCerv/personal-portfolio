// FILE: tests/routes.test.js
// Integration tests for all Express routes using supertest and mongodb-memory-server

const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongod;
let app;

beforeAll(async () => {
  // Start in-memory MongoDB
  mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();

  // Set env before requiring app so mongoose connects to test DB
  process.env.MONGODB_URI = uri;
  process.env.NODE_ENV = 'test';

  // Import app after setting env
  app = require('../app');

  // Manually connect for tests since app.js bypasses it in test mode
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongod.stop();
});

// ─── Static Assets ────────────────────────────────────────────────────────────

describe('Static Assets', () => {
  test('GET /favicon.ico → 200 image/x-icon', async () => {
    const res = await request(app).get('/favicon.ico');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/image\/x-icon/);
  });

  test('GET /images/favicon.svg → 200 svg', async () => {
    const res = await request(app).get('/images/favicon.svg');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/svg/);
  });
});

// ─── Public Pages ─────────────────────────────────────────────────────────────

describe('Public Pages', () => {
  test('GET / → 200 HTML', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
    expect(res.text).toContain('Carlos');
  });

  test('GET /blog → 200 HTML', async () => {
    const res = await request(app).get('/blog');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('GET /projects → 200 HTML', async () => {
    const res = await request(app).get('/projects');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('GET /podcast → 200 HTML', async () => {
    const res = await request(app).get('/podcast');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });

  test('GET /hobbies → 200 HTML', async () => {
    const res = await request(app).get('/hobbies');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});

// ─── Hobby Detail Pages ────────────────────────────────────────────────────────

describe('Hobby Detail Pages', () => {
  const validHobbies = ['photography', 'gym', 'cooking', 'reading', 'music', 'travel'];

  validHobbies.forEach((slug) => {
    test(`GET /hobbies/${slug} → 200 HTML`, async () => {
      const res = await request(app).get(`/hobbies/${slug}`);
      expect(res.status).toBe(200);
      expect(res.headers['content-type']).toMatch(/html/);
    });
  });

  test('GET /hobbies/nonexistent → 404', async () => {
    const res = await request(app).get('/hobbies/nonexistent');
    expect(res.status).toBe(404);
  });
});

// ─── Blog Post Routes ─────────────────────────────────────────────────────────

describe('Blog Post Routes', () => {
  test('GET /blog/nonexistent-post → 404', async () => {
    const res = await request(app).get('/blog/nonexistent-post-slug');
    expect(res.status).toBe(404);
  });
});

// ─── Admin Routes ─────────────────────────────────────────────────────────────

describe('Admin Routes', () => {
  test('GET /admin → 200 login page', async () => {
    const res = await request(app).get('/admin');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Admin');
  });

  test('POST /admin with wrong password → shows error', async () => {
    const res = await request(app)
      .post('/admin')
      .send('password=wrongpassword')
      .set('Content-Type', 'application/x-www-form-urlencoded');
    expect(res.status).toBe(200);
    expect(res.text).toContain('Invalid');
  });

  test('GET /admin/posts without password → redirects to /admin', async () => {
    const res = await request(app).get('/admin/posts');
    expect(res.status).toBe(302);
    expect(res.headers.location).toBe('/admin');
  });
});

// ─── 404 Catch-all ────────────────────────────────────────────────────────────

describe('404 Handler', () => {
  test('GET /nonexistent-route → 404 HTML', async () => {
    const res = await request(app).get('/this-page-does-not-exist');
    expect(res.status).toBe(404);
    expect(res.headers['content-type']).toMatch(/html/);
  });
});
