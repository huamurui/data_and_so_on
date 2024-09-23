// callback hell with error handling

ajax('url1', (error, response1) => {
  if (error) {
    console.error('Error:', error);
  } else {
    const data1 = JSON.parse(response1);
    ajax('url2' + data1.id, (error, response2) => {
      if (error) {
        console.error('Error:', error);
      } else {
        const data2 = JSON.parse(response2);
        ajax('url3' + data2.id, (error, response3) => {
          if (error) {
            console.error('Error:', error);
          } else {
            const data3 = JSON.parse(response3);
            console.log('Final data:', data3);
          }
        });
      }
    });
  }
});
/* 
// split into separate functions
const fn1 = (callback) => {
  ajax('url1', callback);
}

const fn2 = (data1, callback) => {
  ajax('url2' + data1.id, callback);
}

const fn3 = (data2, callback) => {
  ajax('url3' + data2.id, callback);
}

fn1((error, response1) => {
  if (error) {
    console.error('Error:', error);
  } else {
    const data1 = JSON.parse(response1);
    fn2(data1, (error, response2) => {
      if (error) {
        console.error('Error:', error);
      } else {
        const data2 = JSON.parse(response2);
        fn3(data2, (error, response3) => {
          if (error) {
            console.error('Error:', error);
          } else {
            const data3 = JSON.parse(response3);
            console.log('Final data:', data3);
          }
        });
      }
    });
  }
});

 */
// Promise

ajax('url1')
.then(response1 => {
  const data1 = JSON.parse(response1);
  return ajax('url2' + data1.id);
})
.then(response2 => {
  const data2 = JSON.parse(response2);
  return ajax('url3' + data2.id);
})
.then(response3 => {
  const data3 = JSON.parse(response3);
  console.log('Final data:', data3);
})
.catch(error => {
  console.error('Error:', error);
});

// async/await

try {
  const response1 = await ajax('url1');
  const data1 = JSON.parse(response1);
  const response2 = await ajax('url2' + data1.id);
  const data2 = JSON.parse(response2);
  const response3 = await ajax('url3' + data2.id);
  const data3 = JSON.parse(response3);
  console.log('Final data:', data3);
} catch (error) {
  console.error('Error:', error);
}

// or split each step into a separate function
const fn1 = () => {
  return ajax('url1')
  .then(response1 => {
    const data1 = JSON.parse(response1);
    return data1;
  });
};

const fn2 = (data1) => {
  return ajax('url2' + data1.id)
  .then(response2 => {
    const data2 = JSON.parse(response2);
    return data2;
  });
}

const fn3 = (data2) => {
  return ajax('url3' + data2.id)
  .then(response3 => {
    const data3 = JSON.parse(response3);
    return data3;
  });
}

fn1().then(fn2).then(fn3).catch(error => {
  console.error('Error:', error);
});

// or use async/await

async function main() {
  try {
    const data1 = await fn1();
    const data2 = await fn2(data1);
    const data3 = await fn3(data2);
    console.log('Final data:', data3);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Promise

class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.error = undefined;
    this.onFulfilled = [];
    this.onRejected = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilled.forEach(fn => fn());
      }
    };

    const reject = (error) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.error = error;
        this.onRejected.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    return new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        try {
          const value = onFulfilled(this.value);
          resolve(value);
        } catch (error) {
          reject(error);
        }
      } else if (this.state === 'rejected') {
        try {
          const value = onRejected(this.error);
          resolve(value);
        } catch (error) {
          reject(error);
        }
      } else {
        this.onFulfilled.push(() => {
          try {
            const value = onFulfilled(this.value);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
        this.onRejected.push(() => {
          try {
            const value = onRejected(this.error);
            resolve(value);
          } catch (error) {
            reject(error);
          }
        });
      }
    });
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }
}


// state machine


// Promise 封装 xhr

function ajax(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.responseText);
        } else {
          reject(new Error(xhr.statusText));
        }
      }
    };
    xhr.send();
  });
}