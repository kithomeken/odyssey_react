import Moment from 'moment';

export default function DateFormating({dateString} : {dateString: any}) {
    const formatedDate = Moment(dateString).format('Do MMM YYYY')

    return (
        <span>
            {formatedDate}
        </span>
    )
}