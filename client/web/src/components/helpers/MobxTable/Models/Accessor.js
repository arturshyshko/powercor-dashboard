class Accessor {

    constructor(accessor, empty=null, accumulator='array', selectors=null, ignore=null) {
        this.column = null
        this.accessor = accessor
        this._empty = empty
        this.accumulator = accumulator
        this.selectors = selectors
        this.ignore = ignore
    }

    // Apply accessor function to either object in corresponding row or to selected columns
    value(object) {
        // If any ancestor has accesstor - try using it first
        if (this.column.parent && this.column.parent._accessor != null) {
            // If it results in null - do not call ours accessor
            // This is usefull when we don't want to always check for intermediate objects
            if (this.column.parent.accessor(object) == null) {
                return null
            }
            // TODO: Make realization for passing intermediate object to our accessor (by default, we might want not to do this)
        }

        return this.selectors == null ? this.accessor(object) : this.accessor(this.getValues(object))
    }

    // Get either self empty value or nearest ancestor empty value
    get empty() {
        if (this._empty) {
            return this._empty
        } else {
            let emptyValue = null
            this.column.ancestors.forEach(ancestor => {
                if (ancestor._accessor && ancestor._accessor.empty != null) {
                    emptyValue = ancestor._accessor.empty
                }
            })

            return emptyValue
        }
    }

    // Aggregate all values for all selectors for accessor function
    getValues(object) {
        let values = []

        this.selectors.forEach(selector => {
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
    // Also if there is maxAmount of columns passed - return only first 'maxAmount' columns
    selectColumns(getterName, selectorName, maxAmount) {
        let currentAmount = 0

        return this.column.header.appliedColumns.filter(column => {
            // Do not include columns after maxAmount
            if (maxAmount == null || currentAmount < maxAmount) {
                // Check if the column meets selector requirements
                if (column[selectorName] === getterName) {
                    // Do not include yourself
                    if (column.id !== this.column.id) {
                        // Do not include columns which have ignorable ancestor
                        if (this.filterByAncestors(column)) {
                            currentAmount += 1
                            return true
                        }
                    }
                }
            }

            return false
        })
    }

    // Filter columns array by indexes from indexArray
    filterColumns(columns, indexArray) {
        return columns.filter((column, index) => {
            if (indexArray == null || indexArray.includes(index)) {
                return true
            }
            return false
        })
    }

    // If any column ancestor has attribute included in this.ignore - do not count column value
    filterByAncestors(column) {
        if (this.ignore) {
            // If ignore object was passed but empty - do not check anything
            if (Object.keys(this.ignore).length > 0) {
                return !Object.keys(this.ignore).some((key => {
                    // Convert values to ignore to array for consistancy
                    let ignorableValues = [].concat(this.ignore[key]).filter(elem => elem != null)
                    // If at least one ancestor has attribute with ignorable value - exclude this column
                    if (column.ancestors.length > 0) {
                        return column.ancestors.some(ancestor => ignorableValues.some(value => value === ancestor[key]))
                    }

                    return false
                }))
            }
        }
        // If no ignore was passed or all ancestors are fine - do not filter this column out
        return true
    }
}

export default Accessor
