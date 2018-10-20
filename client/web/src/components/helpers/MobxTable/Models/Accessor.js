class Accessor {

    constructor(accessor, accumulator='array', selectors=null) {
        this.column = null
        this.accessor = accessor
        this.accumulator = accumulator
        this.selectors = selectors
    }

    // Apply accessor function to either object in corresponding row or to selected columns
    value(object) {
        return this.selectors == null ? this.accessor(object) : this.accessor(this.getValues(object))
    }

    // Aggregate all values for all selectors for accessor function
    getValues(object) {
        let values = []

        this.selectors.forEach(selector => {
            let selectorName = Object.keys(selector)[0]
            let selectorValues = Object.values(selector)[0]

            this.getSelectorValues(object, selector)

            values = values.concat(this.getSelectorValues(object, selector))
        })

        return values
    }

    // Get values from columns that pass selector requirements as an 'accumulator' type object
    getSelectorValues(object, selector) {
        let selectorName = Object.keys(selector)[0]
        let getters = selector[selectorName]

        let result = []
        if (this.accumulator === 'object') {
            result = {}
        }

        let values = []

        getters.forEach(getter => {
            let getterName = Object.keys(getter)[0]
            let getterValue = getter[getterName]
            switch (typeof getterValue) {
                case 'number':
                    values = this.selectValues(object, getterName, selectorName, getterValue)
                    break
                case 'object':
                    values = this.selectValues(object, getterName, selectorName, null, getterValue)
                    break
                default:
                    values = this.selectValues(object, getterName, selectorName)
                    break
            }

            if (this.accumulator === 'array') {
                result = result.concat(values.map(value => [getterName, value]))
            } else if (this.accumulator === 'object') {
                result[getterName] = values
            }
        })

        return result
    }

    // Filter columns and get their values
    selectValues(object, getterName, selectorName, maxAmount=null, indexArray=null) {
        let columns = this.selectColumns(getterName, selectorName, maxAmount)
        columns = this.filterColumns(columns, indexArray)

        return columns.reduce((accumulator, column) => accumulator.concat(column.accessor(object)), [])
    }

    // Filter columns where required attribute equals required value
    // Also if there is maAmount of columns passed - return only first 'maxAmount' columns
    selectColumns(getterName, selectorName, maxAmount) {
        let currentAmount = 0

        return this.column.header.appliedColumns.filter(column => {
            if (column[selectorName] === getterName && (maxAmount == null || currentAmount < maxAmount)) {
                currentAmount += 1
                return column
            }
        })
    }

    // Filter columns array by indexes from indexArray
    filterColumns(columns, indexArray) {
        return columns.filter((column, index) => {
            if (indexArray == null || indexArray.includes(index)) {
                return column
            }
        })
    }
}

export default Accessor
