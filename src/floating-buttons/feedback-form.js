import { useEffect, useState } from "react";
import { useScreenshot } from "use-react-screenshot";
import axios from "axios";
import { JSEncrypt } from "jsencrypt";

const encrypt = new JSEncrypt();

const publicKey = `
    -----BEGIN PUBLIC KEY-----
    MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
  FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
  xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
  gwQco1KRMDSmXSMkDwIDAQAB
  -----END PUBLIC KEY-----`;

function FileItem({ file, removeFile }) {
  if (file === undefined) return;
               
  return (
    <li className="sfw-list-group-item px-0 py-1">
      <p
        className="sfw-text-truncate"
        data-toggle="tooltip"
        data-placement="top"
        title={file.name}
      >
        <a
          href="#"
          className="text-danger"
          onClick={(event) => removeFile(event, file)}
        >
          X
        </a>{" "}
        {file.name}
      </p>
    </li>
  );
}

function ShowMessage({ status }) {
  if (parseInt(status.code) === 200) {
    return <small className="sfw-text-center sfw-text-success">{status.message}</small>;
  } else {
    return <small className="sfw-text-center sfw-text-danger">{status.message}</small>;
  }

  return null;
}
export default function FeedbackForm(props) {
  const { isOpen , logo, imagePlaceHolder, apiUrl, apiKey,toggleOpen} = props;

  const [data, setData] = useState({
    summary: "",
    type: "",
    description: "",
  });
  const [status, setStatus] = useState({});

  const [image, takeScreenshot] = useScreenshot();
  const [screenShotAdded, setScreenShotAdded] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [types, setTypes] = useState([{ id: 0, name: "Select a type" }]);

  useEffect(() => {
    setScreenShotAdded(false);
    setStatus({
      code: 0,
      message: "",
    });
    getTypes();
  }, []);

  function summaryOnChange(event) {
    const input = event.target.value;
    const oldData = { ...data };
    oldData.summary = input;

    setData(oldData);
  }
  function descriptionOnChange(event) {
    const input = event.target.value;
    const oldData = { ...data };
    oldData.description = input;

    setData(oldData);
  }
  function typeOnChange(event) {
    const input = event.target.value;
    const oldData = { ...data };
    oldData.type = input;

    setData(oldData);
  }
  function clearForm() {
    const oldData = { ...data };
    oldData.summary = "";
    oldData.type = "";
    oldData.description = "";

    setData(oldData);
    setScreenShotAdded(false);
    setUploadedFiles([]);
  }

  function getTypes() {
    const API_URL = `${apiUrl}/feedback-type`;;
    try {
      axios
        .get(API_URL, {
          headers: {
            "Content-Type": "application/json",
            token: getKey(),
          },
        })
        .then((response) => {
          setTypes(response.data.data);
        });
    } catch (error) {
      console.log(error);
    }
  }
  function getKey() {
    encrypt.setPublicKey(publicKey);
    const encrypted = encrypt.encrypt(apiKey)
     
    return encrypted;
  }
  function onSubmit() {
    const API_URL = `${apiUrl}/feedback`;
    try {
      const formData = new FormData();

      uploadedFiles.map((file, index) => {
        formData.append(index, file);
      });

      if (screenShotAdded) {
        formData.append("screenShot", image);
        formData.append("screenShotAdded", 1);
      } else {
        formData.append("screenShot", null);
        formData.append("screenShotAdded", 0);
      }

      formData.append("description", data.description);
      formData.append("summary", data.summary);
      formData.append("type", data.type);
      formData.append("userId", "admin");
      
      axios
        .post(API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            token: getKey(),
          },
        })
        .then((response) => {
          console.log(response)
          setStatus({
            code: response.data.status,
            message: response.data.message,
          });
          if (response.data.status === 200) {
            clearForm();
           
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
  function onCancel(){
    toggleOpen();
  }

  function captureScreenShot(event) {
    event.preventDefault();

    const homeRef = document.getElementsByClassName("sfw-app")[0];
    const popUpRef = document.getElementsByClassName('sfw-dialog')[0];

    setScreenShotAdded(true);

    if (popUpRef !== undefined) {
      return takeScreenshot(popUpRef);
    } else {
      return takeScreenshot(homeRef);
    }
  }
  function attachFile() {
    const { files } = event.target;
    const file = files?.[0];
    let newFiles = [...uploadedFiles];
    if (file !== undefined) {
      newFiles.push(file);
      setUploadedFiles(newFiles);
    }
  }
  function removeFile(event, file) {
    event.stopPropagation();

    const newFiles = uploadedFiles.filter((ef) => ef.name !== file.name);
    setUploadedFiles(newFiles);
  }

  function removeScreenShot() {
    setScreenShotAdded(false);
  }

  let initStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    position: "absolute",
    width: "700px",
    left: -700,
    top: -400,
    zIndex: 100000,
    outline: "none",
    transition: `all ${2 * 50 + 200}ms cubic-bezier(0.71, 0.71, 0, 1.18) 0ms`,
  };

  if (!isOpen) return null;

  return (
    <div style={initStyle}>
      <div className="sfw-card sfw-rounded-0 w-100">
          <div className="sfw-card-header sfw-p-0">
            <div className="sfw-row sfw-m-0 sfw-d-flex sfw-justify-content-center sfw-align-items-center sfw-bg-secondary">
              <div className="sfw-col-4 sfw-bg-secondary">
                <img src={logo} className="sfw-img-fluid"/>
              </div>
              <div className="sfw-col-8 sfw-bg-warning">
                <h3 className="sfw-h3 sfw-text-uppercase sfw-text-white sfw-title-mt sfw-text-center">Beta Testing Feedback</h3>
              </div>
            </div>
          </div>
         
          <ShowMessage status={status} />
          <div className="sfw-card-body sfw-px-3 sfw-py-2">
            <div className="sfw-row">
              <div className="sfw-col-6 sfw-border-right">
                <div className="sfw-form-group">
                  <label htmlFor="summary" className="sfw-label">Summary<span className="sfw-text-danger">*</span></label>
                  <input type="text" className="sfw-form-control sfw-form-control-sm" id="summary" aria-describedby="summary"
                     value={data.summary} onChange={summaryOnChange}/>
                </div>
                <div className="sfw-form-group">
                  <label htmlFor="feature" className="sfw-label">Type<span className="sfw-text-danger">*</span></label>
                  <select
                      className="sfw-form-control"
                      onChange={typeOnChange}
                      value={data.type}
                    >
                      <option value="0"> -- Select a type -- </option>
                      {types.map((type, index) => (
                        <option key={index} value={type.value}>
                          {type.name}
                        </option>
                      ))}
                    </select>

                </div>
                <div className="sfw-form-group sfw-mb-0">
                  <label htmlFor="description" className="sfw-label">Description<span className="sfw-text-danger">*</span></label>
                  <textarea className="sfw-form-control sfw-form-control-sm" id="description" rows="3"
                    value={data.description}
                    onChange={descriptionOnChange}></textarea>
                </div>
              </div>
              <div className="sfw-col-6">
                <div className="sfw-media sfw-pb-2 sfw-mb-2 sfw-border-bottom">
                {screenShotAdded ? (
                  <img src={image} className="sfw-img-fluid sfw-mr-3 sfw-w-25" alt="..." />
                ) : (
                  <img
                    src={imagePlaceHolder}
                    className="sfw-img-fluid sfw-mr-3 sfw-w-25"
                    alt="..."
                  />
                )}

                  <div className="sfw-media-body">
                    <h6 className="sfw-h6 sfw-small sfw-text-secondary sfw-mt-0 sfw-mb-2">Take screenshot</h6> 
                    <div className="sfw-input-group sfw-mb-3">
                      <div className="sfw-custom-file">
                          <button
                            className="btn btn-primary btn-sm align-items-center"
                            onClick={captureScreenShot}>
                            Take a Screenshot
                          </button>
                          <button
                            className="btn btn-danger btn-sm align-items-center ml-2"
                            onClick={removeScreenShot}>
                            X
                          </button>

                      </div>
                    </div>
                  </div>
                </div>

                <h6 className="sfw-h6 sfw-small sfw-text-secondary sfw-mt-1 sfw-mb-2">Attach files</h6> 
                <div className="sfw-input-group">
                  <div className="sfw-custom-file">
                    <input type="file" className="sfw-custom-file-input" id="inputGroupFile" aria-describedby="inputGroupFileAddon"
                    onChange={attachFile}/>
                    <label className="sfw-custom-file-label" htmlFor="inputGroupFile">Choose</label>
                  </div>
                </div>
                <ul className="sfw-list-group sfw-list-group-flush scrolldiv">
                  {uploadedFiles.map((file) => (
                    <FileItem
                      key={file.name}
                      file={file}
                      removeFile={removeFile}
                    />
                  ))}

                  </ul>

              </div>
            </div>

          </div>
          <div className="sfw-card-footer sfw-d-flex sfw-justify-content-between sfw-align-items-center sfw-px-3 sfw-py-2">
            <div>
              <small className="sfw-text-muted sfw-small">Powered by Simple Feedback Widget</small>
            </div>
            <div>
               <button className="sfw-btn sfw-btn-primary sfw-btn-sm"  onClick={onSubmit} >Submit</button> 
            </div>
          </div>
         </div>

    </div>
  );
}
