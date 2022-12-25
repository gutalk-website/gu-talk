'use strict';
const app = Vue.createApp({
    data() {
        return {
            inited: false,
            showLoginDialog: false,
            isLogin: false,
            currentPage: 1,
            list: []
        }
    },
    mounted() {
        if (this.accessToken != undefined) {
            axios('https://api.github.com/user', {
                headers: { 'Authorization': this.accessToken }
            }).then((res) => {
                axios.defaults.headers.common['Authorization'] = this.accessToken;
                this.inited = true;
                this.isLogin = true;
            }).catch(function (err) {
                localStorage.removeItem('github-token');
                this.inited = true;
                ElementPlus.ElMessage.error(`登录信息无效：${err}`);
            });
        }
    },
    methods: {
        login() {
            this.showLoginDialog = false;
            let win = window.open('https://github.com/login/oauth/authorize?client_id=592223f26d426d6b7141&scope=public_repo');
            let loop = setInterval(function () {
                if (win && win.closed) {
                    clearInterval(loop);
                    location.reload();
                }
            }, 300);
        },
        getPage() {
            if (this.inited) {
                axios.get(`https://api.github.com/repos/gutalk-website/issue-repo/issues?state=open&per_page=10&page=${this.currentPage}`)
                    .then((res) => {
                        this.list = this.list.concat(res.data);
                    }).catch(function (err) {
                        ElementPlus.ElMessage.error(`获取列表失败：${err}`);
                    });
            }
        }
    }
});
app.use(ElementPlus);
app.mount('#app');