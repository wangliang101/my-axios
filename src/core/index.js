//构造函数
function Axios(config) {
  //初始化
  this.defaults = config; //为了创建 default 默认属性
  this.intercepters = {
    request: {},
    response: {}
  };
}
//原型添加相关的方法
Axios.prototype.request = function (config) {
  console.log('发送 AJAX 请求 请求的类型为 ' + config.method);
  // 创建一个promise对象
  const promise = Promise.resolve(config);
  // 声明一个数组
  const chains = [dispatchRequest, undefined];
  // 调用then方法执行 dispatchRequest 这个方法
  const result = promise.then(chains[0], chains[1]);
  // 返回最终结果
  return result;
};
Axios.prototype.get = function (config) {
  return this.request({ method: 'GET' });
};
Axios.prototype.post = function (config) {
  return this.request({ method: 'POST' });
};

function dispatchRequest(config) {
  console.log('dispatchRequest');
  return xhrAdapter(config).then(
    response => {
      // TODO 可以对返回内容做一些处理
      return response;
    },
    error => {
      throw error;
    }
  );
}

// TODO 兼容node环境发送请求
function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    // 初始化xhr实例
    const xhr = new XMLHttpRequest();
    // 初始化请求
    xhr.open(config.method, config.url);
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

function createInstance(defaultConfig) {
  // 实例化一个对象, 此时仅能通过context.get()调用方法,不支持context({method: get})
  const context = new Axios(defaultConfig);
  // 创建请求函数, 此时仅能通过context({method: get})调用方法 不支持context.get()
  const instance = Axios.prototype.request.bind(context);
  // 给instance添加Axios.prototype的get post request, 并让这些方法的this指向context
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context);
  });

  // 给instance添加context的dfaults、intercepters的属性
  Object.keys(context).forEach(key => {
    instance[key] = context[key];
  });

  return instance;
}

const axios = createInstance();

export { axios };
