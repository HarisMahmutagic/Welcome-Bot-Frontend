import axios from 'axios';

const url = 'https://welcome-bot-slack.herokuapp.com/api/triggers/';

class SchedulesService {
  // eslint-disable-next-line camelcase
  static addTrigger(message, trigger_word, channel, active) {
    return axios.post(url, {
      message,
      trigger_word,
      channel,
      active,
    });
  }

  static deleteTrigger(trigger) {
    return axios.delete(`${url}${trigger}`);
  }

  // eslint-disable-next-line camelcase
  static editTrigger(message, trigger_word, channel, active) {
    // eslint-disable-next-line camelcase
    return axios.post(`${url}${trigger_word}`, {
      message,
      trigger_word,
      channel,
      active,
    });
  }
}

export default SchedulesService;
