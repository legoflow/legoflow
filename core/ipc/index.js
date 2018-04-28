'use strict';

module.exports = ( ...args ) => {
    require('./sundry')( ...args );
    require('./project')( ...args );
    require('./workflow_dev')( ...args );
    require('./workflow_build')( ...args );
};
