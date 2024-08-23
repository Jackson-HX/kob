<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link class = "navbar-brand" active-class="active" :to="{ name: 'home'}">KOB</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarText">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link class = "nav-link" active-class="active" :to="{ name: 'pk_index' }">PK</router-link>
            </li>
            <li class="nav-item">
              <router-link class = "nav-link" active-class="active" :to="{ name: 'rank_index' }">RankList</router-link>
            </li>
            <li class="nav-item">
              <router-link class = "nav-link" active-class="active" :to="{ name: 'record_index' }">RecordList</router-link>
            </li>
          </ul>
        </div>

        <ul class="navbar-nav" v-if="$store.state.user.is_login">
           <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="nvabarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ $store.state.user.username }}
              </a>
              <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                    <router-link class = "dropdown-item" active-class="active" :to="{ name: 'user_bot_index' }">My Bot</router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#" @click="logout">Log Out</a></li>
              </ul>
            </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'user_login_index' }" role="button">
              Log In
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'user_register_index' }" role="button">
              Register
            </router-link>
          </li>
        </ul>
  
      

      </div>
    </nav>
</template>

<script>

import { useStore } from 'vuex';
export default {
  setup() {
    const store = useStore();

    const logout = () => {
      store.dispatch("logout");
    }

    return {
      logout
    }
  }
}

</script>

<style scoped>
</style>