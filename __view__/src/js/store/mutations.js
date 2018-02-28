'use strict';

export default {
    SET_USER ( state, data ) {
        state.user = data;
        window.appSetting.set( 'user', data );
    },
    SET_PORT ( state, data ) {
        state.port = data;
        window.appSetting.set( 'port', data );
    },
    SET_EDITOR ( state, data ) {
        state.editor = data;
        window.appSetting.set( 'editor', data );
    },
    SET_AUTO_OPEN_CHROME ( state, data ) {
        state.autoOpenChrome = data;
        window.appSetting.set( 'autoOpenChrome', data );
    },
    SET_VIEW_INDEX ( state, index ) {
        state.viewIndex = index;
    },
    SET_PROJECT_ACTIVE_INDEX ( state, index ) {
        state.projectActiveIndex = index;
    },
    DEL_PROJECT ( state, index ) {
        state.project.splice( index, 1 );
    },
    ADD_PROJECT ( state, { index, project } ) {
        if ( !index ) {
            state.project.unshift( project );
        }
        else {
            state.project.splice( index, 0, project );
        }
    },
    SHOW_UPDATE ( state ) {
        state.isShowUpdateComponent = true;
    },
};
