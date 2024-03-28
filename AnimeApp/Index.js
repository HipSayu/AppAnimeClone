const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const isEmail = (email) => {
    if (!regexEmail.test(email.trim())) {
        return true;
    } else {
        return false;
    }
};
const regexNumberPhone = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;
const isNumberPhone = (numberPhone) => {
    if (!regexNumberPhone.test(numberPhone.trim())) {
        return true;
    } else {
        return false;
    }
};

let unordered = {
    ordered: 10,
    total: 9,
    customerName: 'Hoa',
};
const ordered = Object.keys(unordered)
    .sort()
    .reduce((obj, key) => {
        obj[key] = unordered[key];
        return obj;
    }, {});

const filterOrder = (orders, condition) => {
    if (orders.customerName === condition) {
        return true;
    } else {
        return false;
    }
};

let email = 'hoa0214766';
console.log(isEmail(email));
