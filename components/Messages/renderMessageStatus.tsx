import { BsCheckAll, BsCheckLg } from "react-icons/bs";

const renderMessageStatus = (status) => {
    switch (status) {
        case 1:
            return <><BsCheckLg /></>
        case 2:
            return <><BsCheckAll /></>
        case 3:
            return <><BsCheckAll className="brand-color" /></>
        default:
            break;
    }
}

export default renderMessageStatus;