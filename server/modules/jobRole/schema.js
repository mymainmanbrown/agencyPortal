'use strict';

module.exports = {
  name: {
    name: 'name',
    title: 'Name',
    description: 'The machine-readable name of the job role.',
    type: 'string',
    unique: true,
    required: true,
  },
  title: {
    name: 'title',
    title: 'Title',
    description: 'The human-readable title of the job role.',
    type: 'string',
    unique: true,
    required: true,
  },
};
