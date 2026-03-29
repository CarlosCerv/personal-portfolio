// FILE: tests/helpers.test.js
// Pure unit tests for exported helper functions (no HTTP, no MongoDB)

const { getHobbyData, getAllHobbies } = require('../app');

// ─── getHobbyData ─────────────────────────────────────────────────────────────

describe('getHobbyData()', () => {
  test('returns a valid object for "photography"', () => {
    const hobby = getHobbyData('photography');
    expect(hobby).not.toBeNull();
    expect(hobby.slug).toBe('photography');
    expect(hobby.title).toBe('Fotografía');
    expect(hobby.icon).toBe('fas fa-camera');
    expect(Array.isArray(hobby.highlights)).toBe(true);
    expect(hobby.highlights.length).toBeGreaterThan(0);
  });

  test('returns a valid object for "gym"', () => {
    const hobby = getHobbyData('gym');
    expect(hobby).not.toBeNull();
    expect(hobby.slug).toBe('gym');
    expect(hobby.title).toBe('Gym & Fitness');
  });

  test('returns a valid object for "cooking"', () => {
    const hobby = getHobbyData('cooking');
    expect(hobby).not.toBeNull();
    expect(hobby.slug).toBe('cooking');
  });

  test('returns a valid object for "reading"', () => {
    const hobby = getHobbyData('reading');
    expect(hobby).not.toBeNull();
    expect(hobby.slug).toBe('reading');
  });

  test('returns a valid object for "music"', () => {
    const hobby = getHobbyData('music');
    expect(hobby).not.toBeNull();
    expect(hobby.slug).toBe('music');
  });

  test('returns a valid object for "travel"', () => {
    const hobby = getHobbyData('travel');
    expect(hobby).not.toBeNull();
    expect(hobby.slug).toBe('travel');
  });

  test('returns null for an unknown slug', () => {
    expect(getHobbyData('unknown-hobby')).toBeNull();
  });

  test('returns null for empty string', () => {
    expect(getHobbyData('')).toBeNull();
  });

  test('each hobby has required shape: slug, title, icon, description, highlights, goals', () => {
    const requiredFields = ['slug', 'title', 'icon', 'description', 'highlights', 'goals', 'started', 'frequency', 'level'];
    const slugs = ['photography', 'gym', 'cooking', 'reading', 'music', 'travel'];

    slugs.forEach((slug) => {
      const hobby = getHobbyData(slug);
      requiredFields.forEach((field) => {
        expect(hobby).toHaveProperty(field);
      });
    });
  });
});

// ─── getAllHobbies ────────────────────────────────────────────────────────────

describe('getAllHobbies()', () => {
  test('returns an array of exactly 6 hobbies', () => {
    const hobbies = getAllHobbies();
    expect(Array.isArray(hobbies)).toBe(true);
    expect(hobbies).toHaveLength(6);
  });

  test('each item has slug, title, and icon', () => {
    const hobbies = getAllHobbies();
    hobbies.forEach((h) => {
      expect(h).toHaveProperty('slug');
      expect(h).toHaveProperty('title');
      expect(h).toHaveProperty('icon');
      expect(typeof h.slug).toBe('string');
      expect(typeof h.title).toBe('string');
      expect(typeof h.icon).toBe('string');
    });
  });

  test('slugs are unique', () => {
    const hobbies = getAllHobbies();
    const slugs = hobbies.map((h) => h.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  test('includes all expected hobby slugs', () => {
    const hobbies = getAllHobbies();
    const slugs = hobbies.map((h) => h.slug);
    expect(slugs).toContain('photography');
    expect(slugs).toContain('gym');
    expect(slugs).toContain('cooking');
    expect(slugs).toContain('reading');
    expect(slugs).toContain('music');
    expect(slugs).toContain('travel');
  });
});
