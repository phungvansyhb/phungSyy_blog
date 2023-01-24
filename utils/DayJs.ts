import 'dayjs/locale/vi'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('vi')
dayjs.extend(relativeTime)
export function convertTimestampFirebase(date: { seconds: number, nanoseconds: number }) {
    return dayjs(
        new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
    ).format("dddd ngày DD-MM-YYYY")
}
export default dayjs