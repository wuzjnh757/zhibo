import fs from 'fs';
import axios from 'axios';

async function generateM3U() {
  try {
    const res = await axios.get('http://api.hclyz.com:81/json.txt');
    console.log('API 返回数据:', res.data); // 调试输出

    const data = res.data;
    let m3u = '#EXTM3U\n';

    data.forEach(item => {
      if (item.url && (item.url.includes('.m3u8') || item.url.includes('.flv'))) {
        m3u += `#EXTINF:-1, ${item.name}\n${item.url}\n`;
      }
    });

    fs.writeFileSync('playlist.m3u', m3u);
    console.log('playlist.m3u 已生成');
  } catch (err) {
    console.error('生成失败:', err);
  }
}

generateM3U();
