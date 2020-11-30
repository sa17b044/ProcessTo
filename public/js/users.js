    new Vue({
        el: '#app',
        data: {
            isEditing: false,
            user: '',
            pass: '',
            selected: '',
            users: [],
            selectedUser: null
        },

        methods: {
            storeUser() {
                newUser = {
                    user: this.user,
                    pass: this.pass,
                    selected: this.selected,
                };
                this.users.push(newUser);
                this.user = '';
                this.pass = '';
                this.selected = '';
            },

            removeUser(index) {
                this.users.splice(index, 1)
            },

            updateUser() {
                newUser = {
                    user: this.user,
                    pass: this.pass,
                    selected: this.selected,
                };
                this.users.splice(this.selectedIndex, 1, newUser)
                this.user = ''
                this.pass = ''
                this.selected = ''
                this.isEditing = false
            },

            editUser(index, user, pass, selected) {
                this.isEditing = true
                this.user = user
                this.pass = pass
                this.selected = selected
                this.selectedIndex = index
            },
            // storeUser2db() {

            // }
        }
    })