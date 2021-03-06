'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication');
const bcrypt = require('bcryptjs');
const local = require('feathers-authentication-local');

const hashId = (hook) => {
	if (!hook.data.password) {
		const accountService = hook.app.service('/accounts');

		const username = hook.data.username;
		return accountService.find({
			query: {
				username: username
			}
		}).then((account) => {
			account = account[0];
			hook.data.account = account._id;
		});
	}
};

exports.before = {
	all: [],
	find: [auth.hooks.authenticate('jwt')],
	get: [],
	create: [hashId,
		local.hooks.hashPassword({passwordField: 'password'})],
	update: [auth.hooks.authenticate('jwt')],
	patch: [auth.hooks.authenticate('jwt')],
	remove: [auth.hooks.authenticate('jwt')]
};

exports.after = {
	all: [],
	find: [],
	get: [],
	create: [],
	update: [],
	patch: [],
	remove: []
};
