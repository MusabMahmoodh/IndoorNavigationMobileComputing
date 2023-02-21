const KNN = require('ml-knn');
const {test_labels, test_data} = require('./data');

// import {weight_height} from'./data.js';

const noOfCols = 3;

async function getLocationPrediction() {
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

    console.log(test_data_set);
    const test_data_labels = test_labels.slice(0, 3);

    var knn = new KNN(train_data_set, train_data_labels, {k: 5}); // consider 2 nearest neighbors

    var ans = knn.predict(
      [
        0, 0, 0, 0, 0, 0, 0, 0, 0, -88, -79, -79, -81, -82, -77, 0, -88, -88, 0,
        0, -91, -91, 0, -78, -79, 0, -84, -89, 0, 0, -87, 0, -89, 0, 0, 0, 0, 0,
        0, 0, 0, -90, 0, 0, 0, 0, 0, 0, -85, 0, 0, 0, 0, -82, -82, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ].slice(0, noOfCols),
    );
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
