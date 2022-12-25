function CancelToken(executor) {
  // 声明变量，以便保存实例对象的resolve方法
  let resolvePromise;
  // 为实例对象添加promise属性
  this.promise = new Promise(resolve => {
    resolvePromise = resolve;
  });

  // 执行executor方法
  executor(function () {
    resolvePromise();
  });
}

CancelToken.source = function source() {
  let cancel;
  let token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token,
    cancel
  };
};

export { CancelToken };
