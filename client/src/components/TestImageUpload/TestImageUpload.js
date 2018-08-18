import React from "react";
import "./TestImageUpload.css";

const TestImageUpload = props => (
  <form id="leaf-submit" method="post" encType="multipart/form-data" onChange={props.fileChangedHandler}>
      <div className="form-group photo">
        <label id="upload" htmlFor="FormControl">Upload your photo</label>
        <input type="file" className="form-control-file" accept="image/*" id="FormControl" onChange={props.onSelectFile}/>
        <input type="submit" value="Upload" onClick={props.handleImageUpload} style={{display: props.displaySubmit}} id="uploadButton"/>
        <input type="submit" onClick={props.cropImage} style={{display: props.displayCropButton}} value="Crop" id="cropButton" />
      </div>
    </form>
);
  
export default TestImageUpload;
