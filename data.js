const ROLE = {
    ADMIN : 'admin',
    BASIC : 'basic'
}
module.exports = {
    ROLE : ROLE,
    uses:[
        {id: 1, name: admin, role:ROLE.ADMIN},
        {id: 2, name: rouser, role:ROLE.BASIC}
    ],
    projects:[
        {id: 1, name: admin, usersId:1},
        {id: 2, name: admin, usersId:2}
    ]
}