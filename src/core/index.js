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
};
Axios.prototype.get = function (config) {
  return this.request({ method: 'GET' });
};
Axios.prototype.post = function (config) {
  return this.request({ method: 'POST' });
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

const axios = createInstance();

export { axios };
