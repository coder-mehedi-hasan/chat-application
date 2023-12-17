import { RxCross1 } from "react-icons/rx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const CustomImageGallery = ({ onClick, image }) => {
    return (
        <div style={{ width: "100%", height: "100%", }}>
            <div style={{ padding: "10px 20px" }}>
                <button className="cancel-btn d-flex justify-content-center align-items-center" onClick={() => onClick(false)}  ><RxCross1 /></button>
            </div>
            <div style={{ height: "100%" }}>
                <ImageGallery
                    items={
                        [
                            {
                                original: image,
                                thumbnail: image,
                            },
                        ]
                    }
                    showBullets={false}
                    showPlayButton={false}
                    useBrowserFullscreen={true}
                    showFullscreenButton={false}
                />
            </div>
        </div>
    )
}
export default CustomImageGallery
