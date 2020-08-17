/* eslint-disable camelcase */
import axios from 'axios';

// const url = 'http://localhost:5000/api/schedules/';
const url = 'http://localhost/api/schedules/';

class SchedulesService {
  static addSchedule(message, run_date, active, repeat_range, token) {
    return axios.post(
      url,
      {
        message,
        run_date,
        active,
        repeat_range,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  static deleteSchedule(messageTitle, token) {
    return axios.delete(`${url}${messageTitle}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  static editSchedule(message, run_date, active, repeat_range, token) {
    return axios.post(
      `${url}${message}`,
      {
        message,
        run_date,
        active,
        repeat_range,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export default SchedulesService;
