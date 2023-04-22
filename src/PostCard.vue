<template>
    <el-card shadow="hover" style="margin: 10px;">
        <UserAvatar :username="user.username" :avatar_url="user.avatar_url"></UserAvatar>
        <PostDetail :title="title" :url="url" :n_comments="n_comments" :updated_time="updated_time" :is_locked="is_locked">
        </PostDetail>
    </el-card>
</template>

<script lang="ts" setup>
import PostDetail from './PostDetail.vue';
defineProps<{
    user: {
        username: string,
        avatar_url: string
    },
    title: string,
    url: string,
    n_comments: number,
    updated_time: string,
    is_locked: boolean
}>();
</script>