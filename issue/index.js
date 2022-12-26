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
for (let i in ElementPlusIconsVue) {
    app.component(i, ElementPlusIconsVue[i]);
    //console.log(ElementPlusIconsVue[i]);
}
app.use(VueMarkdown);
app.component('md-editor', {
    data() {
        return {
            content: '',
            view: ''
        }
    },
    emits: ['submit'],
    methods: {
        header() {
            this.content += '### 标题';
        },
        bold() {
            this.content += '**加粗**';
        },
        italic() {
            this.content += '_斜体_';
        },
        ref() {
            this.content += '> 引用';
        },
        code() {
            this.content += '```\n代码\n```';
        },
        list() {
            this.content += '- 列表项\n- 列表项\n- 列表项';
        },
        link() {
            this.content += '[文字](链接)';
        },
        img() {
            this.content += '![](图片链接)';
        },
        preview() {
            this.view = marked.parse(this.content);
        },
        submit() {
            this.$emit('submit');
        }
    },
    template: '#mdeditor'
});
app.component('gutalk-issue', {
    data() {
        return {
            isLogin: accessToken != undefined,
            content: false,
            comments: false
        }
    },
    mounted() {
        let params = (new URL(document.location)).searchParams;
        if (accessToken != undefined) {
            axios.get('https://api.github.com/user').then(() => {
                this.isLogin = true;
            }).catch((err) => {
                this.isLogin = false;
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
        },
        comment() {
            ElementPlus.ElMessage.success('ok');
        }
    },
    template: '#issue'
})
app.mount('#app');