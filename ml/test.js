const KNN = require('ml-knn');
const {test_labels, test_data} = require('./data');

// import {weight_height} from'./data.js';

async function getLocationPrediction() {
  try {
    console.log(test_data.slice(0, 2));
    console.log(test_labels.slice(0, 2));
    const size = test_data.length;

    const train_data_set = test_data.slice(3, size);
    const train_data_labels = test_labels.slice(3, size);

    const test_data_set = test_data.slice(0, 3);
    const test_data_labels = test_labels.slice(0, 3);

    var knn = new KNN(train_data_set, train_data_labels, {k: 3}); // consider 2 nearest neighbors

    var ans = knn.predict(train_data_set[134]);
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
