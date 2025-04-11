import Resizer from "react-image-file-resizer";
export const resizeImage = (file) => {
  return new Promise((resoLve, reject) => {
    Resizer.imageFileResizer(
      file,
      720,
      720,
      "JPEG",
      100,
      0,
      (data) => resoLve(data),
      "base64",
      (error) => reject(error)
    );
  });
};
