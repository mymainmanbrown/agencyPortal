'use strict';

module.exports = {
  username: {
    name: 'username',
    title: 'Username',
    description: 'The username that the user must log in with.',
    type: 'string',
    unique: true,
    required: true,
  },
  password: {
    name: 'password',
    title: 'Password',
    description: 'The password that the user must log in with.',
    type: 'string',
    unique: true,
    required: true,
  },
  firstName: {
    name: 'firstName',
    title: 'First Name',
    description: 'The user\'s first name.',
    type: 'string',
    unique: true,
    required: true,
  },
  lastName: {
    name: 'lastName',
    title: 'Last Name',
    description: 'The user\'s last name.',
    type: 'string',
    unique: true,
    required: true,
  },
  email: {
    name: 'email',
    title: 'Email',
    description: 'The email address of the user.',
    type: 'string',
    unique: true,
    required: true,
  },
  jobRoles: {
    name: 'jobRoles',
    title: 'Job Roles',
    description: 'The job roles assigned to this user.',
    type: 'collection',
    reference: 'jobRole',
    default: [],
  },
  groups: {
    name: 'groups',
    title: 'Groups',
    description: 'The security groups assigned to this user.',
    type: 'collection',
    reference: 'group',
    default: [],
  },
  agencies: {
    name: 'agencies',
    title: 'Agencies',
    description: 'The agencies this user belongs to.',
    type: 'collection',
    reference: 'agency',
    default: [],
  },
  divisions: {
    name: 'divisions',
    title: 'Divisions',
    description: 'The divisions this user belongs to.',
    type: 'collection',
    reference: 'division',
    default: [],
  },
  supervisors: {
    name: 'supervisors',
    title: 'Supervisors',
    description: 'The supervisors of this user.',
    type: 'collection',
    reference: 'user',
    default: [],
  },
};
