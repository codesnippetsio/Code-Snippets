const request = require('supertest');
const server = 'http://localhost:3000';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 404 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(404)
          .then((response) => {
            expect(response.error.text).toEqual('Invalid endpoint');
          });
      });
    });
  });

  describe('/snippets', () => {
    describe('GET', () => {
      it('responds with 200 status and /application/json/ content type', () => {
        return request(server)
          .get('/snippets')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
    });

    describe('POST', () => {      
      it('empty request responds with 500 status', () => {
        return request(server)
          .post('/snippets')
          .expect('Content-Type', /application\/json/)
          .expect(500)
          .then((response) => {
            console.log(response.body);
          });
      });
    });

    describe('POST', () => {      
      it('request with title responds with 200 status', () => {
        return request(server)
          .post('/snippets')
          .send({title: "title"})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            console.log(response.body);
          });
      });
    });

    describe('PUT', () => {      
      it('empty request responds with 500 status', () => {
        return request(server)
          .put('/snippets')
          .expect('Content-Type', /application\/json/)
          .expect(500)
          .then((response) => {
            console.log(response.body);
          });
      });
    });

    describe('PUT', () => {      
      it('request with id and title responds with 200 status', () => {
        return request(server)
          .put('/snippets')
          .send({id: 1, title: "newTitle"})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            console.log(response.body);
          });
      });
    });

     describe('DELETE', () => {      
      it('empty request responds with 500 status', () => {
        return request(server)
          .delete('/snippets')
          .expect('Content-Type', /application\/json/)
          .expect(500)
          .then((response) => {
            console.log(response.body);
          });
      });
    });

    describe('DELETE', () => {      
      it('request with id and title responds with 200 status', () => {
        return request(server)
          .delete('/snippets')
          .query({id: 1})
          .expect('Content-Type', /application\/json/)
          .expect(200)
          .then((response) => {
            console.log(response.body);
          });
      });
    });


  });
});
