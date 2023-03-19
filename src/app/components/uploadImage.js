import { Icon } from '@mui/material';
import { pink } from '@mui/material/colors';
import React from 'react'

export default function UploadImage({ image, setImage, setImageObject, error, customStyle }) {
  const roundedBoxUpload = {
    width: "20rem",
    height: "20rem",
    borderRadius: "100%"
  }
 
  const style = {
   // backgroundImage: image ? `url(${image})` : "",
    border: error ? "1px red solid" : "",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center"
  }

  customStyle ? Object.assign(style, customStyle) : Object.assign(style, roundedBoxUpload)

  return (
    <label
      htmlFor="button-file"
      style={style}
      className={`productImageUpload flex items-center justify-center relative overflow-hidden cursor-pointer shadow hover:shadow-lg`}
    >
      <input
        accept="image/*"
        className="hidden"
        id="button-file"
        type="file"
        onChange={async (e) => {
          function readFileAsync() {
            return new Promise((resolve, reject) => {
              const file = e.target.files[0];
              setImageObject(file)
              if (!file) { return; }
              const reader = new FileReader();
              reader.onload = () => {
                resolve({
                  url: `data:${file.type};base64,${btoa(reader.result)}`,
                  type: 'image',
                });
              };
              reader.onerror = reject;
              reader.readAsBinaryString(file);
            });
          }

          const newImage = await readFileAsync();
          setImage(newImage.url)
        }}
      />
      {image === undefined && <Icon fontSize="large" sx={{ color: error ? pink[500] : "action" }}>
        cloud_upload
      </Icon>}
      {image !== undefined &&  
        <img style={style} src={image}/>
      }
    </label>
  )
}
