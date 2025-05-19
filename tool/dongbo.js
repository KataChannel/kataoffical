const fs = require('fs');
const fuzz = require('fuzzball');

// Đọc file JSON
const rawData = fs.readFileSync('dulieucannhomlai.json');
const data = JSON.parse(rawData);

// Hàm đồng bộ giavon theo title tương tự và chênh lệch giavon
function syncGiavonBySimilarTitle(data, similarityThreshold = 90, giavonThreshold = 100000) {
  const groups = [];
  const usedIndices = new Set();

  // Nhóm các bản ghi
  for (let i = 0; i < data.length; i++) {
    if (usedIndices.has(i)) continue;

    const current = data[i];
    const group = [current];
    usedIndices.add(i);

    for (let j = i + 1; j < data.length; j++) {
      if (usedIndices.has(j)) continue;

      const other = data[j];
      // So sánh tất cả cặp title
      const titleSim1 = fuzz.ratio(current.title, other.title);
      const titleSim2 = fuzz.ratio(current.title, other.title2);
      const titleSim3 = fuzz.ratio(current.title2, other.title);
      const titleSim4 = fuzz.ratio(current.title2, other.title2);

      // Kiểm tra độ tương đồng
      const isSimilar = (
        titleSim1 >= similarityThreshold ||
        titleSim2 >= similarityThreshold ||
        titleSim3 >= similarityThreshold ||
        titleSim4 >= similarityThreshold
      );

      // Kiểm tra chênh lệch giavon
      const giavonDiff = Math.abs(parseInt(current.giavon) - parseInt(other.giavon));
      const isGiavonClose = giavonDiff <= giavonThreshold;

      if (isSimilar && isGiavonClose) {
        group.push(other);
        usedIndices.add(j);
      }
    }

    if (group.length > 0) {
      groups.push(group);
    }
  }

  // Đồng bộ giavon trong mỗi nhóm
  const syncedData = [];
  for (const group of groups) {
    const standardGiavon = group[0].giavon;
    group.forEach(item => {
      syncedData.push({
        ...item,
        giavon: standardGiavon,
      });
    });
  }

  return syncedData;
}

// Thực thi đồng bộ
const result = syncGiavonBySimilarTitle(data, 90, 100000);
console.log(result);

// Lưu kết quả vào file mới
fs.writeFileSync('dulieucannhomlai_synced.json', JSON.stringify(result, null, 2));