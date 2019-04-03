import React, { Fragment } from "react";
import { observer, inject } from "mobx-react";

import DisciplineForm from './DisciplineForm'


@inject('store')
@observer
class DisciplineEdit extends React.Component {
    render() {
        return (
            <DisciplineForm/>
        )
    }
}

export default DisciplineEdit;
