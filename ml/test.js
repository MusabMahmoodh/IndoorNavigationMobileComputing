const KNN = require('ml-knn');
const {test_labels, test_data} = require('./data');

// import {weight_height} from'./data.js';

const noOfCols = 20;

async function getLocationPrediction(currentWifiStrengths) {
  try {
    const size = test_data.length;

    const train_data_set = test_data
      // .slice(3, size)
      .map(item => item.slice(0, noOfCols));
    const train_data_labels = test_labels;
    // .map(item => item.slice(0, noOfCols));

    const test_data_set = test_data
      .slice(0, 3)
      .map(item => item.slice(0, noOfCols));

    const test_data_labels = test_labels.slice(0, 3);

    var knn = new KNN(train_data_set, train_data_labels, {k: 5}); // consider 2 nearest neighbors

    var ans = knn.predict(currentWifiStrengths.slice(0, noOfCols));
    console.log('ans =', ans);
    return ans;
  } catch (e) {
    console.log('Error', e);
  }
}

getLocationPrediction();
module.exports = {getLocationPrediction};

// classification result:
// ans = [ 0, 0, 1, 1 ]
// Based on the training data, the first two points of the test dataset are classified as "0" (type 0, perhaps),
// the third and fourth data points are classified as "1".
