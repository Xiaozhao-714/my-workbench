const fetch = require('node-fetch');

const CONFIG = {
  readingKeywords: ['读书分享', '书评', '阅读方法', '好书推荐', '知识管理'],
  workKeywords: ['效率工具', '职场成长', '时间管理', 'AI工具', '个人成长'],
  bilibili: { cookie: '' }
};

async function fetchBilibiliSearch(keyword, page = 1) {
  const url = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(keyword)}&page=${page}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0', 'Cookie': CONFIG.bilibili.cookie } });
    const data = await res.json();
    if (data.code === 0 && data.data) {
      return data.data.result.slice(0, 10).map(v => ({
        title: v.title.replace(/<[^>]+>/g, ''),
        author: v.author,
        cover: v.pic,
        url: `https://www.bilibili.com/video/${v.bvid}`,
        play: v.play,
        danmaku: v.video_review,
        description: v.description,
        duration: v.duration,
        tag: v.tag,
        source: 'bilibili',
        category: 'video'
      }));
    }
  } catch (e) {}
  return [];
}

async function fetchBilibiliHot() {
  const url = 'https://api.bilibili.com/x/web-interface/ranking/v2?rid=0&day=3';
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data.code === 0 && data.data) {
      return data.data.list.slice(0, 20).map(v => ({
        title: v.title,
        author: v.owner.name,
        cover: v.pic,
        url: `https://www.bilibili.com/video/${v.bvid}`,
        play: v.stat.view,
        danmaku: v.stat.danmaku,
        description: v.desc,
        duration: v.duration,
        source: 'bilibili',
        category: 'video'
      }));
    }
  } catch (e) {}
  return [];
}

async function fetchZhihuHot() {
  const url = 'https://www.zhihu.com/api/v3/hot/topics?limit=10';
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data && data.data) {
      return data.data.slice(0, 10).map(t => ({
        title: t.name,
        url: t.url,
        excerpt: t.introduction,
        source: 'zhihu',
        category: 'article'
      }));
    }
  } catch (e) {}
  return [];
}

async function fetchWeiboHot() {
  const url = 'https://weibo.com/ajax/side/hotSearch';
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if (data && data.data && data.data.realtime) {
      return data.data.realtime.slice(0, 10).map(t => ({
        title: t.word,
        url: `https://s.weibo.com/weibo?q=${encodeURIComponent(t.word)}`,
        hot: t.num,
        source: 'weibo',
        category: 'topic'
      }));
    }
  } catch (e) {}
  return [];
}

function getDemoData(type) {
  const demo = {
    reading: [
      { title: '如何高效阅读一本书？3个方法让你读得更深', author: '读书达人', cover: 'https://picsum.photos/300/200', url: 'https://www.bilibili.com', play: 120000, danmaku: 800, description: '分享高效阅读的方法和技巧', duration: 600, source: 'demo', category: 'video' },
      { title: '2024年必读的10本好书推荐', author: '书单君', cover: 'https://picsum.photos/300/200', url: 'https://www.bilibili.com', play: 89000, danmaku: 500, description: '年度好书推荐清单', duration: 480, source: 'demo', category: 'video' },
      { title: '读书笔记怎么做？康奈尔笔记法详解', author: '学习方法论', cover: 'https://picsum.photos/300/200', url: 'https://www.bilibili.com', play: 56000, danmaku: 300, description: '康奈尔笔记法在读书中的应用', duration: 720, source: 'demo', category: 'video' }
    ],
    work: [
      { title: '5个效率工具让你的工作效率翻倍', author: '效率专家', cover: 'https://picsum.photos/300/200', url: 'https://www.bilibili.com', play: 200000, danmaku: 1200, description: '提升工作效率的实用工具', duration: 540, source: 'demo', category: 'video' },
      { title: 'AI时代如何提升职场竞争力', author: '职场导师', cover: 'https://picsum.photos/300/200', url: 'https://www.bilibili.com', play: 150000, danmaku: 900, description: 'AI时代的职场生存指南', duration: 660, source: 'demo', category: 'video' },
      { title: '时间管理的终极方法：番茄工作法进阶', author: '时间管理师', cover: 'https://picsum.photos/300/200', url: 'https://www.bilibili.com', play: 98000, danmaku: 600, description: '番茄工作法的高级应用技巧', duration: 420, source: 'demo', category: 'video' }
    ],
    hot: [
      { title: '今日热点话题汇总', url: 'https://weibo.com', hot: 999999, source: 'demo', category: 'topic' },
      { title: '科技行业最新动态', url: 'https://www.zhihu.com', excerpt: 'AI技术最新进展分析', source: 'demo', category: 'article' },
      { title: '社会关注焦点事件', url: 'https://weibo.com', hot: 888888, source: 'demo', category: 'topic' }
    ]
  };
  return demo[type] || [];
}

module.exports = { CONFIG, fetchBilibiliSearch, fetchBilibiliHot, fetchZhihuHot, fetchWeiboHot, getDemoData };
