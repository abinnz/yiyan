//判断实例是否为空
const isNull = (obj) => {
    return (typeof obj === 'undefined') || obj === null;
};

//判断实例不为空
const isNotNull = (obj) => {
    return !isNull(obj);
};

//是否为布尔类型
const isBoolean = (obj) => {
    if (typeof obj === 'boolean') {
        return true;
    } else {
        return false;
    }
};

//是否为数字类型
const isNumber = (obj) => {
    if (typeof obj === 'number') {
        return true;
    } else {
        return false;
    }
};

//判断是否为空
const isEmpty = (obj) => {
    if (isNotNull(obj) && obj.length !== 0) {
        return false;
    } else {
        return true;
    }
};

//判读是否非空
const isNotEmpty = (obj) => {
    return !isEmpty(obj);
};

module.exports = {
    isNull: isNull,
    isNotNull: isNotNull,
    isBoolean: isBoolean,
    isNumber: isNumber,
    isEmpty: isEmpty,
    isNotEmpty: isNotEmpty
};