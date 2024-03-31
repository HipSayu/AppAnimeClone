import axios from 'axios';

export default getVideoHome = () => {
    return new Promise((resolve, reject) => {
        axios
            .get('http://localhost:5179/api/Video/get-all?pageSize=10&pageIndex=1&keyword=c')
            .then((response) => {
                // console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log('Lỗi');
                reject(error);
            });
    });
};
