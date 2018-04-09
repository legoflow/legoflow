<template>
    <div class="view-content log">
        <div class="log-card" v-for="( item1, $index1 ) in log" :key="$index1">
            <div class="log-card-titile">
                {{ item1.name }}
            </div>
            <div class="log-card-log" v-for="( item2, $index2 ) in item1.msgList" :key="$index2" :class="{ 'error': item2.type === 'error', 'success': item2.type === 'success' }">
                {{ item2.msg }}
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.log {
    padding-bottom: 60px;
    overflow: auto;
}

.log-card {
    position: relative;
    padding: 45px 10px 0 10px;
    width: 100%;
    border-bottom: 1px solid $borderColor;
    background-color: rgba( 0, 0, 0, .015 );
    .log-card-titile {
        position: absolute;
        top: 0;
        left: 0;
        padding: 0 10px;
        width: 100%;
        height: 45px;
        line-height: 50px;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        border-bottom: 1px solid $borderColor;
        background-color: $whiteColor;
    }
    .log-card-log {
        padding: 5px 1px;
        width: 100%;
        min-height: 30px;
        line-height: 20px;
        border-bottom: 1px solid $borderColor;
        color: $assistFontColor;
        &:last-of-type {
            border-bottom: none;
        }
    }
    .success {
        color: $greenColor !important;
    }
    .error {
        color: $redColor !important;
    }
}

::-webkit-scrollbar {
    width: 0;
}
</style>

<script>
export default {
    computed: Vuex.mapState( [ 'log' ] ),
};
</script>
