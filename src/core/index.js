import { defaults } from '../defaults';
import { dispatchRequest } from './dispatchRequest';
import { CancelToken } from '../cancel';

//构造函数
function Axios(config) {
  //初始化
  this.defaults = config; //为了创建 default 默认属性
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
//原型添加相关的方法
Axios.prototype.request = function (config) {
  console.log('发送 AJAX 请求 请求的类型为 ' + config.method);
  // 合并默认config和传入config
  const newConfig = { ...this.defaults, ...config };
  // 创建一个promise对象
  let promise = Promise.resolve(newConfig);
  // 声明一个数组
  const chains = [dispatchRequest, undefined];
  console.log('this xx', this);
  console.dir(this);
  // 将interceptors.request的请求拦截器放在chains队头
  this.interceptors.request.handlers.forEach(({ fulfilled, rejected }) => {
    chains.unshift(fulfilled, rejected);
  });
  // 将interceptors.response的响应拦截器放在chains队尾
  this.interceptors.response.handlers.forEach(({ fulfilled, rejected }) => {
    chains.push(fulfilled, rejected);
  });
  while (chains.length > 0) {
    promise = promise.then(chains.shift(), chains.shift());
  }
  // // 调用then方法执行 dispatchRequest 这个方法
  // const result = promise.then(chains[0], chains[1]);
  // 返回最终结果
  return promise;
};
Axios.prototype.get = function (config) {
  return this.request({ method: 'GET' });
};
Axios.prototype.post = function (config) {
  return this.request({ method: 'POST' });
};

function InterceptorManager() {
  this.handlers = [];
}

InterceptorManager.prototype.use = function (fulfilled, rejected) {
  this.handlers.push({
    fulfilled,
    rejected
  });
};

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

const axios = createInstance(defaults);

axios.CancelToken = CancelToken;

export { axios };
