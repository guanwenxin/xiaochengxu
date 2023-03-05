const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

function getImageBase64(filePath) {
  const fm = wx.getFileSystemManager();
  const base64 = fm.readFileSync(filePath, 'base64')
  // 图片必须要有扩展名
  const imgType = filePath.split('.')[1]
  return `data:image/${imgType};base64,${base64}`
}

module.exports = {
  formatTime,
  getImageBase64
}
