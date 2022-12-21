import { axios as axiosT } from '../src';
import axios from 'axios';

axios({
  method: 'GET',
  url: 'http://localhost:3005/posts'
}).then(response => {
  console.log(response);
});

axiosT({
  method: 'GET',
  url: 'http://localhost:3005/posts'
}).then(response => {
  console.log(response);
});
