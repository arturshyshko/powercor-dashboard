
class Style {

    constructor(standard={}, empty={}, header={}, conditionals=[], common={}) {
        this.column = null

        this._header = header
        this._empty = empty
        this._standard = standard
        this._conditionals = conditionals
        this._common = common
    }

    get standard() {
        if (this.column.parent) {
            return { ...this.column.parent.style.standard, ...this._common, ...this._standard }
        } else {
            return { ...this._common, ...this._standard }
        }
    }

    get empty() {
        if (this.column.parent) {
            return { ...this.column.parent.style.empty, ...this._common, ...this._empty }
        } else {
            return { ...this._common, ...this._empty }
        }
    }

    get header() {
        return { ...this._header }
    }

    get hasConditionals() {
        return this._conditionals.length > 0
    }

    // We can pass some conditional styling which will take precedence over all other column styles
    // They will not be applied if parent has accessor and its value equals null
    conditionals(object) {
        // Conditionals array looks like this: [{'styleAttr': 'value'}, ...]
        // We reduce these objects into one with accumulative properties
        // Latter conditionals take precedence over previous ones
        return this.applyConditionals(object).reduce((acc, conditional) => (
            {...acc, ...conditional.style}
        ), {})
    }

    // We only use conditionals that return true as a result when applied to object
    applyConditionals(object) {
        return this._conditionals.filter(contional => (
            contional.condition(object) === true
        ))
    }

}

export default Style
