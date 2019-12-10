MongoClient = require("mongodb").MongoClient;

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
      project: { $eq: parseInt(thisProject) }
    })
    .toArray();
  texts.then(a => console.log(a));
  return texts;
};

module.exports.insertTexts = insertTexts;
module.exports.getUnannotatedTexts = getUnannotatedTexts;
