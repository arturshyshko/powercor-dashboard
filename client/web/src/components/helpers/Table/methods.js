import React from 'react'
import {filterKeys} from '@services/attributesProcessors'


export const flattenColumns = (columns, parent=null, index=null, prevResult=[]) => {
    let result = prevResult
    Object.keys(columns).forEach((key) => {
        const column = columns[key]
        if (!column['columns']) {
            if (parent) {
                result.push({
                    position: `${index || ''}/${key}`,
                    ...column
                })
            } else {
                result.push({
                    position: key,
                    ...column
                })
            }
        } else {
            return flattenColumns(column['columns'], column, key, result)
        }
    })

    return result
}

export const buildHeaderStructure = (columns) => {
    let tableHead = {}
    Object.values(columns).forEach(column => {
        getFinalSuccessorsAmount(column, tableHead)
    })

    return tableHead
}

// This function does following:
// 1) Calculates amount of leafs (final children) on the subtree of each node
// 2) Calculates column depth and pushes it to corresponding layer in 'tableHead' object
// 3) Sets column 'rowSpan' attribute if it was not explicitly set before
const getFinalSuccessorsAmount = (column, tableHead, parent=null, depth=0, maxDepth) => {
    column['depth'] = depth
    if (depth > maxDepth) {
        maxDepth = depth
    }

    if (column['columns']) {

        setColumnRowSpan(column, 1)

        column['childrenAmount'] = Object.values(column['columns']).reduce((amount, child) => {
            amount += getFinalSuccessorsAmount(child, tableHead, column, depth + 1)
            return amount
        }, 0)

        tableHead[depth] ? tableHead[depth].push(column) : tableHead[depth] = [column]

        return column['childrenAmount']
    } else {
        column['childrenAmount'] = 0

        tableHead[depth] ? tableHead[depth].push(column) : tableHead[depth] = [column]

        if (!parent) {
            // rowSpan = 0 means column should take whole space
            setColumnRowSpan(column, 0)
        } else {
            // rowSpan = -1 means take space from your depth to the bottom
            setColumnRowSpan(column, -1)
        }

        return 1
    }
}

const setColumnRowSpan = (column, rowSpan) => {
    column.rowSpan = column['rowSpan'] || rowSpan
}
