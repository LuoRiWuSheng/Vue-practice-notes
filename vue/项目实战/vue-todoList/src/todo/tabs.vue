<template>
    <div class="helper">
        <span class="left">2 items left</span>
        <span class="tabs">
            <span v-for="state in states" :key="state" class="[state, filter === state ? 'actived': '']" @click="toggleFiler(state)">{{state}}</span>
        </span>
        <span class="clear" @click="clearAllCompleted"></span>
    </div>
</template>

<script>
export default {
    prosp: {
        filter: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            states: ["all", "active", "completed"]
        }
    },
    methods: {
        toggleFiler(state) {

        },
        clearAllCompleted() {

        }
    }
}
</script>

<style lang="stylus" scoped>
.helper {
    width:100%;
    height:30px;
    background:#FFF;
}

</style>
