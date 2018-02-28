<template>
    <div class="view-content" ref="content">
        <div class="list-empty" v-if="project.length === 0">请点击 "新建" 以创建项目</div>
        <div class="list" ref="list">
            <div
                v-if="project.length > 0"
                :class="[ 'list-acitve', project[ projectActiveIndex ].dev || project[ projectActiveIndex ].build ? 'running' : void 0 ]"
                :style="{ transform: `translate3d( 0, ${ projectActiveIndex * 49 }px, 0 )` }"
                ref="active"
            >
                <div class="list-acitve-del" @click="deleteProject"></div>
                <div class="list-active-running"></div>
            </div>
            <div class="list-item" v-for="( item, $index ) in project" :key="item.id" @click="chooseProjectAcitveIndex( $index )">
                <div class="list-item-name">
                    {{ item.name }}<span>v{{ item.version }}</span>
                </div>
            </div>
        </div>
        <list-panel></list-panel>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.list {
    position: relative;
    padding-bottom: 80px;
    width: 100%;
    height: calc( 100% - 45px );
    overflow: auto;
}

.list-empty {
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

.list-acitve {
    position: absolute;
    top: -1px;
    left: 0;
    width: 100%;
    height: 50px;
    background-color: rgba( 0, 0, 0, .025 );
    transition: transform .2s ease;
    cursor: default;
    z-index: 2;
    pointer-events: none;
    .list-active-running {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 22px;
        margin: auto;
        width: 12px;
        height: 12px;
        background-color: $mainColor;
        border-radius: 50%;
        opacity: 0;
        transition: opacity .1s ease;
    }
    .list-acitve-del {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 20px;
        margin: auto;
        width: 16px;
        height: 16px;
        background-color: rgba( 0, 0, 0, .1 );
        border-radius: 50%;
        cursor: pointer;
        opacity: 1;
        transition: opacity .1s ease;
        pointer-events: initial;
        &:before {
            position: absolute;
            top: 1px;
            left: 1px;
            width: 14px;
            height: 14px;
            background-image: url( ../image/delete.png );
            background-size: contain;
            background-repeat: no-repeat;
            content: "";
        }
    }
}

.running {
    .list-active-running {
        opacity: 1;
    }
    .list-acitve-del {
        opacity: 0;
    }
}

.list-item {
    position: relative;
    padding: 0 10px;
    margin-top: -1px;
    width: 100%;
    height: 50px;
    border-bottom: 1px solid $borderColor;
    border-top: 1px solid $borderColor;
    cursor: pointer;
    background-color: $whiteColor;
}

.list-item-name {
    width: 100%;
    height: 100%;
    line-height: 50px;
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    span {
        margin-left: 5px;
        font-size: 10px;
        color: $assistFontColor;
    }
}

::-webkit-scrollbar {
    width: 0;
}
</style>

<script>
import ListPanel from './list_panel';

let sortable = void 0;

export default {
    computed: Vuex.mapState( [ 'viewIndex', 'project', 'projectActiveIndex' ] ),
    components: {
        ListPanel,
    },
    data ( ) {
        return {
            listHeight: 0,
        }
    },
    mounted ( ) {
        this.listHeight = this.$refs.content.clientHeight - 45;

        Mousetrap.bind( 'up', ( ) => {
            if ( this.viewIndex !== 1 || this.projectActiveIndex === 0 ) {
                return false;
            }

            this.$store.commit( 'SET_PROJECT_ACTIVE_INDEX', this.projectActiveIndex - 1 );

            return false;
        } );

        Mousetrap.bind( 'down', ( ) => {
            if ( this.viewIndex !== 1 || this.projectActiveIndex === this.project.length - 1 ) {
                return false;
            }

            this.$store.commit( 'SET_PROJECT_ACTIVE_INDEX', this.projectActiveIndex + 1 );

            return false;
        } );

        // 可排序
        this.sortable( );
    },
    methods: {
        chooseProjectAcitveIndex ( index ) {
            this.$store.commit( 'SET_PROJECT_ACTIVE_INDEX', index );
        },
        sortable ( ) {
            if ( sortable ) {
                sortable.destroy( );
            }

            const list = this.$refs.list;

            if ( !this.$refs.list ) {
				return void 0;
            }

		    Vue.nextTick( ( ) => {
		        sortable = Sortable.create( list, {
			    	onEnd: ( e ) => {
                        let { oldIndex, newIndex } = e;

                        --oldIndex;
                        --newIndex;

                        this.$store.dispatch( 'sortList', { oldIndex, newIndex } );

						e.preventDefault( );
					},
			    } );
		    } )
        },
        deleteProject ( ) {
            this.$store.commit( 'DEL_PROJECT', this.projectActiveIndex );
        },
    },
    watch: {
        projectActiveIndex ( v ) {
            const top = v * 50;
            const listHeight = this.listHeight;
            const { scrollTop } = this.$refs.list;

            if ( top + 60 >= scrollTop + listHeight ) {
                this.$refs.list.scrollTop = top - listHeight + 50;
            }
            else if ( top + 10 <= scrollTop ) {
                this.$refs.list.scrollTop = top;
            }
        },
        project: {
            immediate: true,
            handler ( v ) {
                this.sortable( );
            },
        },
    },
};
</script>
