<template>
    <Main>
        <template #main>
            <PostList :list="list"></PostList>
        </template>
    </Main>
</template>

<script lang="ts" setup>
import PostList from './PostList.vue';

const list = ref();

onMounted(() => {
    api.getList().then((res: any) => {
        list.value = res.data;
    });
});

</script>