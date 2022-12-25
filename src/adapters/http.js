// node环境发送请求比较复杂，暂不实现
function httpAdapter(config) {
  return new Promise(resolve => {
    resolve('请求成功', config);
  });
}

export default httpAdapter;
