import moment from 'moment'


const possibleFormats = [
    'string',
    'date',
    'number',
    'currency',
]

// TODO
// Options can at least include:
// value to append after result - append?
// value to append before result - prepend?
// separator for 'date', 'number', 'currency'
// amount of digits after 0 in 'currency' and 'number' - roundTo?
// thousands for 'currency'??
// country currency in 'currency' currency?

// Most of the things inside - temporary solution
class Format {

    constructor(type='string', options) {
        this.type = type
        this.options = options
    }

    value(val) {
        switch (this.type) {
            case 'string':
            return this.formatString(val)

            case 'date':
            return this.formatDate(val)

            case 'number':
            return this.formatNumber(val)

            case 'currency':
            return this.formatCurrency(val)

            default:
            return this.formatString(val)
        }
    }

    formatString(value) {
        return value
    }

    // TODO: i will have to use some library for parsing currency in the future, maybe - Dinero.js
    formatCurrency(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        })
        const val = parseInt(value)

        return formatter.format(val)
    }

    formatDate(value) {
        return moment(value).format('DD/MM/YYYY')
    }

    formatNumber(value) {
        return parseInt(value)
    }

}

export default Format
