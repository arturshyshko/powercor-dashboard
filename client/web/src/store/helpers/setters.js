import { types } from "mobx-state-tree";
import { createFunctionName } from './functionProcessors';


const createSetters = (excludes=[]) => (
    types.model({}).actions(self => {
        let result = {}
        for (let field in self) {
            result[createFunctionName('set', field, false)] = (value) => {
                self[field] = value;
                return value;
            }
        }
        return result;
    })
)

export default createSetters;
