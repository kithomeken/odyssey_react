const TableContentFormatting = ({content} : {content: any}) => {
    return content.length > 50 ? content.substring(0, 47) + '...' : content
}

export default TableContentFormatting