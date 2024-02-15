import { reducerCases } from "../context/constant";

export const updateMessage = (newObj, messages, dispatch) => {
    console.log(newObj)
    const updatedMessages = updateNameByIdInPlace(messages, newObj?._id, newObj)
    dispatch({ type: reducerCases.SET_MESSAGES, messages: updatedMessages })
}

function updateNameByIdInPlace(arr: any[], idToUpdate: string, newObj: any) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]._id === idToUpdate) {
            arr[i] = { ...arr[i], ...newObj };
            break;
        }
    }
    return arr
}