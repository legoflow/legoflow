<template>
    <div class="view-content log">
        <div class="log-empty" v-if="log.length === 0">暂无日志</div>
        <div class="log-card" v-for="( item1, $index1 ) in log" :key="$index1">
            <div class="log-card-titile">
                {{ item1.name }}
            </div>
            <div class="log-card-log" v-for="( item2, $index2 ) in item1.msgList" :key="$index2" :class="{ 'error': item2.type === 'error', 'success': item2.type === 'success' }">
                {{ item2.msg }}
                <span class="log-time">{{ item2.time }}</span>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.log {
    padding: 10px 10px 60px 10px;
    overflow: auto;
}

.log-empty {
    position: absolute;
    top: 30px;
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    color: rgba( 0, 0, 0, .15 );
    -webkit-touch-callout: none;
    user-select: none;
}

.log-card {
    position: relative;
    padding: 45px 10px 0 10px;
    margin-bottom: 10px;
    width: 100%;
    border: 1px solid rgba( 0, 0, 0, .05 );
    border-radius: 10px;
    overflow: hidden;
    background-color: rgba( 0, 0, 0, .011 );
    box-shadow: 0 0 5px rgba( 0, 0, 0, .06 );
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
    }
    .log-card-log {
        position: relative;
        padding: 5px 1px;
        width: 100%;
        min-height: 30px;
        line-height: 20px;
        border-bottom: 1px solid $borderColor;
        color: $assistFontColor;
        word-wrap: break-word;
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

.log-time {
    position: absolute;
    top: 7px;
    right: 0;
    font-size: 7px;
    color: rgba( 0, 0, 0, .2 );
}
</style>

<script>
export default {
    computed: Vuex.mapState( [ 'log' ] ),
};
</script>
