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

        <ul class="navbar-nav">
           <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                JKS
              </a>
              <ul class="dropdown-menu">
                <li>
                    <router-link class = "dropdown-item" active-class="active" :to="{ name: 'user_bot_index' }">My Bot</router-link>
                </li>
                <li><hr class="dropdown-divider"></li>
                <li><a class="dropdown-item" href="#">Log Out</a></li>
              </ul>
            </li>
        </ul>


      </div>
    </nav>
</template>

<script>
</script>

<style scoped>
</style>