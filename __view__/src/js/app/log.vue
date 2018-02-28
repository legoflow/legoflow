<template>
    <div class="view-content log">
        <div class="log-card">
            <div class="log-card-titile">
                项目 A
            </div>
            <div class="log-card-log">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log error">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log error">
                啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么啊思密达卡马克是多么
            </div>
        </div>
        <div class="log-card">
            <div class="log-card-titile">
                项目 A
            </div>
            <div class="log-card-log success">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log success">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log success">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log success">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log success">
                啊思密达卡马克是多么
            </div>
            <div class="log-card-log success">
                啊思密达卡马克是多么
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
        color: $successColor !important;
    }
    .error {
        color: $errorColor !important;
    }
}

::-webkit-scrollbar {
    width: 0;
}
</style>

<script>
export default {

};
</script>
