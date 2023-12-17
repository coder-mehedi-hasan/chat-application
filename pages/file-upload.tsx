import React, { useState } from 'react';

const MessagingComponent = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadUrls, setUploadUrls] = useState([]);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    // You can perform any initial checks or validations on the files here
  };

  const fetchSignedUrlsForMessaging = async () => {
    // Implement your logic to fetch the signed URLs for messaging here using fetch or axios
    // Make a GET request to your server or API endpoint to get the signed URLs for messaging

    // Example code for fetching the signed URLs for messaging
    try {
      const filesData = selectedFiles.map((file) => ({
        "fileName": file.name,
        "fileType": file.type,
      }));
      const jsonFiles = filesData?.map(item => JSON.stringify(item))
      //   console.log(jsonFiles)
      //   return 
      // console.log(jsonFiles)
      // return
      const response = await fetch(`https://feed.kotha.im/app/feed/getS3FileUploadUrl?files=[${jsonFiles}]&folder=messaging&uploaderId=5c18efa5c2a47d000cc1465b`, {
        method: 'GET',
      });

      const data = await response.json();
      setUploadUrls(data.map((item) => item.signed_request));
    } catch (error) {
      console.error('Error fetching signed URLs for messaging:', error);
      // Handle errors appropriately
    }
  };

  const uploadFilesForMessaging = async () => {
    if (!selectedFiles.length || !uploadUrls.length) {
      console.error('No files selected or no upload URLs available');
      return;
    }

    const uploadPromises = selectedFiles.map(async (file, index) => {
      const uploadUrl = uploadUrls[index];

      const fileType = file.type;
      const myHeaders = new Headers({ 'Content-Type': fileType });
      // console.log("file : ", index, " ", file)
      // console.log("url : ", index, " ", uploadUrl)
      try {
        const response = await fetch(uploadUrl, {
          method: 'PUT',
          headers: myHeaders,
          body: file,
        });
        // const upload = await response.json()
        // console.log({response})
        // Handle the upload response for each file as needed
        // Check response status, etc.
      } catch (error) {
        console.error(`Error uploading file ${file.name} for messaging:`, error);
        // Handle errors appropriately
      }
    });
    // console.log({uploadPromises})
    await Promise.all(uploadPromises);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Upload Files for Messaging</h5>
              <form>
                <div className="mb-3">
                  <label htmlFor="fileInput" className="form-label">Select Files</label>
                  <input
                    type="file"
                    className="form-control"
                    id="fileInput"
                    onChange={handleFileChange}
                    multiple
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={fetchSignedUrlsForMessaging}
                >
                  Fetch Signed URLs
                </button>
                <button
                  type="button"
                  className="btn btn-success ms-2"
                  onClick={uploadFilesForMessaging}
                >
                  Upload Files
                </button>
                {/* Add more JSX elements for file upload for messaging */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingComponent;
