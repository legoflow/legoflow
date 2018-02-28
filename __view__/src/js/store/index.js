'use strict';

import state from './state';
import mutations from './mutations';
import actions from './actions';

export default new Vuex.Store( {
    state, mutations, actions,
} );
