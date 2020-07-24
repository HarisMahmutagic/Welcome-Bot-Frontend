import axios from 'axios';

const url = 'https://welcome-bot-slack.herokuapp.com/login/';

class LoginService {
  // eslint-disable-next-line camelcase
  static logIn(username, pass) {
    return axios.post(url, {
      username,
      pass,
    });
  }

  static test(token) {
    return axios.post(`${url}test`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }
}

export default LoginService;
