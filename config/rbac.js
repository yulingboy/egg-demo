'use strict';

exports.permissions = [
  // action_resource
  { name: 'create_user', alias: '创建用户', category: 'user', categoryAlias: '用户' },
  { name: 'delete_user', alias: '删除用户', category: 'user', categoryAlias: '用户' },
  { name: 'query_user', alias: '查询用户', category: 'user', categoryAlias: '用户' },
  { name: 'edit_user', alias: '修改用户', category: 'user', categoryAlias: '用户' },
];

exports.roles = [
  { name: 'userAdmin', alias: '用户管理员', permissions: ['create_user', 'delete_user', 'query_user', 'edit_user'] },
];

exports.groups = [
  { name: 'superAdmin', alias: '超级管理员', roles: ['userAdmin'] },
]