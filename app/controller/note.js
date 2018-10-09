'use strict';

const Controller = require('egg').Controller;

const nanoid = require('nanoid');


class NoteController extends Controller {
  async getNotes() {
    const { ctx } = this;

    const result = await ctx.model.Note.findAll({
      raw: true,
      attributes: ['id', 'content', 'updated_at'],
      order: [[ 'updated_at', 'DESC' ]],
    });

    ctx.body = {
      code: 0,
      message: 'success',
      result: result
    };
  }

  async createNote() {
    const { ctx } = this;
    const { content } = ctx.request.body;

    let id = nanoid(11);
    let note = await ctx.model.Note.create({
      id,
      content
    });
    note = note.dataValues;
    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: note
    };
  }

  async deleteNoteById() {
    const { ctx } = this;
    const id = ctx.params.id;

    await ctx.model.Note.destroy({
      where: {
        id
      }
    })

    ctx.status = 200;
    ctx.body = {
      code: 0,
      message: 'success',
      result: "删除成功",
    };
  }
}

module.exports = NoteController;
