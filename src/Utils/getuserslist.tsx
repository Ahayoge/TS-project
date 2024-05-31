import axios from 'axios';
// Получаем список пользователей через GET-запрос
axios.defaults.baseURL = 'https://reqres.in/api';

const getUsersList = (callback: Function) => {
  axios
    .get('/users', {
      params: {
        per_page: 12,
      },
    })
    .then((response) => {
      callback(response.data.data);
    });
};



export { getUsersList };
