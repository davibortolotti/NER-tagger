MongoClient = require("mongodb").MongoClient;
ObjectID = require("mongodb").ObjectId;

MongoClient.connect("mongodb://192.168.99.100:27017/", function(err, database) {
  if (err) {
    throw err;
  }
  console.log("Connected to mongodb");
  db = database.db("texts");
});

const insertTexts = texts => {
  db.collection("texts").insertMany(texts);
};

const getUnannotatedTexts = thisProject => {
  texts = db
    .collection("texts")

    .find({
      project: parseInt(thisProject)
    })
    .toArray();
  texts.then(a => console.log(a));
  return texts;
};

const getRandomUnannotatedText = thisProject => {
  text = db
    .collection("texts")

    .aggregate([
      {
        $match: {
          project: parseInt(thisProject)
          // annotations: { $exists: true }
        }
      },
      {
        $sample: { size: 1 }
      }
    ])
    .toArray();
  text.then(a => console.log(a));
  return text;
};

const updateText = (id, newText) => {
  // newText.id = id;
  text = db.collection("texts").replaceOne(
    {
      _id: new ObjectID(id)
    },
    newText
  );
  return text;
};

module.exports = {
  insertTexts: insertTexts,
  getUnannotatedTexts: getUnannotatedTexts,
  getRandomUnannotatedText: getRandomUnannotatedText,
  updateText: updateText
};
