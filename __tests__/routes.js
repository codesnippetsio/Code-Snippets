const request = require('supertest');
const mongoose = require('mongoose');
const Users = require('../server/models/userModel');
const Snippets = require('../server/models/snippetModel');

require('dotenv').config();

const server = 'http://localhost:3000';
const mongoURI = process.env.MONGO_URI;

describe('Snippets route', () => {
  let user_id;
  let snippet_id;
  const username = '__DummyData__';
  const password = 'codesmith';

  describe('GET', () => {
    //before all GET test:
    const snippet = {
      title: 'FAKE DATA',
      comments: 'FUN COMMENTS!',
      storedCode: 'cry()',
      tags: [1, 2, 3],
      language: 'Klingon',
    };
    beforeAll(async () => {
      await mongoose.connect(mongoURI);

      const user = await Users.create({ username, password });
      user_id = user._id;

      const fakeSnippet = await Snippets.create(snippet);
      snippet_id = fakeSnippet._id;
      user.snippets.push(fakeSnippet._id);
      return user.save();
    });

    afterAll(async () => {
      await Users.findByIdAndDelete(user_id);
      await Snippets.findByIdAndDelete(snippet_id);

      return await mongoose.connection.close();
    });
    xit('responds with 200 status and json', () => {
      return request(server)
        .get(`/snippets/?_id=${user_id}`)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
    xit('responds with data that has keys: title, comments, storedCode, language', () => {
      return request(server)
        .get(`/snippets/?_id=${user_id}`)
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
    xit('responds with data that has key, tags, and value of an array', () => {
      return request(server)
        .get(`/snippets/?_id=${user_id}`)
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
