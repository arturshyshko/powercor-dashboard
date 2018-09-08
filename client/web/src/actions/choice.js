import store from '@store'
import { BusinessImportanceChoice, ResourcesChoice, StageChoice, StatusChoice } from '@store/choice'

// TODO
// Figure out how to use this method for the 4 methods below
// const setChoices = (data, store) => {
//     data.map(obj => {
//         let choice = Choice.create({
//             id: `${obj.id}`,
//             name: obj.name,
//             weight: obj.weight,
//         })
//         store.addChoice(choice)
//     })
// }

// export const setImportanceChoices = (data) => {
//     setChoices(data, store['BusinessImportanceChoiceStore'])
// }

// export const setResourceschoices = (data) => {
//     setChoices(data, store['ResourceschoiceStore'])
// }

// export const setStagechoices = (data) => {
//     setChoices(data, store['StagechoiceStore'])
// }

// export const setStatuschoices = (data) => {
//     setChoices(data, store['StatuschoiceStore'])
// }

export const setImportanceChoices = (data) => {
    data.map(obj => {
        let choice = BusinessImportanceChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
        store.businessImportanceChoiceStore.addChoice(choice)
    })
}

export const setResourcesChoices = (data) => {
    data.map(obj => {
        let choice = ResourcesChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
        store.resourcesChoice.addChoice(choice)
    })
}

export const setStageChoices = (data) => {
    data.map(obj => {
        let choice = StageChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
        store.stageChoice.addChoice(choice)
    })
}

export const setStatusChoices = (data) => {
    data.map(obj => {
        let choice = StatusChoice.create({
            name: obj.choice,
            weight: obj.weight,
        })
        store.statusChoice.addChoice(choice)
    })
}
