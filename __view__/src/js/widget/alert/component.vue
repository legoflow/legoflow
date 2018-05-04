<template>
	<transition name="show">
		<div id="alert" v-show="isShow" :class="{ 'have-top': isHaveTop, 'windows': system !== 'mac' }">
			<div id="alert-background"></div>
			<div id="alert-content">{{ msg }}</div>
			<div id="alert-list" v-if="list && list.length > 0">
				<ul>
					<li v-for="( item, $index ) in list">
						<template v-if="item.url">
							<a @click="open( item.url )">{{ item.label }}</a>
						</template>
						<template v-else>
							{{ item }}
						</template>
					</li>
				</ul>
			</div>
			<div id="alert-btns" v-show="btns.length > 0" :style="{ marginTop: ( list && list.length > 0 ) ? '' : '5px' }">
				<button
                    v-for="( item, $index ) in btns"
                    :style="{ width: ( 100 / btns.length ) + '%' }"
                    @click="click( $index )"
                >
                    {{ item }}
                </button>
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
@import "~var";

.show-enter-active, .show-leave-active {
    transition: all .2s ease;
    transform: translate3d( 0, 0, 0 );
}
.show-enter, .show-leave-to {
    transform: translate3d( 0, -200%, 0 );
}

#alert {
	position: fixed;
	top: 15px;
	left: 4%;
	width: 92%;
	z-index: 9;
	text-align: center;
	box-shadow: 0px 0 10px rgba( 0, 0, 0, .15 );
	border-radius: 10px;
	overflow: hidden;
	background-color: rgba( 255, 255, 255, .9 );
}

.windows {
    top: 35px !important;
}

#alert-list {
	position: relative;
	width: 100%;
	z-index: 3;
	overflow: hidden;
	ul {
		li {
			border-top: 1px solid $borderColor;
			width: 100%;
			height: 30px;
			line-height: 30px;
			color: $formAssistFontColor;
			a {
				width: 100%;
				height: 100%;
				display: block;
				cursor: pointer;
				color: $formAssistFontColor;
			}
		}
	}
}

.have-top {
	top: 55px !important;
}

#alert-background {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
    background-image: url( data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAC1JREFUOBFj/Pbt22YGKgImKpoFNmrUQMpDdDQMR8OQjBAYTTZkBBqalhEYhgAokQO9fbiVkgAAAABJRU5ErkJggg== );
    filter: blur( 10px );
	z-index: 1;
}

#alert-content {
	position: relative;
	padding: 15px 10px 10px 10px;
	width: 100%;
	line-height: 25px;
	overflow: hidden;
	font-size: 14px;
    z-index: 2;
}
#alert-btns {
	position: relative;
	padding: 0;
	width: 100%;
	height: 40px;
	border-top: 1px solid $borderColor;
	z-index: 3;
	button {
		position: relative;
		height: 40px;
		line-height: 40px;
		display: inline-block;
		background-color: rgba( 0, 0, 0, 0 );
		font-size: 14px;
		border: none;
		border-left: 1px solid $borderColor;
		cursor: pointer;
		&:first-of-type {
			border-left: none;
		}
	}
}
</style>

<script>
export default {
	el: document.createElement( 'div' ),
	data: {
        system: window.config.system,
		msg: '',
        btns: [ ],
        list: [ ],
		isShow: false,
		isHaveTop: false,
		top: void 0,
		timeoutHideTimer: void 0,
	},
	created ( ) {
		if ( typeof this.top !== 'undefined' ) {
			this.isHaveTop = this.top;
		}

		if ( window.config.system === 'mac' && typeof this.top === 'undefined') {
			this.isHaveTop = true;
		}
	},
	mounted ( ) {
        this.isShow = true;

        // 如果没有按钮自动关闭
		if ( this.btns.length <= 0 ) {
			this.timeoutHide( );
        }
	},
	methods: {
		click ( index ) {
            this.hide( true, index );
        },
        timeoutHide ( isCallback, index ) {
            this.timeoutHideTimer = setTimeout( ( ) => this.hide( isCallback, index ) , 2000 );
        },
		hide ( isCallback, index ) {
            if ( this.timeoutHideTimer ) {
                clearTimeout( this.timeoutHideTimer );
            }

            this.isShow = false;

			setTimeout( ( ) => {
			    isCallback && this.callback && this.callback( index );

				this.$destroy( true );
			}, 500 );
		},
		open ( url ) {
			window.appUtil.openURL( url );
        },
	},
	destroyed ( ) {
        this.queue.forEach( ( item, index ) => {
          if ( item == this ) {
              this.$el.parentNode.removeChild( this.$el );
              this.queue.splice( index, 1 );
          }
        } );
	},
};
</script>
