import { BsCheckAll, BsCheckLg } from "react-icons/bs";

const renderMessageStatus = (status) => {
    switch (status) {
        case 1:
            return <>Sent <BsCheckLg /></>
        case 2:
            return <>Delivered <BsCheckAll /></>
        case 3:
            return <>Read <BsCheckAll className="brand-color" /></>
        default:
            break;
    }
}

export default renderMessageStatus;