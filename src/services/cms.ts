import axios from 'axios';

const cms = axios.create({
  baseURL: 'https://site.didoo.com.br/api/'
});

export default cms;