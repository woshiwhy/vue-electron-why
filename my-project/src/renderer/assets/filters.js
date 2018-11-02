/**
 * Created by Administrator on 2018/10/30.
 */
import { dealStatus,dealName,executeStatus,messageList} from "./config"
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
    }
}
