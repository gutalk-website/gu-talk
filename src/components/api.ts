import axios from 'axios';

function request(method = 'get', url: string) {
    return new Promise(async (resolve) => {
        let result = await axios({ method: method, url: url });
        resolve(result);
    });
}

function getList(page = 1, per_page = 10, sort = 'updated', state = 'open') {
    return request('get', `https://api.github.com/repos/gutalk-website/issue-repo/issues?sort=${sort}&state=${state}&per_page=${per_page}&page=${page}`);
}

export default {
    getList
}