import axios from 'axios';

export default callLogin = ({ userName, password }) => {
    return new Promise((resolve, reject) => {
        axios
            .get(
                `http://localhost:5179/api/Login/Login?NumberPhone=84904179061&UserName=${userName}&Password=${password}`,
            )
            .then((response) => {
                // console.log('dataUser', response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log('Lỗi');
                reject(error);
            });
    });
};
