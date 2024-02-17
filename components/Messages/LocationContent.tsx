import Link from 'next/link';
import { SlDirections } from "react-icons/sl";

const LocationContent = ({ message }) => {
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const messageHyperlink = message?.messageHyperlink;
    const pattern = /loc\/([-+]?\d*\.\d+|\d+)\/([-+]?\d*\.\d+|\d+)/;

    const match = messageHyperlink?.match(pattern);
    const latitude = match && parseFloat(match[1]);
    const longitude = match && parseFloat(match[2]);
    const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
    return (
        <Link href={mapUrl} target='_blank'>
            <div style={{ maxWidth: "250px", borderRadius: "18px", height: "auto", overflow: "hidden", }} className='border border-secondary position-relative'>
                <img src={url} alt="img" style={{ maxWidth: "100%", maxHeight: "250px" }} />
                <div className='position-absolute w-100 text-dark bg_gray d-flex justify-content-between' style={{ zIndex: 1, bottom: 0, }}>
                    <span className='my-2 fs-7 w-50'>Shared Location</span>
                    <div className='my-2 fs-7  brand-color w-50'>
                        <p className='m-0 fs-4 text-center'>
                            <SlDirections />
                        </p>
                        <p className='m-0 text-center'>
                            Direction
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default LocationContent;