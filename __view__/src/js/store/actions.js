'use strict';

export default {
    sortList ( { state, commit }, { oldIndex, newIndex } ) {
        const oldIndexProject = _.cloneDeep( state.project[ oldIndex ] );

        commit( 'DEL_PROJECT', oldIndex );
        commit( 'ADD_PROJECT', { index: newIndex, project: oldIndexProject } );
    },
    setPanelLogForDevRun ( { commit }, data ) {
        const { id, ip, bsPort, args } = data;

        const url = `http://${ ip }:${ bsPort }`;

        commit( 'SET_PANEL_LOG', { id, type: 'dev', value: url } );

        commit( 'SET_LOG', { data, msg: { type: 'success', msg: url } } );
    },
    setPanelLogForDevStop ( { commit }, data ) {
        const { id } = data;

        commit( 'SET_PANEL_LOG', { id, type: 'dev', value: '' } );

        commit( 'SET_LOG', { data, msg: { type: 'success', msg: '已停止' } } );
    },
    setPanelLogForBuildStop ( { commit }, data ) {
        const { id } = data;

        commit( 'SET_PANEL_LOG', { id, type: 'build', value: '已停止' } );

        commit( 'SET_LOG', { data, msg: { type: 'success', msg: '已停止' } } );
    },
};
