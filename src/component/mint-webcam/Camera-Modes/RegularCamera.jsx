import React, { useContext, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Camera } from "../Camera";
import classes from "./Camera.module.css";
import {
  getFileFromBase64,
  takePicture,
  switchCameraToRear,
  capitalizeFirstLetter,
} from "../Capture/Capture-script";
// icons
import { ReactComponent as IconCapture } from "../../../assets/imgs/capture-btn.svg";
import { ReactComponent as CameraSwitch } from "../../../assets/imgs/camera-switch.svg";
import { ReactComponent as CloseIcon } from "../../../assets/imgs/icon-close.svg";
// Context
import { GenContext } from "../../../gen-state/gen.context";

const RegularCamera = ({ regularCameraProps }) => {
  const webcamWrapper = useRef();

  const history = useHistory();

  const { dispatch } = useContext(GenContext);

  // stopwatch, set to 8 sec

  const {
    img,
    gif,
    toggle,
    webcamRef,
    handleSetState,
    webcam,
    video,
    gifGenrating,
    webcamCurrentType,
    displayedModes,
    attributes,
    toggleUpdate,
  } = regularCameraProps;

  const updpateMainBtn = (type) => {
    // picture record
    if (type === "Doubletake") {
      handleSetState({
        dualCam: true,
      });
    }
    handleSetState({
      webcamCurrentType: type,
    });
  };

  // proceed with the generated file to the mint page
  const continueToMint = () => {
    let name = new Date().valueOf();
    let file;
    if (img) {
      const result = getFileFromBase64(img, name, "image/png");
      file = result;
    }

    history.push("/mint/1of1");
  };

  // detect mobile device or a desktop
  const details = navigator?.userAgent;

  /* regular expression 
  containing some mobile devices keywords 
  to search it in details string */
  const regexp = /android|iphone|kindle|ipad/i;

  const isMobileDevice = regexp.test(details);

  return img || gif || video ? (
    <div className={classes.cameraWrapper}>
      {gifGenrating && <div className={classes.overlay} />}
      <div className={classes.cameraShot}>
        <div className={classes.closeBtn} onClick={() => toggleUpdate()}>
          <CloseIcon />
        </div>

        <img src={img} alt="camera-shot" />
      </div>

      {/*  */}
      <div className={classes.imgBtn}>
        <div
          className={classes.mintBtn}
          onClick={continueToMint}
          attributes={attributes}
        >
          Continue
        </div>
        <p
          className={classes.mintBtn}
          onClick={() => {
            handleSetState({
              img: "",
              activeFile: "Photo",
            });
          }}
        >
          Retake
        </p>
      </div>
    </div>
  ) : (
    <div className={classes.videoContainer}>
      <div className={classes.videoWrapper} ref={webcamWrapper}>
        {toggle ? (
          <Camera
            ref={webcamRef}
            aspectRatio="cover"
            errorMessages={{
              noCameraAccessible:
                "No camera device accessible. Please connect your camera or try a different browser.",
              permissionDenied:
                "Permission denied. Please refresh and give camera permission.",
              switchCamera:
                "It is not possible to switch camera to different one because there is only one video device accessible.",
              canvas: "Canvas is not supported.",
            }}
          />
        ) : (
          <div className={classes.videoOFF} />
        )}{" "}
      </div>
      <div className={classes.closeBtn} onClick={() => toggleUpdate()}>
        <CloseIcon />
      </div>
      {isMobileDevice && (
        <div
          className={classes.sideSwitch}
          onClick={() => switchCameraToRear(webcam, handleSetState, webcamRef)}
        >
          <CameraSwitch />
        </div>
      )}
      <div className={classes.btnWrapper}>
        {/* switch mode button */}
        <div
          onClick={() => updpateMainBtn(displayedModes[0].text)}
          className={classes.switchBtn}
          key={displayedModes[0].id}
        >
          {displayedModes[0].icon}
          <p>{displayedModes[0].text}</p>
        </div>

        {/* main button */}
        <div
          onClick={() => takePicture(webcamRef, handleSetState)}
          className={classes.mainBtn}
        >
          <IconCapture className={classes.captureBtn} />
          <p>{webcamCurrentType}</p>
        </div>
      </div>
    </div>
  );
};

export default RegularCamera;
