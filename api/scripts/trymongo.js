require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.DB_URL || 'mongodb+srv://aditi:mongo123@self-learn-cluster.df4am.mongodb.net/issuetracker?retryWrites=true';

function testWithCallbacks(callback) {
  console.log('\n--- testWithCallbacks --- ');

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  client.connect((connectErr) => {
    if (connectErr) {
      callback(connectErr);
      return;
    }
    console.log('Connected to MongoDB URL :', url);

    const db = client.db();
    const collection = db.collection('employees');

    const employee = { id: 1, name: 'A. callback', age: 23 };
    collection.insertOne(employee, (insertErr, result) => {
      if (insertErr) {
        client.close();
        callback(insertErr);
        return;
      }
      console.log('Result of insert: \n', result.insertedId);
      collection.find({ _id: result.insertedId })
        .toArray((findErr, docs) => {
          if (findErr) {
            client.close();
            callback(findErr);
            return;
          }
          console.log('Result of find: \n', docs);
          client.close();
          callback();
        });
    });
  });
}

const testWithAsync = async () => {
  console.log('\n--- testWithAsync --- ');

  const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    console.log('Connected to MongoDB URL :', url);
    const db = client.db();
    const collection = db.collection('employees');

    const employee = { id: 2, name: 'B. Async', age: 16 };
    const result = await collection.insertOne(employee);
    console.log('Result of insert:\n', result.insertedId);

    const docs = await collection.find({ _id: result.insertedId })
      .toArray();

    console.log('Result of find:\n', docs);
  } catch (err) {
    console.log(err);
  } finally {
    client.close();
  }
};

testWithCallbacks((err) => {
  if (err) {
    console.log(err);
  }
  testWithAsync();
});
