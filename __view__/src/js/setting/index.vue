<template>
    <div class="setting">
        <widget-form :form="form" :initValues="values" ref="form"></widget-form>
        <button class="setting-btn" @click="save">保存设置</button>
    </div>
</template>

<style lang="scss" scoped>
@import "~var";

.setting {
    width: 100%;
    height: 100%;
}

.setting-btn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 45px;
    font-size: 14px;
    letter-spacing: 1px;
    color: $mainColor;
    background-color: rgba( 0, 0, 0, 0 );
    border: none;
    box-shadow: 0 2px 10px rgba( 0, 144, 255, .2);
    border-top: 1px solid $mainColorBorderColor;
    cursor: pointer;
    transition: all .2s ease;
    &:active {
        background-color: $mainColor;
        color: $whiteColor;
    }
}
</style>

<script>
const { debounce } = window.appUtil;

export default {
    computed: Vuex.mapState( [ 'user', 'port', 'editor', 'autoOpenChrome', 'nodeBin', 'lab' ] ),
    data ( ) {
        return {
            form: [
                { label: '用户名', type: 'input', placeholder: '选填' },
                { label: '端口号', type: 'input', placeholder: '必填' },
                { label: '编辑器', type: 'select', placeholder: '必选', options: [ { label: 'VSCode', value: 'VSCode' }, { label: 'Atom', value: 'Atom' }, { label: 'SublimeText 3', value: 'sublimeText3' }, { label: 'WebStorm', value: 'WebStorm' } ] },
                { label: '工作流自动打开 Chrome', type: 'radio' },
                { label: '其他', type: 'separate' },
                { label: '实验室', type: 'radio' },
                { label: 'NodeBin', type: 'input', placeholder: 'which node' },
            ],
            values: [ ],
        }
    },
    created ( ) {
        this.updateValues( );
    },
    mounted ( ) {
        document.title = 'LegoFlow Setting';

        let isAppQuit = false

        ipcRenderer.on( 'APP_QUIT', ( event ) => {
            isAppQuit = undefined;
        } )

        window.onbeforeunload = ( e ) => {
            window.ipc.settingWindow.hide( );
            return isAppQuit;
        }
    },
    methods: {
        save: debounce( 300, function ( ) {
            const { values, loadValues } = this.$refs.form;

            const [ user, port, editor, autoOpenChrome, x, lab, nodeBin ] = values;

            console.log( values );

            this.$store.commit( 'SET_USER', user );
            this.$store.commit( 'SET_PORT', port );
            this.$store.commit( 'SET_EDITOR', editor );
            this.$store.commit( 'SET_AUTO_OPEN_CHROME', autoOpenChrome );
            this.$store.commit( 'SET_LAB', lab );
            this.$store.commit( 'SET_NODE_BIN', nodeBin );

            this.updateValues( );

            loadValues( );

            alert( { msg: '设置成功', top: false } );
        } ),
        updateValues ( ) {
            this.values[ 0 ] = this.user;
            this.values[ 1 ] = this.port;
            this.values[ 2 ] = this.editor;
            this.values[ 3 ] = this.autoOpenChrome;
            this.values[ 5 ] = this.lab;
            this.values[ 6 ] = this.nodeBin;
        },
    },
};
</script>
