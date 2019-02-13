<template>
    <div id="test">{{test}}</div>
</template>

<script>
export default {
    name: "App",
    data() {
        return {
            test: "测试"
        }
    }
}
</script>

<style>
    #test {
        background: red;
    }
</style>
