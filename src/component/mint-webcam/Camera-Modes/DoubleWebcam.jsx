import React, { useEffect, useContext, useRef, useState } from "react";
import classes from "./Camera.module.css";
import {
  switchCameraToRear,
  getFileFromBase64,
} from "../Capture/Capture-script";
import { Camera } from "../Camera";
import AddressCard from "../../AddressCard/AddressCard";
import Hypnosis from "../Hypnosis-Loader/Hypnosis";
// icons
import { ReactComponent as IconCapture } from "../../../assets/imgs/capture-btn.svg";
import { ReactComponent as CameraSwitch } from "../../../assets/imgs/camera-switch.svg";
import { ReactComponent as CloseIcon } from "../../../assets/imgs/icon-close.svg";
// Context
import { GenContext } from "../../../gen-state/gen.context";
import { setPOSdetails } from "../../../gen-state/gen.actions";

const DoubleWebcam = ({ doubleCameraProps }) => {
  const imgContainer = useRef();
  const frontCamera = useRef();
  const rearCamera = useRef();

  const [toggleAddressCard, setToggleAddressCard] = useState(false);

  const { dispatch, posDetails } = useContext(GenContext);

  const {
    img,
    faceImg,
    toggle,
    webcamRef,
    handleSetState,
    webcam,
    loaderToggle,
    displayedModes,
    toggleUpdate,
  } = doubleCameraProps;

  const takePicture = () => {
    const imageSrc = webcamRef.current.takePhoto();

    handleSetState({ img: imageSrc });
    switchCameraToRear(webcam, handleSetState, webcamRef);
  };

  useEffect(() => {
    if (img && webcamRef.current) {
      handleSetState({
        loaderToggle: true,
      });
      setTimeout(() => {
        handleSetState({
          loaderToggle: false,
        });
        const imageSrc = webcamRef.current.takePhoto();

        handleSetState({ faceImg: imageSrc });
      }, 5000);
    }
  }, [img]);

  const continueToMint = (image) => {
    const name = new Date().valueOf();
    const result = getFileFromBase64(image, name, "image/png");

    dispatch(
      setPOSdetails({
        addresses: posDetails.addresses,
        img: result,
      })
    );
    setToggleAddressCard(true);
  };

  const combineImage = () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img1 = new Image();
    const img2 = new Image();

    img1.onload = function () {
      canvas.width = rearCamera.current.clientWidth;
      canvas.height = rearCamera.current.clientHeight;
      img2.src = faceImg;
    };
    img2.onload = function () {
      context.drawImage(
        img1,
        0,
        0,
        rearCamera.current.clientWidth,
        rearCamera.current.clientHeight
      );
      context.drawImage(
        img2,
        16,
        16,
        frontCamera.current.clientWidth,
        frontCamera.current.clientHeight
      );
      continueToMint(canvas.toDataURL());
    };

    img1.src = img;
  };

  const switchMode = (type) =>
    handleSetState({
      dualCam: false,
      webcamCurrentType: type,
    });

  return img && faceImg ? (
    <div className={classes.cameraWrapper}>
      <div ref={imgContainer} className={classes.cameraShot}>
        <div className={classes.closeBtn} onClick={() => toggleUpdate()}>
          <CloseIcon />
        </div>

        <img
          src={faceImg}
          className={classes.faceImg}
          alt="camera-shot"
          ref={frontCamera}
        />
        <img
          className={classes.rearImg}
          src={img}
          alt="camera-shot"
          ref={rearCamera}
        />
      </div>
      {toggleAddressCard ? (
        <AddressCard
          toggleUpdate={toggleUpdate}
          setToggleAddressCard={setToggleAddressCard}
        />
      ) : (
        <div className={classes.imgBtn}>
          <div className={classes.mintBtn} onClick={combineImage}>
            Continue
          </div>
          <p
            className={classes.mintBtn}
            onClick={() => {
              handleSetState({
                img: "",
                faceImg: "",
                activeFile: "Photo",
              });
            }}
          >
            Retake
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className={classes.videoContainer}>
      <div
        className={`${classes.videoWrapper} ${img ? classes.frontCamera : ""}`}
      >
        {toggle && (
          <Camera
            facingMode="environment"
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
        )}

        {/* {img && <img className={`${classes.cameraShot}`} src={img} alt="camera-shot" />} */}
        {loaderToggle && (
          <div className={classes.loader}>
            <Hypnosis width="4rem" height="4rem" />
            <p>Don't move and keep smiling</p>
          </div>
        )}
        {img && (
          <img
            className={classes.rearImg}
            src={img}
            alt="camera-shot"
            ref={rearCamera}
          />
        )}
        <div
          className={`${classes.videoOFF} ${toggle ? classes.disabled : ""}`}
        />
      </div>
      <div className={classes.closeBtn} onClick={() => toggleUpdate()}>
        <CloseIcon />
      </div>
      <div
        className={classes.sideSwitch}
        onClick={() => switchCameraToRear(webcam, handleSetState, webcamRef)}
      >
        <CameraSwitch />
      </div>
      {!img && (
        <div className={classes.btnWrapper}>
          {/* switch mode button */}
          <div
            onClick={() => switchMode(displayedModes[0].text)}
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
            <p>Doubletake</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubleWebcam;