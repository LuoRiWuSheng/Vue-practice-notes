<template>
    <div>121212
        <head-top>
            <router-link :to="'/search/geohash'" class="link-search" slot="search">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <circle cx="8" cy="8" r="7" stroke="#FFF" stroke-width="1" fill="none">
                    </circle>
                    <line x1="14" y1="14" x2="20" y2="20" style="stroke:#FFF; stroke-width: 2"></line>
                </svg>
            </router-link>
            <router-link to="/home" slot="msite-title" class="msite-title"></router-link>
        </head-top>
    </div>
</template>

<script>
import headTop from "../../components/header/Header"

export default {
    name: "Msite",
    data() {
        return {

        }
    },
    computed: {

    },
    methods: {

    },
    mounted() {

    },
    components: {
        headTop
    }
}
</script>
