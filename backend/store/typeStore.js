MongoClient = require("mongodb").MongoClient;
ObjectID = require("mongodb").ObjectId;

MongoClient.connect("mongodb://192.168.99.102:27017/", function(err, database) {
  if (err) {
    throw err;
  }
  console.log("Connected to mongodb");
  db = database.db("tagger");
});

const getAllProjectTypes = projectId => {
  types = db
    .collection("types")
    .find({ project: projectId })
    .toArray();
  return types;
};

const createType = newType => {
  db.collection("types").insertOne(newType);
};

const deleteType = typeId => {
  console.log("deleting ", typeId);
  db.collection("types").deleteOne({ _id: new ObjectID(typeId) });
};

module.exports = {
  getAllProjectTypes: getAllProjectTypes,
  createType: createType,
  deleteType: deleteType
};
