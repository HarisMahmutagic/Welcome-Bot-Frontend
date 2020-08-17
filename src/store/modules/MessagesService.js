import axios from 'axios';

// const url = 'http://localhost:5000/api/messages/';
// const url = 'http://localhost/api/messages/';
const url = 'https://praksans.dyndns.org:450/api/messages/';

class MessagesService {
  // eslint-disable-next-line camelcase
  static addMessage(title, text, cr_date, token) {
    return axios.post(
      url,
      {
        title,
        text,
        cr_date,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  static deleteMessage(title, token) {
    return axios.delete(`${url}${title}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static editMessage(title, text, token) {
    return axios.post(
      `${url}${title}`,
      {
        title,
        text,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }
}

export default MessagesService;
