/**
 * Created by Administrator on 2018/10/30.
 */
import { dealStatus,dealName,executeStatus,messageList,orderType,cancellations,direction} from "./config"
export default {
    filters: {
        $_filterDealType: (value) => {
            return dealStatus[value]
        },
        $_dealName:(value) => {
            return dealName[value]
        },
        $_executeStatus:(value) => {
            return executeStatus[value]
        },
        $_messageList:(value) => {
            return messageList[value]
        },
        $_orderType:(value) => {
            return orderType[value]
        },
        $_cancellations:(value) => {
            return cancellations[value]
        },
        $_direction:(value) => {
            return direction[value]
        }
    }
}
