import axios from 'axios';

const cms = axios.create({
  baseURL: 'http://codewriters.space/didoo-cms/api/'
});

export default cms;