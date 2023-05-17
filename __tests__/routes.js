const request = require('supertest');
const mongoose = require('mongoose');
const Users = require('../server/models/userModel');
const Snippets = require('../server/models/snippetModel');

require('dotenv').config();

const server = 'http://localhost:3000';
const mongoURI = process.env.MONGO_URI;

xdescribe('Snippets route', () => {
  let user;
  let snippet_id;
  const username = '__DummyData__';
  const password = 'codesmith';
  const snippet = {
    title: 'FAKE DATA',
    comments: 'FUN COMMENTS!',
    storedCode: 'cry()',
    tags: ['1', '2', '3'],
    language: 'Klingon',
  };
  describe('GET', () => {
    //before all GET test:
    beforeAll(async () => {
      console.log('Connecting to the database!');
      await mongoose.connect(mongoURI);

      console.log('Creating dummy data!');
      user = await Users.create({ username, password });

      const fakeSnippet = await Snippets.create(snippet);
      snippet_id = fakeSnippet._id;
      user.snippets.push(fakeSnippet._id);
      return user.save();
    });

    afterAll(async () => {
      console.log('Deleting dummy data!');
      await Users.findByIdAndDelete(user._id);
      await Snippets.findByIdAndDelete(snippet_id);

      console.log('Disconnecting from the database!');
      return await mongoose.connection.close();
    });
    it('responds with 200 status and json', () => {
      return request(server)
        .get(`/snippets/?_id=${user._id}`)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
    it('responds with data that has keys: title, comments, storedCode, language', () => {
      return request(server)
        .get(`/snippets/?_id=${user._id}`)
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
        .get(`/snippets/?_id=${user._id}`)
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
  describe('POST', () => {
    beforeAll(async () => {
      console.log('Connecting to the database!');
      await mongoose.connect(mongoURI);

      console.log('Creating dummy data!');
      user = await Users.create({ username, password });

      return user.save();
    });
    afterAll(async () => {
      console.log('Deleting dummy data!');

      await Users.findByIdAndDelete(user._id);

      console.log('Disconnecting from the database!');
      return await mongoose.connection.close();
    });
    afterEach(async () => {
      user = await Users.findById(user._id);
      snippet_id = user.snippets.pop();
      await user.save();
      return await Snippets.findByIdAndDelete(snippet_id);
    });
    it('responds with 200 status and json', () => {
      return request(server)
        .post('/snippets')
        .send({ ...snippet, userId: user._id })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
    it('responds with the newly created document', () => {
      return request(server)
        .post('/snippets')
        .send({ ...snippet, userId: user._id })
        .expect((res) => {
          expect(res.body.title).toBe(snippet.title);
          expect(res.body.comments).toBe(snippet.comments);
          expect(res.body.storedCode).toBe(snippet.storedCode);
          expect(res.body.language).toBe(snippet.language);
          expect(res.body.tags).toEqual(snippet.tags);
        });
    });
    it("pushes newly created document to user's snippets array", () => {
      return request(server)
        .post('/snippets')
        .send({ ...snippet, userId: user._id })
        .expect(async (res) => {
          user = await Users.findById(user._id);
          expect(user.snippets.length).toEqual(1);
        });
    });
  });
  describe('PUT', () => {});
  describe('DELETE', () => {
    beforeAll(async () => {
      console.log('Connecting to the database!');
      await mongoose.connect(mongoURI);

      console.log('Creating dummy data!');
      return (user = await Users.create({ username, password }));
    });
    beforeEach(async () => {
      const fakeSnippet = await Snippets.create(snippet);
      snippet_id = fakeSnippet._id;
      user.snippets.push(fakeSnippet._id);
      return user.save();
    });
    afterAll(async () => {
      console.log('Deleting dummy data!');
      await Users.findByIdAndDelete(user._id);

      console.log('Disconnecting from the database!');
      return await mongoose.connection.close();
    });
    it('responds with 200 status and json', () => {
      return request(server)
        .delete(`/snippets/?userId=${user._id}&snippetId=${snippet_id}`)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
    it('responds with the deleted document', () => {
      return request(server)
        .delete(`/snippets/?userId=${user._id}&snippetId=${snippet_id}`)
        .expect((res) => {
          expect(res.body.title).toBe(snippet.title);
          expect(res.body.comments).toBe(snippet.comments);
          expect(res.body.storedCode).toBe(snippet.storedCode);
          expect(res.body.language).toBe(snippet.language);
          expect(res.body.tags).toEqual(snippet.tags);
        });
    });
    it("removes delete document from user's snippets array", () => {
      return request(server)
        .delete(`/snippets/?userId=${user._id}&snippetId=${snippet_id}`)
        .expect(async () => {
          user = await Users.findById(user._id);
          expect(user.snippets.length).toEqual(0);
        });
    });
  });
});

describe('Authentication route', () => {
  let user;
  const username = '__DummyData__';
  const password = 'codesmith';
  const languages = ['klingon'];
  const tags = ['1', '2', '3'];
  describe('GET', () => {
    beforeAll(async () => {
      console.log('Connecting to the database!');
      await mongoose.connect(mongoURI);

      console.log('Creating dummy data!');
      return (user = await Users.create({
        username,
        password,
        languages,
        tags,
      }));
    });
    afterAll(async () => {
      console.log('Deleting dummy data!');
      await Users.findByIdAndDelete(user._id);

      console.log('Disconnecting from database!');
      return await mongoose.connection.close();
    });
    xit('responds with 200 status and json', () => {
      return request(server)
        .get(`/authentication/?_id=${user._id}`)
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8');
    });
    xit('responds with the correct user data', () => {
      return request(server)
        .get(`/authentication/?_id=${user._id}`)
        .expect((res) => {
          expect(res.body.username).toEqual(username);
          expect(res.body.languages[0]).toBe(languages[0]);
          expect(res.body.tags[0]).toBe(tags[0]);
        });
    });
  });
  describe('POST', () => {});
});

describe('Invalid route', () => {
  describe('GET', () => {});
});
