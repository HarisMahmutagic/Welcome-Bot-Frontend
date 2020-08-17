import axios from 'axios';

// const url = 'http://localhost:5000/login';
// const url = 'http://localhost/login';
const url = 'https://praksans.dyndns.org:450/login';

class LoginService {
  // eslint-disable-next-line camelcase
  static logIn(username, pass) {
    return axios.post(url, {
      username,
      pass,
    });
  }
}

export default LoginService;
