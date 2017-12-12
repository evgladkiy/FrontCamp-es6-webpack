function filterAttr(attr) {
    if (Array.isArray(attr)) {
        attr.forEach((item) => {
            if (typeof item === 'object') {
                return filterAttr(item);
            }
        });
    } else {
        const keys = Object.keys(attr);
        keys.forEach((key) => {
            if (typeof attr[key] === 'object') {
                return filterAttr(attr[key]);
            } else if (Number(key) === Number(key)) {
                delete attr[key];
            }
        });
    }
}

module.exports = function(source) {
    const dataObj = JSON.parse(source);
    filterAttr(dataObj);
    return JSON.stringify(dataObj);
};
