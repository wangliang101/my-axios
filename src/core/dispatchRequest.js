import { defaults } from '../defaults';

function dispatchRequest(config) {
  console.log('dispatchRequest', defaults.adapter);
  var adapter = config.adapter || defaults.adapter;
  return adapter(config).then(
    response => {
      // TODO 可以对返回内容做一些处理
      return response;
    },
    error => {
      throw error;
    }
  );
}

export { dispatchRequest };
