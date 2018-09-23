export const createColumn = (header, accessor=null, columns=null) => {
    let column = {
        id: `project${header[0].toUpperCase()}${header.slice(1).replace(/ ([a-zA-Z])/g, v => v.toUpperCase())}`,
        Header: header,
    }
    if (accessor) column.accessor = accessor
    if (columns) column.columns = columns

    return column
}

export const filterColumns = (columns, fields, filterAttribute='Header') => (
    columns.filter(column => !fields.includes(column[filterAttribute]))
)

