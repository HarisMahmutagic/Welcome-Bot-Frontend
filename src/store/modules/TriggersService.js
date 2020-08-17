import axios from 'axios';

// const url = 'http://localhost:5000/api/triggers/';
// const url = 'http://localhost/api/triggers/';
const url = 'https://praksans.dyndns.org:450/api/triggers/';

class SchedulesService {
  // eslint-disable-next-line camelcase
  static addTrigger(message, trigger_word, channel, active, token) {
    return axios.post(
      url,
      {
        message,
        trigger_word,
        channel,
        active,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  static deleteTrigger(trigger, token) {
    return axios.delete(`${url}${trigger}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  // eslint-disable-next-line camelcase
  static editTrigger(message, trigger_word, channel, active, token) {
    // eslint-disable-next-line camelcase
    return axios.post(
      // eslint-disable-next-line camelcase
      `${url}${trigger_word}`,
      {
        message,
        trigger_word,
        channel,
        active,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export default SchedulesService;
