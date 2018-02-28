'use strict';

export default {
    SET_USER ( state, data ) {
        state.user = data;
        window.appSetting.set( 'user', state.user );
    },
    SET_PORT ( state, data ) {
        state.port = data;
        window.appSetting.set( 'port', state.port );
    },
    SET_EDITOR ( state, data ) {
        state.editor = data;
        window.appSetting.set( 'editor', state.editor );
    },
    SET_AUTO_OPEN_CHROME ( state, data ) {
        state.autoOpenChrome = data;
        window.appSetting.set( 'autoOpenChrome', state.autoOpenChrome );
    },
    SET_VIEW_INDEX ( state, index ) {
        state.viewIndex = index;
    },
    SET_PROJECT_ACTIVE_INDEX ( state, index ) {
        state.projectActiveIndex = index;
    },
    DEL_PROJECT ( state, index ) {
        state.project.splice( index, 1 );
        window.appSetting.set( 'project', state.project );
    },
    ADD_PROJECT ( state, { index, project } ) {
        !index ? state.project.unshift( project ) : state.project.splice( index, 0, project );
        window.appSetting.set( 'project', state.project );
    },
    SHOW_UPDATE ( state ) {
        state.isShowUpdateComponent = true;
    },
};
