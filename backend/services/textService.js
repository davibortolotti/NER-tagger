var textStore = require("../store/textStore");

const exportProjectTextsAsJsonDataturks = projectId => {
  return textStore.getAllProjectTexts(projectId).then(texts => {
    // console.log(texts);
    exportableTexts = [];
    texts.forEach(element => {
      var annotationList = createDataturksAnnotationList(element);
      exportableTexts.push({
        content: element.text,
        annotation: annotationList
      });
    });
    convertToString(exportableTexts);
    return lines;
  });
};

const createDataturksAnnotationList = entry => {
  annotationList = [];
  if (entry.annotations) {
    entry.annotations.forEach(originalAnnotation => {
      dataturksAnnotation = convertAnnotationToDataturksFormat(
        originalAnnotation,
        entry.text
      );
      annotationList.push(dataturksAnnotation);
    });
  }
  return annotationList;
};

const convertAnnotationToDataturksFormat = (originalAnnotation, content) => {
  var annotation = {};
  annotation.label = [originalAnnotation.type];
  var points = [];
  var start = originalAnnotation.start;
  var end = originalAnnotation.end;
  points.push({
    start,
    end: end - 1,
    text: content.slice(start, end)
  });
  annotation.points = points;
  return annotation;
};

const convertToString = exportableTexts => {
  lines = "";
  exportableTexts.forEach(obj => {
    stringText = JSON.stringify(obj);
    lines = lines.concat(stringText).concat("\n");
  });
};
module.exports = {
  exportProjectTextsAsJsonDataturks
};
// {"content":"cd players and tuners","annotation":[{"label":["Category"],"points":[{"start":0,"end":1,"text":"cd"}]},{"label":["Category"],"points":[{"start":3,"end":9,"text":"players"}]},{"label":["Category"],"points":[{"start":15,"end":20,"text":"tuners"}]}],"extras":{"Name":"columnName","Class":"ColumnValue"}}
