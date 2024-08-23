<template>
    <ContentField v-if="!$store.state.user.pulling_info">
        <div class="row justify-content-md-center">
            <div class="col-3">
                <form @submit.prevent="login">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input v-model="username" type="text" class="form-control" id="username" placeholder="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input v-model="password" type="text" class="form-control" id="password" placeholder="password">
                    </div>
                    <div class="error-message">{{ error_message }}</div>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    </ContentField>
</template>

<script>
import ContentField from "../../../components/ContentField"
import {useStore} from 'vuex'
import {ref} from 'vue'
import router from '../../../router/index'

export default {
    components: {
        ContentField
    },
    setup() {
        const store = useStore();
        let username = ref('');
        let password = ref('');
        let error_message = ref('');

        const jwt_token = localStorage.getItem("jwt_token");
        if (jwt_token) {
            store.commit("updateToken", jwt_token);
            store.dispatch("getinfo", {
                success() {
                    router.push({ name: "home"});
                    store.commit("updatePulling", false);
                },
                error() {
                    store.commit("updatePulling", false);
                }
            });
        } else {
            store.commit("updatePulling", false);
        }

        const login = () => {
            error_message.value = "";
            store.dispatch("login", {
                username: username.value,
                password: password.value,
                success() {
                    store.dispatch("getinfo", {
                        success() {
                            router.push({ name: 'home' });
                            console.log(store.state.user);
                        }
                    })
                },
                error() {
                    console.log("invalid username or password");
                }
            })
        }

        return {
            username,
            password,
            error_message,
            login,
        }
    }
}
</script>

<style scoped>
button {
    widows: 80%;
}
div.error-message {
    color: red;
}
</style>
