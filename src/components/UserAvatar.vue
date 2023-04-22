<template>
    <div style="width: 56px; display: inline-block; overflow: hidden;">
        <el-avatar style="display: block; margin-right: auto;" size="large" :src="avatar_url"></el-avatar>
        <div style="font-size: 14px; text-align: center; word-wrap: break-word; margin: auto; margin-top: 5px;">
            {{ username }} </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    username: string,
    avatar_url: string
}>();
</script>