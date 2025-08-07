import {
  environment
} from "./chunk-U3IXXJDR.js";

// src/app/shared/utils/shared.utils.ts
function GetImage(data) {
  if (data) {
    const checkhttp = data?.toLowerCase().includes("http");
    const result = checkhttp ? data : `${environment.ImageURL + data}`;
    return result;
  } else {
    return environment.ImageURL + "assets/image/logo.svg";
  }
}
function ConvertDriveData(data) {
  const keys = data[0];
  const convertedData = data.slice(2).map((row) => {
    return row.reduce((acc, value, index) => {
      const key = keys[index];
      acc[key] = value === "null" ? null : value;
      return acc;
    }, {});
  });
  return convertedData;
}
function ConvertDriveColumnName(data) {
  const convertedData = data[0].reduce((acc, key, index) => {
    acc[key] = data[1][index];
    return acc;
  }, {});
  return convertedData;
}
function convertToSlug(str) {
  return str.toLowerCase().replace(/ /g, "-").replace(/[àáảạãâầấẩậẫăằắẳặẵ]/g, "a").replace(/[èéẻẹẽêềếểệễ]/g, "e").replace(/[ìíỉịĩ]/g, "i").replace(/[òóỏọõôồốổộỗơờớởợỡ]/g, "o").replace(/[ùúủụũưừứửựữ]/g, "u").replace(/[ỳýỷỵỹ]/g, "y").replace(/đ/g, "d").replace(/[^a-z0-9-]/g, "");
}
function GenId(length, onlynumber = true) {
  let result = "";
  let characters = "";
  if (onlynumber) {
    characters = "0123456789";
  } else {
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  }
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export {
  GetImage,
  ConvertDriveData,
  ConvertDriveColumnName,
  convertToSlug,
  GenId
};
//# sourceMappingURL=chunk-657A73EG.js.map
