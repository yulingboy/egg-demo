'use strict';

const Service = require('egg').Service;

class RoleService extends Service {
	// 创建角色
	async create(payload) {
		return this.ctx.model.Role.create(payload) 
	}
	// 删除角色
	async destroy(_id) {
		const { ctx, service } = this;
		const role = await ctx.model.Role.findOne({ _id })
		if (!role) {
		  return ctx.throw(404, '角色不存在')
		}
		return ctx.model.Role.findByIdAndRemove(_id)
	}
	// 更新角色信息
	async update(_id, payload) {
		const { ctx, service } = this
		const role = await ctx.model.Role.findOne({_id})
		if (!role) {
		  ctx.throw(404, '角色不存在')
		}
		if (role.name === payload.name || role.title === payload.title) {
			return ctx.throw(400, '参数重复')
		}
		return ctx.model.Role.findByIdAndUpdate(_id, payload)
	}
	// 根据ID查询角色
	async show(_id) {
		const role = await this.ctx.model.Role.find({_id})
		if (!role) {
		  this.ctx.throw(404, '角色不存在')
		}
		return this.ctx.model.Role.findById(_id)
	}
	// 分页查询角色
	async index(payload) {
		const { current, size, search } = payload
		let res = []
		let count = 0
		let skip = ((Number(current)) - 1) * Number(size || 10)
		if(search) {
			res = await this.ctx.model.Role.find({ $or: [{ title: { $regex: search } }, { name: { $regex: search } }] }).skip(skip).limit(Number(size)).sort({ create_time: -1 }).exec();
			count = res.length
		  } else {
			res = await this.ctx.model.Role.find({}).skip(skip).limit(Number(size)).sort({ create_time: -1 }).exec()
			count = await this.ctx.model.Role.estimatedDocumentCount({}).exec()
		  }
	
		return { count: count, data: res, size: Number(size), current: Number(current) }
	}
	// 查询所有角色
	async list(payload) {
		const { search } = payload
		let res = []
		if (search) {
			res = await this.ctx.model.Role.find({ $or: [{ title: { $regex: search } }, { name: { $regex: search } }] }).sort({ create_time: -1 }).exec();
		} else {
			res = await this.ctx.model.Role.find().sort({ creat_time: -1 }).exec();
		}
		return res
	}
}

module.exports = RoleService;
