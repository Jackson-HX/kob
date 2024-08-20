<template>
    <div class="pk-bg">
        <GameMap></GameMap>
    </div>
</template>

<script>
    import GameMap from "./GameMap.vue"

    export default {
        components: {
            GameMap
        }
    }
</script>

<style scoped>
div.pk-bg {
    width: 60vw;
    height: 40vw;
    margin: 40px auto;
    background-color: lightblue;
}
</style>