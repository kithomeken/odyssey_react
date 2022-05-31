import Moment from 'moment';

export default function DateFormating({dateString} : {dateString: any}) {
    const formatedDate = Moment(dateString).format('MMM Do YY')

    return (
        <span>
            {formatedDate}
        </span>
    )
}