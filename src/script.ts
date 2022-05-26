import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';

export const options = {
  vus: 1,
  duration: '10s',
};

const data = new SharedArray('some name', function () {
  const f = JSON.parse(open('./../accounts.json'));
  return f; // f must be an array
});

export default function () {
  console.log(`Vuser : ${__VU}. Data : ${data[__VU - 1]}`);
  http.get('http://test.k6.io');
  sleep(1);
}
