<template>
    <div class="container">
      <div class="row">

        <div class="col-3">
          <div class="card" style="margin-top: 20px;">
            <div class="card-body">
              <img :src="$store.state.user.photo" alt="" style="width: 100%;">
            </div>
          </div>
        </div>

        <div class="col-9">
          <div class="card" style="margin-top: 20px;">
            <div class="card-header">
              <span style="font-size: 120%">My Bot</span>
              <button type="button" class="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#add-bot-btn">
                Create Bot
              </button>

              <!-- Modal -->
              <div class="modal fade" id="add-bot-btn" tabindex="-1">
                <div class="modal-dialog modal-xl">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="exampleModalLabel">Create Bot</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                      <div class="mb-3">
                        <label for="add-bot-title" class="form-label">Bot Name</label>
                        <input v-model="addedbot.title" type="text" class="form-control" id="add-bot-title" placeholder="Enter a Bot Name">
                      </div>
                      <div class="mb-3">
                        <label for="add-bot-description" class="form-label">Bot Description</label>
                        <textarea v-model="addedbot.description" class="form-control" id="add-bot-description" rows="3" placeholder="Enter bot description"></textarea>
                      </div>
                      <div class="mb-3">
                        <label for="add-bot-code" class="form-label">Bot Code</label>
                       <VAceEditor
                          v-model:value="addedbot.content"
                          @init="editorInit"
                          lang="c_cpp"
                          theme="textmate"
                          style="height: 300px" />
                      </div>

                    </div>
                    <div class="modal-footer">
                      <div class="error-message">{{ addedbot.error_message }}</div>
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-primary" @click="add_bot">Submit</button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div class="card-body">
              <table class="table table-hover">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>CreatedTime</th>
                    <th>Control</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="bot in bots" :key="bot.id">
                    <td>{{ bot.title }}</td>
                    <td>{{ bot.createtime }}</td>
                    <td>
                      <button type="button" class="btn btn-secondary" style="margin-right: 10px;" data-bs-toggle="modal" :data-bs-target="'#update-bot-modal-' + bot.id">Update</button>
                      <button type="button" class="btn btn-danger" @click="remove_bot(bot)">Delete</button>

                      <div class="modal fade" :id="'update-bot-modal-' + bot.id" tabindex="-1">
                        <div class="modal-dialog modal-xl">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h1 class="modal-title fs-5" id="exampleModalLabel">Update Bot</h1>
                              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">

                              <div class="mb-3">
                                <label for="add-bot-title" class="form-label">Bot Name</label>
                                <input v-model="bot.title" type="text" class="form-control" id="add-bot-title" placeholder="Enter a Bot Name">
                              </div>
                              <div class="mb-3">
                                <label for="add-bot-description" class="form-label">Bot Description</label>
                                <textarea v-model="bot.description" class="form-control" id="add-bot-description" rows="3" placeholder="Enter bot description"></textarea>
                              </div>
                              <div class="mb-3">
                                <label for="add-bot-code" class="form-label">Bot Code</label>
                                <VAceEditor
                                    v-model:value="bot.content"
                                    @init="editorInit"
                                    lang="c_cpp"
                                    theme="textmate"
                                    style="height: 300px" />
                              </div>

                            </div>
                            <div class="modal-footer">
                              <div class="error-message">{{ bot.error_message }}</div>
                              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="refresh_bots">Cancel</button>
                              <button type="button" class="btn btn-primary" @click="update_bot(bot)">Submit Update</button>
                            </div>
                          </div>
                        </div>
                      </div>


                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
import { ref } from 'vue'
import $ from 'jquery'
import { useStore } from 'vuex'
import { Modal } from 'bootstrap/dist/js/bootstrap'
import { VAceEditor } from 'vue3-ace-editor';
import ace from 'ace-builds';

export default {
  components: {
    VAceEditor,
  },

  setup() {
    ace.config.set(
      "basePath",
      "https://cdn.jsdelivr.net/npm/ace-builds@" + require('ace-builds').version + "/src-noconflict/")

    const store = useStore();
    const bots = ref([]);

    const addedbot = ({
      title: "",
      description: "",
      content: "",
      error_message: "",
    });

    const refresh_bots = () => {
      $.ajax({
        url: "http://127.0.0.1:3000/user/bot/getlist/",
        type: "get",
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          bots.value = resp;
        },
      })
    }

    refresh_bots();

    const add_bot = () => {
      addedbot.error_message = "";
      $.ajax({
        url: "http://127.0.0.1:3000/user/bot/add/",
        type: "post",
        data: {
          title: addedbot.title,
          description: addedbot.description,
          content: addedbot.content,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if (resp.error_message === "success") {
            addedbot.title = "";
            addedbot.description = "";
            addedbot.content = "";
            Modal.getInstance("#add-bot-btn").hide();
            refresh_bots();
          } else {
            addedbot.error_message = resp.error_message;
          }
        },
      })
    }

    const update_bot = (bot) => {
      addedbot.error_message = "";
      $.ajax({
        url: "http://127.0.0.1:3000/user/bot/update/",
        type: "post",
        data: {
          bot_id: bot.id,
          title: bot.title,
          description: bot.description,
          content: bot.content,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if (resp.error_message === "success") {
            Modal.getInstance('#update-bot-modal-' + bot.id).hide();
            refresh_bots();
          } else {
            addedbot.error_message = resp.error_message;
          }
        },
      })

    }

    const remove_bot = (bot) => {
      $.ajax({
        url: "http://127.0.0.1:3000/user/bot/remove/",
        type: "post",
        data: {
          bot_id: bot.id,
        },
        headers: {
          Authorization: "Bearer " + store.state.user.token,
        },
        success(resp) {
          if (resp.error_message === "success") {
            refresh_bots();
          } else {
            addedbot.error_message = resp.error_message;
          }
        },
      })
    }
    
    
    

    return {
      bots,
      addedbot,
      add_bot,
      update_bot,
      remove_bot,
    }
  }

}
</script>

<style scoped>
div.error-message {
  color: red;
}
</style>
