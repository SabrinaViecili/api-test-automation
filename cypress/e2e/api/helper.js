const apiHelpers = {
    getUsers: () => {
      return cy.request('GET', 'http://jsonplaceholder.typicode.com/users');
    },
  
    createUser: (user) => {
      return cy.request('POST', 'http://jsonplaceholder.typicode.com/users', user);
    },
  
    updateUser: (userId, user) => {
      return cy.request('PUT', `http://jsonplaceholder.typicode.com/users/${userId}`, user);
    },
  
    deleteUser: (userId) => {
      return cy.request('DELETE', `http://jsonplaceholder.typicode.com/users/${userId}`);
    }
  };
  
  export default apiHelpers;
  