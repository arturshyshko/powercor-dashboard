import { types } from 'mobx-state-tree'

import ManagerStore from '@store/manager'
import {
    BusinessImportanceChoiceStore, StatusChoiceStore, StageChoiceStore, ResourceChoiceStore
} from '@store/choice'
import ClientStore from '@store/client'
import ProjectStore from '@store/project'
import DisciplineStore from '@store/discipline'
import ApprovedVariationStore from '@store/approvedVariation'


const rootStore = types.model('root', {
    projectStore: types.optional(ProjectStore, {
        projects: []
    }),
    managerStore: types.optional(ManagerStore, {
        managers: []
    }),
    businessImportanceChoiceStore: types.optional(BusinessImportanceChoiceStore, {
        choices: []
    }),
    resourceChoiceStore: types.optional(ResourceChoiceStore, {
        choices: []
    }),
    stageChoiceStore: types.optional(StageChoiceStore, {
        choices: []
    }),
    statusChoiceStore: types.optional(StatusChoiceStore, {
        choices: []
    }),
    clientStore: types.optional(ClientStore, {
        clients: []
    }),
    disciplineStore: types.optional(DisciplineStore, {
        disciplines: []
    }),
    approvedVariationStore: types.optional(ApprovedVariationStore, {
        approvedVariations: []
    }),
})

const store = rootStore.create({})

export default store