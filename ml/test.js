const KNN = require('ml-knn');
const tf = require('@tensorflow/tfjs');
// import {weight_height} from'./data.js';

const csvUrl = 'file://./data.csv';

const csvDataset = tf.data.csv(csvUrl, {
  columnConfigs: {
    grid: {
      isLabel: true,
    },
  },
});

async function getData() {
  var labels = [];
  var data_set = [];
  const dataset = await csvDataset.toArray();

  dataset.forEach(data => {
    labels.push(data.ys.grid);
    data_set.push(Object.values(data.xs));
  });

  return {labels, data_set};
}

getData();

async function testTrain() {
  const data = await getData();

  const size = data.data_set.length;

  const train_data_set = data.data_set.slice(3, size);
  const train_data_labels = data.labels.slice(3, size);

  const test_data_set = data.data_set.slice(0, 3);
  const test_data_labels = data.labels.slice(0, 3);

  var knn = new KNN(train_data_set, train_data_labels, {k: 3}); // consider 2 nearest neighbors

  var ans = knn.predict(data.data_set[191]);

  console.log(ans);
}

testTrain();
// classification result:
// ans = [ 0, 0, 1, 1 ]
// Based on the training data, the first two points of the test dataset are classified as "0" (type 0, perhaps),
// the third and fourth data points are classified as "1".
