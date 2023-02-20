import * as tf from '@tensorflow/tfjs';

async function createFingerprintMap() {
  // Load collected data from database
  const data = await loadDataFromDatabase();

  // Split data into features (WiFi signal strength) and labels (location)
  const features = data.map(item => item.strength);
  const labels = data.map(item => item.location);

  // Convert features and labels to tensors
  const xs = tf.tensor2d(features, [features.length, 1]);
  const ys = tf.tensor2d(labels, [labels.length, 1]);

  // Create KNN classifier
  const classifier = tf.nearestNeighborClassifier(xs, ys);

  // Train classifier
  await classifier.train();

  // Save classifier to file or database
  await classifier.save('file://fingerprint-map');
}

// Function to load data from database
async function loadDataFromDatabase() {
  try {
    // Connect to database
    const db = await connectToDatabase();

    // Query data from database
    const results = await db.executeSql('SELECT * FROM wifi_data');

    // Extract data from results
    const data = [];
    for (let i = 0; i < results[0].rows.length; i++) {
      data.push({
        strength: results[0].rows.item(i).strength,
        location: results[0].rows.item(i).location,
      });
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}
