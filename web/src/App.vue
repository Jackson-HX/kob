<template>
  <NavBar></NavBar>
  <router-view></router-view>
</template>

<script>
import NavBar from '@/components/NavBar.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap"

export default {
  components: {
    NavBar
  },
  setup() {
    /*$.ajax({
      url: "http://127.0.0.1:3000/user/account/token/",
      type: "post",
      data: {
        username: "jks",
        password: "123"
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      }
    });*/
  

    /*$.ajax({
      url: "http://127.0.0.1:3000/user/account/info/",
      type: "get",
      headers: {
        Authorization: "Bearer " + "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI5ODA1OTAwMjViMzM0M2IxYTQ4ODVlMjE0MTQ2NzMwZiIsInN1YiI6IjEiLCJpc3MiOiJzZyIsImlhdCI6MTcyNDM1OTUyOCwiZXhwIjoxNzI1NTY5MTI4fQ.fu-b2RFqM5JnLC6V4QqYit4ruVCrqrgmqf7Y0LHPxMw"
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      }
    });*/

    /*$.ajax({
      url: "http://127.0.0.1:3000/user/account/register/",
      type: "post",
      data: {
        username: "yxc",
        password: "123",
        confirmedPassword: "123",
      },
      success(resp) {
        console.log(resp);
      },
      error(resp) {
        console.log(resp);
      }
    });*/
  }
}
</script>

<style>
body {
  background-image: url("@/assets/images/background.png");
  background-size: cover;
}
</style>
