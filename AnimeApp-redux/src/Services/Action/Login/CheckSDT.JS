import axios from 'axios';

export default CheckSDT = (number) => {
    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:5179/api/Login/CheckSDT/${number}`)
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log('Lỗi');
                reject(error);
            });
    });
};
