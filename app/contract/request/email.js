'use strict';
module.exports = {
  sendEmail: {
    contentType: {
      type: 'string',
      example: 'text',
    },
    email: {
      type: 'string',
      required: true,
    },
    content: {
      type: 'string',
      required: true,
    },
  },
};
