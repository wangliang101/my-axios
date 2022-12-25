import xhrAdapter from '../adapters/xhr';
import httpAdapter from '../adapters/xhr';

function getDefaultAdapter() {
  let adapter;
  if (typeof XMLHttpRequest !== undefined) {
    adapter = xhrAdapter;
  } else if (
    typeof process !== undefined &&
    Object.prototype.toString.call(process) === '[object process]'
  ) {
    adapter = httpAdapter;
  }
  return adapter;
}

const defaults = {
  adapter: getDefaultAdapter(),
  timeout: 0
};
export { defaults };
