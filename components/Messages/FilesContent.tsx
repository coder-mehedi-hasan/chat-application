import { BsDownload } from 'react-icons/bs';

const FilesContent = ({ message }) => {
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const name = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    return (
        <>
            <a
                href={url}
                download={name}
                target="_blank"
                rel="noreferrer"
            >
                <button style={{ border: "none", padding: "25px" }} className='rounded-pill text-light brand-bg'><BsDownload /> {name}</button>
            </a>
        </>
    );
};

export default FilesContent;