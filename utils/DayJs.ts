import 'dayjs/locale/vi'
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.locale('vi')
dayjs.extend(relativeTime)
export function convertTimestampFirebase({ date, format }: { date: { seconds: number, nanoseconds: number }, format?: string }) {
    return dayjs(
        new Date(date.seconds * 1000 + date.nanoseconds / 1000000)
    ).format(format || "dddd, DD [thg] MM-YYYY")
}
export default dayjs