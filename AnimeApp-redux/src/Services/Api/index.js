import axios from 'axios';

const host = 'http://localhost:5179/api/';
const getVideo = '';

const getVideoHomePage = async (pageSize = 10, pageIndex = 1, keyword = 'a') => {
    try {
        const response = await axios.get(
            `${host}Video/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`,
        );
        return response;
    } catch (error) {
        throw error;
    }
};

// const getVideoHomePage = (pageSize = 10, pageIndex = 1, keyword = 'a') => {
//     callApi()
//         .then((response) => {
//             console.log(response.items);
//             return response.items;
//         })
//         .catch((error) => {
//             console.log('Lỗi Video');
//         });
// };

// const getVideoHomePage = (pageSize = 10, pageIndex = 1, keyword = 'a') => {
//     axios
//         .get(`${host}Video/get-all?pageSize=${pageSize}&pageIndex=${pageIndex}&keyword=${keyword}`)
//         .then((response) => {
//             console.log(response.data.items);
//         })
//         .catch((error) => {
//             console.log('Lỗi Get Video Home Page');
//         });
// };
export { getVideoHomePage };
