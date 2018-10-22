import Column from '../Models/Column'
import Accessor from '../Models/Accessor'


// Function which parses whole JSON object into Columns class instances and builds Header with all these columns
export const parseColumns = (columns, headerArray=null) => (
    columns.map(column => {
        let mobxColumn = createColumn(column, headerArray)
        column['id'] = mobxColumn.id

        return column
    })
)

// Function which parses passed JSON and builds Column class instance
// 'headerArray' - array of Header object which will contain all created columns
const createColumn = (column, headerArray=null) => {
    // Set initial variables for new Column object
    let { name, value: accessor, children, style, colSpan, rowSpan, layer, type, } = column
    // Set header to null just to pass it in Column constructor (or add some logic in the future)
    const header = null
    // Set column type to string or passed value (it is user for data formatting in cells of this column)
    type = type == null ? 'string' : type
    // Parse accessor object into <Accessor> instance
    accessor = parseAccessor(accessor)

    // Create initial Column instance with basic values
    let result = new Column(
        name,
        accessor,
        header,
        colSpan,
        rowSpan,
        layer,
        style,
    )

    // Add embedded columns to children array of parent column
    result.children = [].concat(children)
        .filter(elem => elem != null).map(child => createColumn(child, headerArray))

    if (headerArray != null) {
        headerArray.push(result)
    }

    return result
}

// Parse column accessor object or function into Accessor object
const parseAccessor = (object) => {
    if (object == null) {
        return null
    }

    if (typeof object === 'function') {
        return new Accessor(object)
    } else {
        let { columns: selectors, accumulator='array', accessor, ignore } = object
        if (selectors != null) {
            selectors = Object.keys(selectors).map(key => ({[key]: parseSelector(selectors[key])}))
        }

        return new Accessor(accessor, accumulator, selectors, ignore)
    }
}

// Parse accessor selectors
// 'selector' or [selector1, selector2] or {selector: condition} or [{selector1: condition1}, {selector2: condition2}]
// Parses into last variant which than is processed by Accessor object's corresponding functions
const parseSelector = (object) => {
    if (object == null) {
        return null
    }

    if (typeof object === 'string') {
        return [{[object]: 'all'}]
    } else if (Array.isArray(object)) {
        return object.map(value => {
            if (typeof value === 'object') {
                return value
            } else {
                return {[value]: 'all'}
            }
        })
    } else if (typeof object === 'object') {
        return [object]
    }
}
