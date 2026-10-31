import assert from 'node:assert/strict';
import test from 'node:test';
import { formatBookmark, normalizeUrl, parseStoredBookmarks } from '../src/lib/bookmarks.ts';

test('normalizes URLs with and without https://', () => {
  assert.equal(normalizeUrl('https://example.com/path'), 'https://example.com/path');
  assert.equal(normalizeUrl('example.com/path'), 'https://example.com/path');
  assert.equal(normalizeUrl('localhost:4321'), 'https://localhost:4321/');
  assert.equal(normalizeUrl(' http://example.com '), 'http://example.com/');
  assert.equal(normalizeUrl('javascript:alert(1)'), null);
  assert.equal(normalizeUrl('not a valid URL'), null);
});

test('recovers safely from empty, corrupted, legacy, and non-array storage', () => {
  assert.deepEqual(parseStoredBookmarks(null), []);
  assert.deepEqual(parseStoredBookmarks(''), []);
  assert.deepEqual(parseStoredBookmarks('{broken'), []);
  assert.deepEqual(parseStoredBookmarks('{"url":"https://legacy.example"}'), []);
  assert.deepEqual(parseStoredBookmarks('"legacy-value"'), []);
  assert.deepEqual(parseStoredBookmarks('["https://legacy.example"]'), []);
});

test('keeps only valid records and rejects malformed or duplicate slugs', () => {
  const valid = { url: 'https://example.com', slug: 'mona-Ab12xY09' };
  const stored = JSON.stringify([
    valid,
    { ...valid },
    { url: 'javascript:alert(1)', slug: 'mona-12345678' },
    { url: 'https://example.com', slug: 'bad-slug' },
    { url: 42, slug: 'mona-12345678' },
    { ...valid, extra: true },
    null,
  ]);
  assert.deepEqual(parseStoredBookmarks(stored), [valid]);
});

test('formats a bookmark with the exact delimiter', () => {
  assert.equal(
    formatBookmark('https://example.com', 'mona-Ab12xY09'),
    'https://example.com :: mona-Ab12xY09',
  );
});
