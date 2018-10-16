columns - array of `Column` objects

***Column object***:

**id** - id of the column. If not provided - returns autoincremented value starting from 0 (this values may not be unique)

**header** (required) - displayed string in the table header

**style** - `Style` object

**accessor** - either function applied to the 'data' passed to `Row` object or `Accessor` object

**columns** - array of `Column` objects


**Style object**:

contains styles written in JSX format which will be applied to it's children or it's own <Cell> array

    if <Column> has 'columns' attribute - styles will be passed to it's children
    child styles are appended to parentive styles and can override them

**standard** - styles that will be applied in normal situation, if it is used - ignore styles not inside this attribute

**empty** - styles that will be applied if <Cell> is empty (cell.isEmpty === true)


**Accessor object**:

**name** - can be defined in multiple ways which will than be converted to `Name` (4) object

    1) '<value>' - get values from all `Column` objects in current <Row> with <header> === <value>

    2) ['<value 1>', '<value 2>'] - same as (1) but for each <value> in array

    3) {'<value 1>': <Name Columns>}

        3.1) <Name Columns> == [<number 1>, <number 2>] - same as (1) but only for columns with index which equals any <number> in array

        3.2) <Name Columns> == <number> - same as (1) but only for first <number> of columns

        3.3) <Name Columns> == 'all' - same as (1)

    4) [ { (3) } || '<value>', ... ] - use only when order of returned values is really important
        <value> - same as (1)

**id** - same as `Name` object, but works with `Column.id`

    **I might make id's unique for other logic and use 'mark' attribute instead**

**accumulator** - value passed to 'accessor' attribute

equals either 'array' or 'object' (default is array)

    1) if 'array'

        1.1) return tuple ((`Column.name || Column.id`), value)

        1.2) if only 'name' or only 'id' attribute is present and name(1) form is used return array of values

    2) if 'object' - return object which looks like {`Column.name || Column.id`: [<values>], ...}

**accessor** (required) - function which recieves accumulator and will be passed to `Cell` object