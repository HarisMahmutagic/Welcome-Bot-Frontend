import axios from 'axios';

const url = 'http://localhost:5000/login';
// const url = 'http://localhost/login';
// const url = 'https://welcome-bot-slack.herokuapp.com/login/';

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
