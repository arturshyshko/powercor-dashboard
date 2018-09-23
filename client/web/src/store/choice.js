import { types } from 'mobx-state-tree'
import createBaseActions from '@store/helpers/baseActions'


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
// const ChoiceStore = types.model('ChoiceStore', {
//     choices: types.array(Choice)
// }).views(self => ({

// })).actions(self => {

//     function addChoice(choice) {
//         self.choices.push(choice)
//     }

//     return { addChoice, }
// })

export const testStore = types.compose(
    types.model('test', {
        tests: types.array(Choice)
    }),
    createBaseActions('tests', 'name')
)


export const BusinessImportanceChoiceStore = types.model('BusinessImportanceChoiceStore', {
    choices: types.array(BusinessImportanceChoice)
}).views(self => ({

})).actions(self => ({
    parseChoice(obj) {
        return BusinessImportanceChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
    },

    addChoice(object) {
        self.choices.push(self.parseChoice(object))
    },

    addChoices(data) {
        data.map(choice => {
            self.addChoice(choice)
        })
    },

    setChoice(choice) {
        // Replace old instance if the id's are the same
        // Add new one if there are no managers with this id
        let oldChoice = self.choices.find(obj => obj.name === choice.name)
        if (oldChoice) {
            self.oldChoice = self.parseChoice(choice)
        } else{
            self.addChoice(choice)
        }
    },

    setChoices(data) {
        data.map(choice => {
            self.setChoice(choice)
        })
    },
}))

export const ResourceChoiceStore = types.model('ResourceChoiceStore', {
    choices: types.array(ResourceChoice)
}).views(self => ({

})).actions(self => ({
    parseChoice(obj) {
        return ResourceChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
    },

    addChoice(object) {
        self.choices.push(self.parseChoice(object))
    },

    addChoices(data) {
        data.map(choice => {
            self.addChoice(choice)
        })
    },

    setChoice(choice) {
        // Replace old instance if the id's are the same
        // Add new one if there are no managers with this id
        let oldChoice = self.choices.find(obj => obj.name === choice.name)
        if (oldChoice) {
            self.oldChoice = self.parseChoice(choice)
        } else{
            self.addChoice(choice)
        }
    },

    setChoices(data) {
        data.map(choice => {
            self.setChoice(choice)
        })
    },
}))

export const StageChoiceStore = types.model('StageChoiceStore', {
    choices: types.array(StageChoice)
}).views(self => ({

})).actions(self => ({
    parseChoice(obj) {
        return StageChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
    },

    addChoice(object) {
        self.choices.push(self.parseChoice(object))
    },

    addChoices(data) {
        data.map(choice => {
            self.addChoice(choice)
        })
    },

    setChoice(choice) {
        // Replace old instance if the id's are the same
        // Add new one if there are no managers with this id
        let oldChoice = self.choices.find(obj => obj.name === choice.name)
        if (oldChoice) {
            self.oldChoice = self.parseChoice(choice)
        } else{
            self.addChoice(choice)
        }
    },

    setChoices(data) {
        data.map(choice => {
            self.setChoice(choice)
        })
    },
}))

export const StatusChoiceStore = types.model('StatusChoiceStore', {
    choices: types.array(StatusChoice)
}).views(self => ({

})).actions(self => ({
    parseChoice(obj) {
        return StatusChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
    },

    addChoice(object) {
        self.choices.push(self.parseChoice(object))
    },

    addChoices(data) {
        data.map(choice => {
            self.addChoice(choice)
        })
    },

    setChoice(choice) {
        // Replace old instance if the id's are the same
        // Add new one if there are no managers with this id
        let oldChoice = self.choices.find(obj => obj.name === choice.name)
        if (oldChoice) {
            self.oldChoice = self.parseChoice(choice)
        } else{
            self.addChoice(choice)
        }
    },

    setChoices(data) {
        data.map(choice => {
            self.setChoice(choice)
        })
    },
}))
