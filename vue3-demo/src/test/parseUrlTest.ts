import { parseUrl } from '@/commons';

// const urlSearch = '?name=盖伦&age=12&sex=male&girl=皇子&girl=蛮王&girl=赵信&code=&=what&=why';
const urlSearch = 'chrome://blank/?name=盖伦&age=12&sex=male&girl=皇子&girl=蛮王&girl=赵信&code=&=what&=why';
console.log('parseUrl params', parseUrl(urlSearch));

// parseUrl(location.search); // ["name=elephant", "age=25", "sex=male"]
