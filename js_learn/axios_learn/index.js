import axios form 'axios';

const post = (url, params) => {
    return axios.post(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: JSON.stringify(params)
      }).then(res => {
        if (res.status < 200 || res.status > 300) {
          return Promise.reject(new Error(res.status));
        }

        if (res.data.code === 4) {
          return Promise.reject(res.data);
        }

        if (res.data.code === 0) {
          return res.data;
        }

        return Promise.reject(res.data);

      }).catch(error => {
        console.log(error,'error1');
        return Promise.reject(error);
      });
  };

  post('/api/privil/getMyAllCompPrivils')
    .then(res => {
    }).catch(error => {
    console.log(error,'error2');
  });