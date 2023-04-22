<template>
    <el-scrollbar style="height: 100%;">
        <div v-for="issue in list">
            <PostCard :user="{ username: issue.user.login, avatar_url: issue.user.avatar_url }" :title="issue.title"
                :url="`post.html?id=${issue.number}`" :n_comments="issue.comments" :updated_time="issue.updated_at"
                :is_locked="issue.locked"></PostCard>
        </div>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import PostCard from './PostCard.vue';
defineProps<{
    list: any
}>();
</script>