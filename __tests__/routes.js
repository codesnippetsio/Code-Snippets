const request = require('supertest');
const Users = require('../server/models/userModel');

const server = 'http://localhost:3000';

describe('Snippets route', () => {
  describe('GET', () => {
    //before all test:
    //Create a new user in the db
    //save _id in a variable

    //after all test:
    //delete user

    it('responds with 200 status and json', () => {
      return request(server)
        .get('/snippets/?_id=6463eb52ab99bf89a84a3ebd')
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
    it('responds with data that has keys: title, comments, storedCode, language', () => {
      return request(server)
        .get('/snippets/?_id=6463eb52ab99bf89a84a3ebd')
        .expect((res) => {
          if (!res.body[0].hasOwnProperty('title')) {
            throw new Error("Expected 'title' key!");
          }
          if (!res.body[0].hasOwnProperty('comments')) {
            throw new Error("Expected 'comments' key!");
          }
          if (!res.body[0].hasOwnProperty('language')) {
            throw new Error("Expected 'language' key!");
          }
          if (!res.body[0].hasOwnProperty('storedCode')) {
            throw new Error("Expected 'storedCode' key!");
          }
        });
    });
    it('responds with data that has key, tags, and value of an array', () => {
      return request(server)
        .get('/snippets/?_id=6463eb52ab99bf89a84a3ebd')
        .expect((res) => {
          if (!res.body[0].hasOwnProperty('tags')) {
            throw new Error("Expected 'tags' key!");
          }
          if (!Array.isArray(res.body[0].tags)) {
            throw new Error("Expected 'tags' to be an array!");
          }
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
