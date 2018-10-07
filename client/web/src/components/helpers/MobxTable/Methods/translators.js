import Column from '../Models/Column'


const createColumn = (column, headerArray=null) => {
    const { header: name, accessor, id, columns, style} = column
    let result = new Column(name, accessor)
    result.children = [].concat(columns).filter(elem => elem != null).map(child => createColumn(child, headerArray))

    if (headerArray != null) {
        headerArray.push(result)
    }

    return result
}

export const parseColumns = (columns, headerArray=null) => (
    columns.map(column => createColumn(column, headerArray))
)
