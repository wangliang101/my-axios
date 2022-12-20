console.log('1: script start');

setTimeout(function () {
  console.log('2: setTimeout');
}, 0);

Promise.resolve()
  .then(function () {
    console.log('3: promise1');
    process.nextTick(() => {
      console.log('4: nextTick in promise');
    });
    setTimeout(function () {
      console.log('5: setTimeout in promise');
    }, 0);
  })
  .then(function () {
    console.log('6: promise2');
  });

process.nextTick(() => {
  console.log('7: nextTick');
});

console.log('8: script end');
