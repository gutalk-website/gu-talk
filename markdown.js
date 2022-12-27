MarkdownEditor = {
    data() {
        return {
            content: '',
            view: ''
        }
    },
    props: ['loading', 'rows'],
    emits: ['submit'],
    expose: ['clear'],
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
            this.$emit('submit', this.content);
        },
        clear() {
            this.content = '';
        }
    },
    template: `
        <el-tabs @tab-change="preview" type="border-card">
            <el-tab-pane label="编辑">
                <el-input v-model="content" :rows="rows" type="textarea"
                    placeholder="Markdown..." input-style="font-family: Droid Sans Mono;"></el-input>
            </el-tab-pane>
            <el-tab-pane label="预览">
                <div style="margin: 3px; margin-bottom: 10px;" class="markdown-body" v-html="view"></div>
            </el-tab-pane>
            <el-button-group style="margin-top: 5px;">
                <el-tooltip content="标题" placement="top">
                    <el-button @click="header"><strong>Ｈ</strong></el-button>
                </el-tooltip>
                <el-tooltip content="加粗" placement="top">
                    <el-button @click="bold"><strong>Ｂ</strong></el-button>
                </el-tooltip>
                <el-tooltip content="斜体" placement="top">
                    <el-button @click="italic" style="font-style: italic;">B</el-button>
                </el-tooltip>
                <el-tooltip content="引用" placement="top">
                    <el-button @click="ref" icon="Expand"></el-button>
                </el-tooltip>
                <el-tooltip content="代码" placement="top">
                    <el-button @click="code" icon="Edit"></el-button>
                </el-tooltip>
                <el-tooltip content="列表" placement="top">
                    <el-button @click="list" icon="List"></el-button>
                </el-tooltip>
                <el-tooltip content="链接" placement="top">
                    <el-button @click="link" icon="Link"></el-button>
                </el-tooltip>
                <el-tooltip content="图片" placement="top">
                    <el-button @click="img" icon="Picture"></el-button>
                </el-tooltip>
            </el-button-group>
            <el-button :loading="loading" @click="submit" type="primary" round
                style="margin-top: 5px; float: right;">提交</el-button>
        </el-tabs>
    `
}