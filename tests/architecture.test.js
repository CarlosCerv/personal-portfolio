const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');

describe('current project architecture', () => {
  test('keeps the active Next.js app structure', () => {
    expect(fs.existsSync(path.join(root, 'app', 'layout.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'app', '(public)', 'layout.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'components', 'Header.tsx'))).toBe(true);
    expect(fs.existsSync(path.join(root, 'components', 'Footer.tsx'))).toBe(true);
  });

  test('keeps only the active runtime folders', () => {
    expect(fs.existsSync(path.join(root, 'views'))).toBe(false);
    expect(fs.existsSync(path.join(root, 'public', 'css'))).toBe(false);
    expect(fs.existsSync(path.join(root, 'public', 'js'))).toBe(false);
  });

  test('documents the current stack in README', () => {
    const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');
    expect(readme).toContain('Next.js 16');
    expect(readme).toContain('Tailwind CSS');
  });
});
