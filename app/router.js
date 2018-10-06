'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/api/post', controller.post.index); //  获取所有文章列表内容

  router.get('/api/post/:id', controller.post.getPostById);   // 通过id 获取文章内容

  router.post('/api/post/create', controller.post.create);    // 创建新文章

  router.post('/api/post/update', controller.post.updatePostById);    // 修改更新文章

  router.delete('/api/post/:id', controller.post.deletePostById);

  router.post('/api/updatetagbypostid', controller.post.updateTagByPostId);  // 在文章中修改其标签

  router.get('/api/uptoken', controller.qiniu.getUptoken);    // 获取 七牛 上传图片 token 用来前端上传图片

  router.post('/api/saveupload', controller.qiniu.saveupload);  //  保存图片

  router.get('/api/tag', controller.tag.getTags); //获取所有标签

  router.post('/api/updatetag', controller.tag.updateTag); //  修改标签

  router.post('/api/createtag', controller.tag.createTag);  // 新增标签


};
