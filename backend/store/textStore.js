MongoClient = require("mongodb").MongoClient;
ObjectID = require("mongodb").ObjectId;

MongoClient.connect("mongodb://192.168.99.102:27017/", function(err, database) {
  if (err) {
    throw err;
  }
  console.log("Connected to mongodb");
  db = database.db("tagger");
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

const getTextFromId = id => {
  text = db.collection("texts").findOne({
    _id: new ObjectID(id)
  });
  return text;
};

const getAllProjectTextsIds = projectId => {
  text = db.collection("texts").distinct("_id", { project: projectId });
  return text;
};

const getAllProjectTexts = projectId => {
  text = db
    .collection("texts")
    .find({})
    .project({ _id: 0, project: 0 })
    .toArray();
  return text;
};

const updateText = (id, newText) => {
  newText._id = new ObjectID(id);
  text = db.collection("texts").replaceOne(
    {
      _id: newText._id
    },
    newText
  );
  return text;
};

const deleteFromType = async (projectId, typeId) => {
  console.log(typeId);
  db.collection("types")
    .findOne({
      _id: new ObjectID(typeId)
    })
    .then(type => {
      db.collection("texts").update(
        {
          project: projectId
        },
        { $pull: { annotations: { type: type.type.toUpperCase() } } },
        { multi: true },
        (err, doc) => {
          console.log(err);
        }
      );
    });
};

module.exports = {
  deleteFromType,
  insertTexts,
  updateText,
  getAllProjectTexts,
  getAllProjectTextsIds,
  getRandomUnannotatedText,
  getTextFromId,
  getUnannotatedTexts
};
