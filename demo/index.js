import { axios as axiosT } from '../src';
import axios from 'axios';

// axios.interceptors.request.use(
//   function one(config) {
//     console.log('请求拦截器 成功 - 1号');
//     return config;
//   },
//   function one(error) {
//     console.log('请求拦截器 失败 - 1号');
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.request.use(
//   function two(config) {
//     console.log('请求拦截器 成功 - 2号');
//     return config;
//   },
//   function two(error) {
//     console.log('请求拦截器 失败 - 2号');
//     return Promise.reject(error);
//   }
// );

// // 设置响应拦截器
// axios.interceptors.response.use(
//   function (response) {
//     console.log('响应拦截器 成功 1号');
//     return response;
//   },
//   function (error) {
//     console.log('响应拦截器 失败 1号');
//     return Promise.reject(error);
//   }
// );

// axios.interceptors.response.use(
//   function (response) {
//     console.log('响应拦截器 成功 2号');
//     return response;
//   },
//   function (error) {
//     console.log('响应拦截器 失败 2号');
//     return Promise.reject(error);
//   }
// );
// axios({
//   method: 'GET',
//   url: '/api/posts'
// }).then(response => {
//   console.log(response);
// });

// axiosT.interceptors.request.use(
//   function one(config) {
//     console.log('请求拦截器T 成功 - 1号');
//     return config;
//   },
//   function one(error) {
//     console.log('请求拦截器T 失败 - 1号');
//     return Promise.reject(error);
//   }
// );

// axiosT.interceptors.request.use(
//   function two(config) {
//     console.log('请求拦截器T 成功 - 2号');
//     return config;
//   },
//   function two(error) {
//     console.log('请求拦截器T 失败 - 2号');
//     return Promise.reject(error);
//   }
// );

// // 设置响应拦截器
// axiosT.interceptors.response.use(
//   function (response) {
//     console.log('响应拦截器T 成功 1号');
//     return response;
//   },
//   function (error) {
//     console.log('响应拦截器T 失败 1号');
//     return Promise.reject(error);
//   }
// );

// axiosT.interceptors.response.use(
//   function (response) {
//     console.log('响应拦截器T 成功 2号');
//     return response;
//   },
//   function (error) {
//     console.log('响应拦截器T 失败 2号');
//     return Promise.reject(error);
//   }
// );

// axiosT({
//   method: 'GET',
//   url: 'http://localhost:3005/posts'
// }).then(response => {
//   console.log(response);
// });

const CancelToken = axiosT.CancelToken;
const source = CancelToken.source();

// let cancel = null;

const [sendBtu] = document.getElementsByClassName('send');

sendBtu.addEventListener('click', () => {
  console.log('点击了发送');
  // if (cancel !== null) {
  //   cancel();
  //   cancel = null;
  // }

  axiosT({
    method: 'GET',
    url: '/api/posts',
    cancelToken: source.token
  }).then(response => {
    console.log(response);
  });
});

const [cancleBtu] = document.getElementsByClassName('cancel');

cancleBtu.addEventListener('click', () => {
  console.log('点击了取消');
  // if (cancel) {
  //   cancel();
  //   cancel = null;
  // }
  source.cancel();
});
