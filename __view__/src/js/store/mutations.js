'use strict';

export default {
    SET_LAB ( state, data ) {
        state.lab = data;
        window.appSetting.set( 'lab', state.lab );
    },
    SET_NODE_BIN ( state, data ) {
        state.nodeBin = data;
        window.appSetting.set( 'nodeBin', state.nodeBin );
    },
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

        if ( state.project.length === 1 ) {
            state.projectActiveIndex = 0;
        }
    },
    SHOW_UPDATE ( state ) {
        state.isShowUpdateComponent = true;
    },
    HIDE_UPDATE ( state ) {
        state.isShowUpdateComponent = false;
    },
    SET_PROJECT_WORKFLOW_DEV_IN_STATE ( state, { index, attr } ) {
        for ( let item in state.project[ index ].dev ) {
            item === attr ? state.project[ index ].dev[ item ] = true : state.project[ index ].dev[ item ] = false;
        }
    },
    SET_PROJECT_WORKFLOW_BUILD_IN_STATE ( state, { index, value } ) {
        state.project[ index ].build = value;
    },
    SET_PANEL_LOG ( state, { id, type, value } ) {
        if ( !state.panelLog[ id ] ) {
            Vue.set( state.panelLog, id, { dev: '', build: '' } );
        }

        state.panelLog[ id ][ type ] = value;
    },
    SET_LOG ( state, { data, msg } ) {
        const { id, name } = data;

        const lastProject = state.log[ state.log.length - 1 ];

        if ( !lastProject || ( lastProject && lastProject.id !== id ) ) {
            state.log.unshift( {
                id,
                name,
                msgList: [ msg ],
            } )
        }
        else {
            state.log[ state.log.length - 1 ].msgList.push( msg );
        }
    },
    SET_UPDATE_COMPONENT_LABEL ( state, data ) {
        state.updateComponentLabel = data;
    },
    SET_UPDATE_COMPONENT_SUCCESS ( state, data ) {
        state.updateComponentSuccess = data;
    },
};
