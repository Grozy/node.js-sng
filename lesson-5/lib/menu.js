'use strict'

module.exports = {
  'button': [{
    'name': '神驰摩配',
    'sub_button': [{
      'name': '关于我们',
      'type': 'click',
      'key': 'about_us'
    }, {
      'name': '核心理念',
      'type': 'click',
      'key': 'core'
    }, {
      'name': '招聘信息',
      'type': 'click',
      'key': 'employ'
    }, {
      'name': '联系我们',
      'type': 'click',
      'key': 'contact_us'
    }]
  }, {
    'name': '信息咨询',
    'sub_button': [{
      'name': '查询价格',
      'type': 'view',
      'url': 'http://objc.co',
      'key': 'query'
    }, {
      'name': '最新优惠',
      'type': 'click',
      'key': 'coupon'
    }, {
      'name': '最新活动',
      'type': 'click',
      'key': 'activty'
    }]
  }, {
    'name': '帮助',
    'sub_button': [{
      'name': '如何使用查询价格',
      'type': 'click',
      'key': 'help_query'
    }, {
      'name': '实体店地址',
      'type': 'click',
      'key': 'help_address'
    }, {
      'name': '零件预订',
      'type': 'view',
      'key': 'help_order',
      'url': 'http://objc.co'
    }]
  }],
};

//  {
//   'name': '咨询信息',
//   'sub_button': [{
//     'type': 'view',
//     'name': '跳转URL',
//     'url': 'http://github.com'
//   }, {
//     'type': 'scancode_push',
//     'name': '扫码推送事件',
//     'key': 'qr_scan'
//   }, {
//     'name': '扫码推送',
//     'type': 'scancode_waitmsg',
//     'key': 'qr_scan_wait'
//   }, {
//     'name': '弹出拍照',
//     'type': 'pic_sysphoto',
//     'key': 'pic_photo'
//   }, {
//     'name': '弹出拍照或相册',
//     'type': 'pic_photo_or_album',
//     'key': 'pic_photo_album'
//   }]
// 'name': '点击菜单2',
// 'sub_button': [{
//   'name': '微信相册发图',
//   'type': 'pic_weixin',
//   'key': 'pic_weixin'
// }, {
//   'name': '地理位置选择',
//   'type': 'location_select',
//   'key': 'location_select'
// }
// , {
//
// }
// , {
//   'name': '下发图片消息',
//   'type': 'media_id',
//   'media_id': 'xxx'
// }
