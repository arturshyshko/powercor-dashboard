class Accessor {

    constructor(accessor, name=null, mark=null, accumulatorType='array') {
        this.column = null
        this._accessor = accessor
        this.names = name
        this.marks = mark
        this.accumulatorType = accumulatorType
    }

    accessor(object) {
        if (this.names == null && this.marks == null) {
            return this._accessor(object)
        } else {
            let namesValues = this.getValuesForAccessorObject(object, this.names)
            let marksValues = this.getValuesForAccessorObject(object, this.marks, 'mark')


            return this._accessor([].concat(namesValues, marksValues))
        }
    }

    // TODO: rename this method
    getValuesForAccessorObject(object, getters, getterType='name') {
        let gettersArray = [].concat(getters).filter(elem => elem != null)
        let result = []
        let values = []
        if (this.accumulatorType === 'object') {
            let result = {}
        }

        gettersArray.forEach(getter => {
            switch (typeof Object.values(getter)[0]) {

                // If getter value is number - use maxAmount
                case 'number':
                    values = this.getColumnsValuesOnGetterType(object, getter, getterType, Object.values(getter)[0])
                    if (Array.isArray(result)) {
                        result = values.map(value => [Object.keys(getter)[0], value])
                    } else if (typeof result === 'object') {
                        result[Object.keys(getter)[0]] = values
                    }
                    break

                // If getter value is array - use indexArray
                case 'object':
                    values = this.getColumnsValuesOnGetterType(object, getter, getterType, null, Object.values(getter)[0])
                    if (Array.isArray(result)) {
                        result =values.map(value => [Object.keys(getter)[0], value])
                    } else if (typeof result === 'object') {
                        result[Object.keys(getter)[0]] = values
                    }
                    break

                // If getter value is 'all' or anything else
                default:
                    values = this.getColumnsValuesOnGetterType(object, getter, getterType)
                    if (Array.isArray(result)) {
                        result = values.map(value => [Object.keys(getter)[0], value])
                    } else if (typeof result === 'object') {
                        result[getter] = values
                    }
                    break
            }
        })

        return result
    }

    // TODO: rename this method
    // Return array which consists of results of all applied column's accessors called object
    // getter is object which looks like {'Budget': maxAmount || indexArray || 'all'}
    getColumnsValuesOnGetterType(object, getter, getterType, maxAmount=null, indexArray=null) {
        return this.column.header.appliedColumns.reduce((accumulator, column, index) => {
            if ((column.id != this.column.id) || (indexArray != null && indexArray.includes(index))) {
                if ((maxAmount != null) && (index >= maxAmount)) {
                    return accumulator
                }
                if (column[getterType] === Object.keys(getter)[0]) {
                    return accumulator.concat(column.accessor(object))
                }
            }
            return accumulator
        }, [])
    }

}

export default Accessor
