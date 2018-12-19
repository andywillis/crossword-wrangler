export function isMobile() {
  const ua = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
    return true;
  }
  return false;
}

export function getDeviceDimensions() {
  return {
    deviceWidth: document.documentElement.clientWidth,
    deviceHeight: document.documentElement.clientHeight
  };
}
