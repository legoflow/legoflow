<template>
    <transition name="show">
        <div class="update" v-if="isShow">
            <div class="update-content" @click="isRestart">
                <div class="update-loading-ico">
                    <div class="update-success-ico" v-if="isSuccess"></div>
                    <div class="sk-fading-circle" v-if="!isSuccess">
                        <div class="sk-circle1 sk-circle"></div>
                        <div class="sk-circle2 sk-circle"></div>
                        <div class="sk-circle3 sk-circle"></div>
                        <div class="sk-circle4 sk-circle"></div>
                        <div class="sk-circle5 sk-circle"></div>
                        <div class="sk-circle6 sk-circle"></div>
                        <div class="sk-circle7 sk-circle"></div>
                        <div class="sk-circle8 sk-circle"></div>
                        <div class="sk-circle9 sk-circle"></div>
                        <div class="sk-circle10 sk-circle"></div>
                        <div class="sk-circle11 sk-circle"></div>
                        <div class="sk-circle12 sk-circle"></div>
                    </div>
                </div>
                {{ isSuccess ? '已完成，点击重启' : ( !label ? 'UPDATE...' : label ) }}
            </div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
@import "~var";

.update {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba( 0, 0, 0, .1 );
}

.show-enter-active, .show-leave-active {
    transition: all .6s ease;
    opacity: 1;
}
.show-enter, .show-leave-to {
    opacity: 0;
}

.update-content {
    position: relative;
    padding-left: 34px;
    width: 200px;
    height: 50px;
    line-height: 52px;
    background-color: $whiteColor;
    border: 1px solid $borderColor;
    box-shadow: 0 0 10px rgba( 0, 0, 0, .1 );
    border-radius: 30px;
    text-align: center;
    color: $mainColor;
    font-size: 14px;
    z-index: 2;
    -webkit-touch-callout: none;
    user-select: none;
    cursor: pointer;
}

.update-loading-ico {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background-color: $whiteColor;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid $borderColor;
    box-shadow: 0 0 20px rgba( 0, 0, 0, .3 );
}

.update-success-ico {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 18px;
    height: 18px;
    background-image: url( ../image/success.png );
    background-repeat: no-repeat;
    background-size: cover;
}

.sk-fading-circle {
    margin: 100px auto;
    width: 40px;
    height: 40px;
    position: relative;
}

.sk-fading-circle .sk-circle {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
}

.sk-fading-circle .sk-circle:before {
    content: '';
    display: block;
    margin: 0 auto;
    width: 15%;
    height: 15%;
    background-color: $mainColor;
    border-radius: 100%;
    animation: sk-circleFadeDelay 1.2s infinite ease-in-out both;
}
.sk-fading-circle .sk-circle2 {
    transform: rotate(30deg);
}
.sk-fading-circle .sk-circle3 {
    transform: rotate(60deg);
}
.sk-fading-circle .sk-circle4 {
    transform: rotate(90deg);
}
.sk-fading-circle .sk-circle5 {
    transform: rotate(120deg);
}
.sk-fading-circle .sk-circle6 {
    transform: rotate(150deg);
}
.sk-fading-circle .sk-circle7 {
    transform: rotate(180deg);
}
.sk-fading-circle .sk-circle8 {
    transform: rotate(210deg);
}
.sk-fading-circle .sk-circle9 {
    transform: rotate(240deg);
}
.sk-fading-circle .sk-circle10 {
    transform: rotate(270deg);
}
.sk-fading-circle .sk-circle11 {
    transform: rotate(300deg);
}
.sk-fading-circle .sk-circle12 {
    transform: rotate(330deg);
}
.sk-fading-circle .sk-circle2:before {
    animation-delay: -1.1s;
}
.sk-fading-circle .sk-circle3:before {
    animation-delay: -1s;
}
.sk-fading-circle .sk-circle4:before {
    animation-delay: -0.9s;
}
.sk-fading-circle .sk-circle5:before {
    animation-delay: -0.8s;
}
.sk-fading-circle .sk-circle6:before {
    animation-delay: -0.7s;
}
.sk-fading-circle .sk-circle7:before {
    animation-delay: -0.6s;
}
.sk-fading-circle .sk-circle8:before {
    animation-delay: -0.5s;
}
.sk-fading-circle .sk-circle9:before {
    animation-delay: -0.4s;
}
.sk-fading-circle .sk-circle10:before {
    animation-delay: -0.3s;
}
.sk-fading-circle .sk-circle11:before {
    animation-delay: -0.2s;
}
.sk-fading-circle .sk-circle12:before {
    animation-delay: -0.1s;
}

@keyframes sk-circleFadeDelay {
  0%, 39%, 100% { opacity: 0; }
  40% { opacity: 1; }
}
</style>

<script>
export default {
    computed: {
        isShow ( ) {
            return this.$store.state.isShowUpdateComponent;
        },
        label ( ) {
            return this.$store.state.updateComponentLabel;
        },
        isSuccess ( ) {
            return this.$store.state.updateComponentSuccess;
        },
    },
    methods: {
        isRestart ( ) {
            this.isSuccess ? window.ipc.app.restart( ) : void 0;
        }
    },
};
</script>
