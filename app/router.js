'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.post('/api/login', controller.auth.login); // 登录

  router.get('/api/post', controller.post.index); //  获取所有文章列表内容

  router.get('/api/post/:id', controller.post.getPostById);   // 通过id 获取文章内容

  router.post('/api/post/create', controller.post.create);    // 创建新文章

  router.post('/api/post/update', controller.post.updatePostById);    // 修改更新文章

  router.delete('/api/post/:id', controller.post.deletePostById);

  router.get('/api/postbytagid/:id', controller.post.getAllPostsByTagId); // 通过tagid 获取文章列表

  router.post('/api/updatetagbypostid', controller.post.updateTagByPostId);  // 在文章中修改其标签

  router.get('/api/uptoken', controller.qiniu.getUptoken);    // 获取 七牛 上传图片 token 用来前端上传图片

  router.get('/api/getUploads', controller.upload.getUploads);  // 获取所有upload

  router.post('/api/saveupload', controller.upload.saveupload);  //  保存图片

  router.get('/api/tag', controller.tag.getTags); //获取所有标签

  router.post('/api/updatetag', controller.tag.updateTag); //  修改标签

  router.post('/api/createtag', controller.tag.createTag);  // 新增标签

  router.get('/api/note', controller.note.getNotes); // 获取所有便签

  router.post('/api/note', controller.note.createNote); // 新建便签

  router.delete('/api/note/:id', controller.note.deleteNoteById);  // 删除便签

};
