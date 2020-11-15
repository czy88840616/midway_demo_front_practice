import {
  CommonSchedule,
  Inject,
  Provide,
  Schedule,
} from '@midwayjs/decorator';
import { Context } from 'egg';

@Provide()
@Schedule({
  interval: '5s',
  type: 'worker',
})
export class News implements CommonSchedule {

  @Inject()
  ctx: Context;

  @Inject()
  logger;

  // subscribe 是真正定时任务执行时被运行的函数
  async exec() {
    // TODO 获取头条新闻
    const headNews = [
      {
        title: '【前端头条】第三届前端艺术家沙龙于10月24日成功举办',
        text:
          '由阿里巴巴ICBU深圳前端艺术家团队主办的前端艺术家沙龙与10月24日举办，本次分享会邀请了行内知名讲师，与大家畅聊“前端职业成长”心得。',
        messageURL: 'https://artist.alibaba.com',
        picURL:
          'https://img.alicdn.com/tfs/TB1bbLH2eL2gK0jSZPhXXahvXXa-2460-1020.png',
      },
    ];
    // TODO 获取新闻列表
    const messages = [
      ...headNews,
      {
        title: '图片加载失败后CSS样式处理最佳实践',
        messageURL:
          'https://www.zhangxinxu.com/wordpress/2020/10/css-style-image-load-fail/',
        picURL:
          'https://image.zhangxinxu.com/image/blog/202010/2020-10-24_193506.png',
      },
      {
        title: '我的前端成长之路',
        messageURL: 'https://juejin.im/post/6889239308201361416',
        picURL:
          'https://img.alicdn.com/tfs/TB1BKb0qBFR4u4jSZFPXXanzFXa-1492-938.png',
      },
    ];
    // 钉钉自定义机器人文档 https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq/26eaddd5
    const res = await this.ctx.curl(
      'https://oapi.dingtalk.com/robot/send?access_token=e00613e4b184c97f677cc2be2cf366e321e326bf66204266a18d227df7a6fbff',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        data: {
          msgtype: 'feedCard',
          feedCard: {
            links: messages,
          },
        },
        // {
        //     "msgtype": "actionCard",
        //     "actionCard": {
        //         "title": `【前端头条】${headNews[0].title}`,
        //         "text": `![screenshot](${headNews[0].picURL})
        //         \n # ${headNews[0].title}
        //         \n ${headNews[0].text}`,
        //         "btnOrientation": "0",
        //         "singleTitle": "阅读全文",
        //         "singleURL": `dingtalk://dingtalkclient/page/link?url=${headNews[0].messageURL}&pc_slide=false`
        //     }
        // }
      }
    );
    this.logger.info('send news status', res.status);
  }
}

module.exports = News;
