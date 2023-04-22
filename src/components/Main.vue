<template>
    <el-container style="height: 100%;">
        <el-header style="margin-top: 3%; margin-left: 15%; margin-right: 15%;">
            <a target="_self" href="/">
                <el-image style="height: 100%;" src="gutalk.png"></el-image>
            </a>
        </el-header>
        <el-main style="margin-bottom: 5%; margin-left: 15%; margin-right: 15%; height: 100%;">
            <slot name="main"></slot>
        </el-main>
    </el-container>
</template>