import { observable, computed, toJS } from 'mobx'


class History {
    @observable snapshots = []
    @observable currentSnapshotNumber = null

    constructor(snapshots=[], currentSnapshotNumber=null) {
        this.snapshots=snapshots
        this.currentSnapshotNumber=currentSnapshotNumber
    }

    @computed get current() {
        return this.snapshots[this.currentSnapshotNumber]
    }

    set current(number) {
        this.currentSnapshotNumber = number
    }

    pop() {
        if (this.snapshots.length !== 0) {
            if (this.currentSnapshotNumber != null) {
                this.currentSnapshotNumber -= 1
                return this.current
            }
        }

        return null
    }

    push(snapshot) {
        const clone = snapshot
        this.snapshots.push(clone)
        this.currentSnapshotNumber += 1

        return snapshot
    }

    get toJSON() {
        return this.snapshots.map(snapshot => snapshot.toJSON)
    }
}

export default History
