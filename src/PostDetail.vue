<template>
    <div style="margin-left: 15px; display: inline-block; vertical-align: top;">
        <div>
            <el-link :underline="false" style="font-size: 18px;" :href="url">
                {{ title }} </el-link>
            <el-icon style="margin-left: 3px; vertical-align: middle;" v-if="is_locked" color="orange">
                <i-ep-lock></i-ep-lock>
            </el-icon>
            <!--el-tag v-for="label in labels" size="small" round style="margin-left: 5px; vertical-align: middle;" type="info"
                :color="`#${label.color}`"> {{ label.name }} </el-tag!-->
        </div>
        <div style="font-size: 14px; margin-top: 40px;">
            <span> {{ n_comments }}个回答 {{ new Date(updated_time as string).toLocaleString() }}
            </span><br>
        </div>
    </div>
</template>

<script lang="ts" setup>
defineProps<{
    title: string,
    url: string,
    n_comments: number,
    updated_time: string,
    is_locked: boolean
}>();
</script>