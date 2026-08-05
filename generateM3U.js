const fs = require('fs');
const axios = require('axios');

async function generateM3U() {
  try {
    // 调用项目 API 获取直播源
    const res = await axios.get('http://api.hclyz.com:81/multi');
    const data = res.data;

    let m3u = '#EXTM3U\n';
    data.forEach(item => {
      m3u += `#EXTINF:-1, ${item.name}\n${item.url}\n`;
    });

    fs.writeFileSync('playlist.m3u', m3u);
    console.log('playlist.m3u 已生成');
  } catch (err) {
    console.error('生成失败:', err);
  }
}

generateM3U();
