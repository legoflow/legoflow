'use strict';

export default {
    sortList ( { state, commit }, { oldIndex, newIndex } ) {
        const oldIndexProject = _.cloneDeep( state.project[ oldIndex ] );

        commit( 'DEL_PROJECT', oldIndex );
        commit( 'ADD_PROJECT', { index: newIndex, project: oldIndexProject } );
    },
};
