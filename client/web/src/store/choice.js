import { types } from 'mobx-state-tree'


const Choice = types.model('Choice', {
    name: types.identifier,
    weight: types.number,
})

export const BusinessImportanceChoice = Choice.named('BusinessImportanceChoice')
export const ResourceChoice = Choice.named('ResourceChoice')
export const StageChoice = Choice.named('StageChoice')
export const StatusChoice = Choice.named('StatusChoice')

// TODO:
// Try to implement some sort of inheritance from this model for lower 4 models
// Need to somehow override choices field and use types.named for new models
const ChoiceStore = types.model('ChoiceStore', {
    choices: types.array(Choice)
}).views(self => ({

})).actions(self => {

    function addChoice(choice) {
        self.choices.push(choice)
    }

    return { addChoice, }
})

export const BusinessImportanceChoiceStore = types.model('BusinessImportanceChoiceStore', {
    choices: types.array(BusinessImportanceChoice)
}).views(self => ({

})).actions(self => {

    function addChoice(choice) {
        self.choices.push(choice)
    }

    return { addChoice, }
})

export const ResourceChoiceStore = types.model('ResourceChoiceStore', {
    choices: types.array(ResourceChoice)
}).views(self => ({

})).actions(self => {

    function addChoice(choice) {
        self.choices.push(choice)
    }

    return { addChoice, }
})

export const StageChoiceStore = types.model('StageChoiceStore', {
    choices: types.array(StageChoice)
}).views(self => ({

})).actions(self => {

    function addChoice(choice) {
        self.choices.push(choice)
    }

    return { addChoice, }
})

export const StatusChoiceStore = types.model('StatusChoiceStore', {
    choices: types.array(StatusChoice)
}).views(self => ({

})).actions(self => {

    function addChoice(choice) {
        self.choices.push(choice)
    }

    return { addChoice, }
})
