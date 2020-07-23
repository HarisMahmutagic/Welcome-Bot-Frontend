import axios from 'axios';

const url = 'https://welcome-bot-slack.herokuapp.com/api/messages/';

class MessagesService {
  // eslint-disable-next-line camelcase
  static addMessage(title, text, cr_date) {
    return axios.post(url, {
      title,
      text,
      cr_date,
    });
  }

  static deleteMessage(title) {
    return axios.delete(`${url}${title}`);
  }

  static editMessage(title, text) {
    return axios.post(`${url}${title}`, {
      title,
      text,
    });
  }
}

export default MessagesService;
