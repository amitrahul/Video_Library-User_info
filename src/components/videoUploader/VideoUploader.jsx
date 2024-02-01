import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Modal from "react-modal";
import styles from "./VideoUploader.module.css";
const VideoUploader = () => {
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [bookmarkedVideos, setBookmarkedVideos] = useState([]);
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);

  const onDrop = (acceptedFiles) => {
    const videos = acceptedFiles.map((file) => ({
      file,
      name: file.name,
      size: file.size,
      bookmarked: false,
    }));

    setUploadedVideos((prevVideos) => [...prevVideos, ...videos]);
  };

  const openVideoPopup = (video) => {
    setSelectedVideo(video);
  };

  const closeVideoPopup = () => {
    setSelectedVideo(null);
  };

  const toggleBookmark = (video) => {
    const updatedVideos = uploadedVideos.map((v) =>
      v === video ? { ...v, bookmarked: !v.bookmarked } : v
    );
    setUploadedVideos(updatedVideos);

    const updatedBookmarkedVideos = updatedVideos.filter((v) => v.bookmarked);
    setBookmarkedVideos(updatedBookmarkedVideos);
  };

  const toggleShowBookmarkedOnly = () => {
    setShowBookmarkedOnly(!showBookmarkedOnly);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const filteredVideos = showBookmarkedOnly ? bookmarkedVideos : uploadedVideos;

  return (
    <div className={styles.movieWrapper}>
      <h1>Movies</h1>
      <div
        {...getRootProps()}
        className={`dropzone ${isDragActive ? "active" : ""}`}
      >
        <input {...getInputProps()} />
        <button className={styles.selectVideoBtn}>
          click to select videos
        </button>
      </div>
      <div>
        <div className={styles.uploadVideoWrapper}>
          <h3>Uploaded Videos : - </h3>
          <span>
            <label>
              Show Bookmarked Only
              <input
                type="checkbox"
                checked={showBookmarkedOnly}
                onChange={toggleShowBookmarkedOnly}
              />
            </label>
          </span>
        </div>
        <ul className={styles.videoList}>
          {filteredVideos.map((video, index) => (
            <li key={index}>
              <button onClick={() => openVideoPopup(video)}>
                {video.name}
              </button>
              <label>
                <input
                  type="checkbox"
                  checked={video.bookmarked}
                  onChange={() => toggleBookmark(video)}
                />
                Bookmark
              </label>
              :: {Math.round(video.size / 1024)} KB
            </li>
          ))}
        </ul>
      </div>

      <Modal
        isOpen={selectedVideo !== null}
        onRequestClose={closeVideoPopup}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
          },
        }}
      >
        {selectedVideo && (
          <div className={styles.videoContent}>
            <h2>{selectedVideo.name}</h2>
            <video controls width="400" height="300">
              <source
                src={URL.createObjectURL(selectedVideo.file)}
                type="video/mp4"
              />
              Browser does not support the video tag.
            </video>
            <button className={styles.closeBtn} onClick={closeVideoPopup}>
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default VideoUploader;
