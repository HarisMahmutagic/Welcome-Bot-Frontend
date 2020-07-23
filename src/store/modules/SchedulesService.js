/* eslint-disable camelcase */
import axios from 'axios';

const url = 'https://welcome-bot-slack.herokuapp.com/api/schedules/';

class SchedulesService {
  static addSchedule(message, run_date, active, repeat_range) {
    return axios.post(url, {
      message,
      run_date,
      active,
      repeat_range,
    });
  }

  static deleteSchedule(messageTitle) {
    return axios.delete(`${url}${messageTitle}`);
  }

  static editSchedule(message, run_date, active, repeat_range) {
    return axios.post(`${url}${message}`, {
      message,
      run_date,
      active,
      repeat_range,
    });
  }
}

export default SchedulesService;
