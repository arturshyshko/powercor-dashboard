export const projectName = {
    name: 'Project',
    value: project => `${project.network} ${project.name}`,
    style: {whiteSpace: 'noWrap'},
}

export const projectManager = {
    name: 'DM',
    value: project => project.manager.initials.split('.').join(''),
}
