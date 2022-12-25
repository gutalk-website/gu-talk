'use strict';
const app = Vue.createApp({
    data() {
        return {
            showLoginDialog: false,
            isLogin: false,
            accessToken: localStorage.getItem('github-token'),
            currentPage: 1,
            list: []
        }
    },
    mounted() {
        if (this.accessToken != undefined) {
            axios.get('https://api.github.com/user')
                .then((res) => {
                    axios.defaults.headers['Authorization'] = this.accessToken;
                    this.isLogin = true;
                }).catch(function (err) {
                    localStorage.removeItem('github-token');
                    ElementPlus.ElMessage.error(`登录信息无效：${err}`);
                    location.reload();
                });
        }
    },
    methods: {
        login() {
            this.showLoginDialog = false;
            let win = window.open('https://github.com/login/oauth/authorize?client_id=592223f26d426d6b7141&scope=public_repo');
            let loop = setInterval(function () {
                if (win && win.closed) {
                    location.reload();
                    clearInterval(loop);
                }
            }, 300);
            this.getPage();
        },
        getPage() {
            axios.get(`https://api.github.com/repos/gutalk-website/gu-talk/issues?state=open&per_page=10&page=${this.currentPage}`)
                .then((res) => {
                    this.list = this.list.concat(res.data);
                }).catch(function (err) {
                    ElementPlus.ElMessage.error(`获取列表失败：${err}`);
                });
        }
    }
});
app.use(ElementPlus);
app.mount('#app');