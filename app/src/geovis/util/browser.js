export default function() {
  let width;
  let height;
  if (window.innerWidth) {
    width = window.innerWidth;
  } else if (document.body && document.body.clientWidth) {
    width = document.body.clientWidth;
  }
  if (window.innerHeight) {
    height = window.innerHeight;
  } else if (document.body && document.body.clientHeight) {
    height = document.body.clientHeight;
  }
  const w2h = width / height;
  if (w2h < 1) {
    return { isCross: false, wid: width, hei: height };
  } else {
    return { isCross: true, wid: width, hei: height };
  }
}

export function openNewWindow(url) {
  window.open(url, "_blank", "name='123';height=100%;width=100%;");
}

export function deepCopy(target) {
  const copyedObjs = []; //此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
  function _deepCopy(target) {
    if (typeof target !== "object" || !target) {
      return target;
    }
    for (let i = 0; i < copyedObjs.length; i++) {
      if (copyedObjs[i].target === target) {
        return copyedObjs[i].copyTarget;
      }
    }
    let obj = {};
    if (Array.isArray(target)) {
      obj = []; //处理target是数组的情况
    }
    copyedObjs.push({ target: target, copyTarget: obj });
    Object.keys(target).forEach(key => {
      if (obj[key]) {
        return;
      }
      obj[key] = _deepCopy(target[key]);
    });
    return obj;
  }
  return _deepCopy(target);
}
