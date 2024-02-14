import { RxCross1 } from "react-icons/rx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useStateProvider } from "../../context/StateContext";
import { useEffect, useState } from "react";
import { getFileExtensionAndType } from '../../utils/getFileExtensionAndType';
import { fileTypes } from "../../utils/constant";

const CustomImageGallery = ({ onClick, image }: any) => {
    const [galleryImages, setGalleryImages] = useState<any>([])
    const [{ messages }]: any = useStateProvider()

    useEffect(() => {
        let images: any[] = []
        const fillterdMessages = messages?.length && messages?.filter(mes => mes?.messageMeta?.contentType === 3)
        fillterdMessages && fillterdMessages?.map(item => {
            if (item?.messageFiles?.length) {
                const url = item?.messageFiles[0]?.filepath
                images.push({
                    original: url,
                    thumbnail: url,
                })
            }
        })
        setGalleryImages(images)
    }, [messages])

    return (
        <div style={{ width: "100%", height: "100%", }}>
            <div style={{ padding: "10px 20px" }}>
                <button className="cancel-btn d-flex justify-content-center align-items-center" onClick={() => onClick(false)}  ><RxCross1 /></button>
            </div>
            <div style={{ height: "100%" }}>
                <ImageGallery
                    items={galleryImages}
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
