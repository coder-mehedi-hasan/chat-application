import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { useStateProvider } from "../../context/StateContext";

const CustomImageGallery = ({ onClick, imageId }: any) => {
    const [galleryImages, setGalleryImages] = useState<any>([])
    const [{ messages }]: any = useStateProvider()
    const [startAt, setStartAt] = useState(0)

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
                if (item?._id === imageId) {
                    setStartAt(images?.length - 1)
                }
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
                    startIndex={startAt}
                />
            </div>
        </div>
    )
}
export default CustomImageGallery
