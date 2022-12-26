marked.setOptions({
    highlight: function (code) {
        return hljs.highlightAuto(code).value;
    }
});
const accessToken = localStorage.getItem('github-token');
if (accessToken != undefined) {
    axios.defaults.headers.common['Authorization'] = accessToken;
}
const app = Vue.createApp({});
app.use(ElementPlus);
app.component('gutalk-issue', {
    data() {
        return {
            content: false,
            comments: false
        }
    },
    mounted() {
        let params = (new URL(document.location)).searchParams;
        if (accessToken != undefined) {
            axios.get('https://api.github.com/user').catch((err) => {
                localStorage.removeItem('github-token');
                delete axios.defaults.headers.common['Authorization'];
                ElementPlus.ElMessage.error(`登录信息无效：${err}`);
            });
        }
        axios.get(`https://api.github.com/repos/gutalk-website/issue-repo/issues/${params.get('id')}`).then((res) => {
            this.content = res.data;
        }).catch((err) => {
            ElementPlus.ElMessage.error(`获取数据失败：${err}`);
        });
        axios.get(`https://api.github.com/repos/gutalk-website/issue-repo/issues/${params.get('id')}/comments`).then((res) => {
            this.comments = res.data;
        }).catch((err) => {
            ElementPlus.ElMessage.error(`获取数据失败：${err}`);
        });
    },
    methods: {
        marked(str) {
            return str == null ? '' : marked.parse(str);
        }
    },
    template: '#issue'
})
app.mount('#app');