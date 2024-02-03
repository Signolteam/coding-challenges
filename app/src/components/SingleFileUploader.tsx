import React, { useState } from "react";
import "./SingleFileUploader.style.css";
import { TasksClient } from "../clients/tasks/client/tasks.client";
import { FileMetaStatus } from "../clients/tasks/models/file-meta";

type Props = {
    onBackBtnClickHandler: () => void;
}

const tasksClient = new TasksClient();

const SingleFileUploader = (props: Props) => {
  const { onBackBtnClickHandler } = props;

  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    "initial" | "uploading" | "success" | "fail" | "processing" | "failedprocessing"
  >("initial");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setStatus("initial");
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
        setStatus("uploading");

        const formData = new FormData();
        formData.append("file", file);

        try {       
            const uploadUrl = await tasksClient.tasksApi.generateUploadUrl(file.name);

            const result = await fetch(uploadUrl, {
                method: "PUT",
                body: formData,
            });

            await result.text();

            setStatus("processing");

            const pollForFileMeta = async () => { 
              const fileMeta = await tasksClient.tasksApi.getFileMeta(file.name);

              if (fileMeta?.status === FileMetaStatus.FAILED) {
                setStatus("failedprocessing");
              } else if (fileMeta?.status === FileMetaStatus.COMPLETE) {
                // File imported into database
                setStatus("success");
              } else {
                setInterval(pollForFileMeta, 2000);
              }
            }

            await pollForFileMeta();
        } catch (error) {
            console.error(error);
            setStatus("fail");
        }
    }
  };

  return (
    <>
      <article>
        <h3>Upload CSV</h3>
      </article>
      <div className="input-group">
        <label htmlFor="file" className="custom-file-upload">
          Choose a file
        </label>
        <input id="file" accept=".csv" type="file" formEncType="multipart/form-data" onChange={handleFileChange} />
      </div>
      {file && (
        <section className="file-details">
          File details:
          <ul>
            <li>Name: {file.name}</li>
            <li>Type: {file.type}</li>
            <li>Size: {file.size} bytes</li>
          </ul>
        </section>
      )}

      {file && (
        <input onClick={handleUpload} type="button" value="Upload the file"/>
      )}

      <Result status={status} />

      <input type="button" value="Back" onClick={onBackBtnClickHandler}/>
    </>
  );
};

const Result = ({ status }: { status: string }) => {
  if (status === "success") {
    return <p>✅ File uploaded and processed successfully!</p>;
  } else if (status === "fail") {
    return <p>❌ File upload failed!</p>;
  } else if (status === "failedprocessing") {
    return <p>❌ Uploaded file failed to be processed!</p>;
  } else if (status === "uploading") {
    return <p>⏳ Uploading selected file...</p>;
  } else {
    return null;
  }
};

export default SingleFileUploader;