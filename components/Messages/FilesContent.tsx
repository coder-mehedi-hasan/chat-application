import { BsDownload } from 'react-icons/bs';
import { mimeToExtension } from '../../utils/fileType';
import FileTypeIcon from '../common/FileTypeIcon';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { useMediaQuery } from 'react-responsive'

const FilesContent = ({ message }) => {
    const url = message?.messageFiles?.length && message?.messageFiles[0]?.filepath;
    const name = message?.messageFiles?.length && message?.messageFiles[0]?.filename;
    const mime = message?.messageFiles?.length && mimeToExtension(message?.messageFiles[0]?.mimetype)
    const isMobileWidth = useMediaQuery({ maxWidth: 576 })

    return (
        <>
            <a
                href={url}
                download={name}
                target="_blank"
                rel="noreferrer"
            >
                <button style={{ border: "none", padding: isMobileWidth ? "16px" : "25px" }} className='file-content rounded-pill text-light brand-bg'>
                    {
                        mime === "gif" ? <div style={{ maxWidth: "250px" }}>

                        </div> : <>
                            <FileTypeIcon extension={mime} />
                            {/* <BsDownload/> */}
                            {/* <FileIcon extension={mime} /> */}
                            <span className='ms-1'>{name}</span>
                        </>
                    }
                </button>
            </a>
        </>
    );
};

export default FilesContent;