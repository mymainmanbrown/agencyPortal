'use strict';

const agencyRoutes = require('./modules/agency/routes');
const approvalRequestRoutes = require('./modules/approvalRequest/routes');
const divisionRoutes = require('./modules/division/routes');
const entryRoutes = require('./modules/entry/routes');
const formRoutes = require('./modules/form/routes');
const groupRoutes = require('./modules/group/routes');
const jobRoleRoutes = require('./modules/jobRole/routes');
const relationshipRoutes = require('./modules/relationship/routes');
const submittedEntryRoutes = require('./modules/submittedEntry/routes');
const submittedFormRoutes = require('./modules/submittedForm/routes');
const userRoutes = require('./modules/user/routes');

const RouteCollection = require('./collections/Route');

module.exports = (app, config, db) => {
  return RouteCollection.factory(app)
    .addManyFromData(agencyRoutes)
    .addManyFromData(approvalRequestRoutes)
    .addManyFromData(divisionRoutes)
    .addManyFromData(entryRoutes)
    .addManyFromData(formRoutes)
    .addManyFromData(groupRoutes)
    .addManyFromData(jobRoleRoutes)
    .addManyFromData(relationshipRoutes)
    .addManyFromData(submittedEntryRoutes)
    .addManyFromData(submittedFormRoutes)
    .addManyFromData(userRoutes);
};
