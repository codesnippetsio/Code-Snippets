const request = require('supertest');

const server = 'http://localhost:3000';

describe('Snippets route', () => {
  describe('GET', () => {
    xit('responds with 200 status and json', () => {
      return request(server)
        .get('/snippets')
        .expect(200)
        .expect('Content-Type', 'application/json')
        .end((err, res) => {
          if (err) throw err;
        });
    });
    xit('responds with data that has keys: title, comments, storedCode, language', () => {
      return request(server)
        .get('/snippets')
        .expect((res) => {
          if (!res.body.hasOwnProperty('title')) {
            throw new Error("Expected 'title' key!");
          }
          if (!res.body.hasOwnProperty('comments')) {
            throw new Error("Expected 'comments' key!");
          }
          if (!res.body.hasOwnProperty('language')) {
            throw new Error("Expected 'language' key!");
          }
          if (!res.body.hasOwnProperty('storedCode')) {
            throw new Error("Expected 'storedCode' key!");
          }
        })
        .end((err, res) => {
          if (err) throw err;
        });
    });
    xit('responds with data that has key, tags, and value of an array', () => {
      return request(server)
        .get('/snippets')
        .expect((res) => {
          if (!res.body.hasOwnProperty('tags')) {
            throw new Error("Expected 'tags' key!");
          }
          if (!Array.isArray(res.body.tags)) {
            throw new Error("Expected 'tags' to be an array!");
          }
        })
        .end((err, res) => {
          if (err) throw err;
        });
    });
  });
  describe('POST', () => {});
  describe('PUT', () => {});
  describe('DELETE', () => {});
});

describe('Authentication route', () => {
  describe('GET', () => {});
  describe('POST', () => {});
});

describe('Invalid route', () => {
  describe('GET', () => {});
});
