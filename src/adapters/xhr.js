// TODO 兼容node环境发送请求
function xhrAdapter(config) {
  console.log('config', config);
  return new Promise((resolve, reject) => {
    // 初始化xhr实例
    const xhr = new XMLHttpRequest();
    // 初始化请求
    xhr.open(config.method, config.url);

    // 取消请求处理
    if (config.cancelToken) {
      config.cancelToken.promise.then(() => {
        // 取消请求
        xhr.abort();
        // 讲promise状态改为失败
        reject(new Error('请求已被取消'));
      });
    }
    // 发送请求
    xhr.send();
    // 绑定事件
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve({
            // 初始配置
            config,
            // 响应体
            data: xhr.response,
            // 响应头
            headers: xhr.getAllResponseHeaders,
            // xhr请求对象
            request: xhr,
            // 响应状态码
            status: xhr.status,
            // 响应状态字符串
            statusText: xhr.statusText
          });
        } else {
          // 处理失败的情况
          reject(new Error(`请求发送失败,请求失败状态为：${xhr.status}`));
        }
      }
    };
  });
}

export default xhrAdapter;
