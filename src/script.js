import http from 'k6/http';
import { sleep } from 'k6';
import { SharedArray } from 'k6/data';
import {
  randomString,
  uuidv4,
} from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export const options = {
  scenarios: {
    contacts: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 1
    },
  },
};

const data = new SharedArray('test data', function () {
  const f = JSON.parse(open('./../accounts.json'));
  return f;
});

export default function () {
  const emailAddress = `k6-${randomString(10)}@gmail.com`;
  console.log(`accounts=${emailAddress}|${uuidv4()}`);
  // console.log(`Vuser : ${__VU} - email: ${data[__VU - 1].email} `);
  // console.log(`Vuser : ${__VU} - person id: ${data[__VU - 1].personId}`);
  http.get('http://test.k6.io');
  sleep(1);
}
