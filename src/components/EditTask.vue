<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateTask">
      <md-card class="row">
        <md-card-header>
          <div class="md-title">Edit Task</div>
        </md-card-header>

        <md-card-content>
          <md-field :class="getValidationClass('title')">
            <label>Titel</label>
            <md-input v-model="form.title"></md-input>
          </md-field>
          <md-field :class="getValidationClass('shortDesc')">
            <label>Kurzbeschreibung</label>
            <md-input v-model="form.shortDesc"></md-input>
            <span class="md-helper-text">Max 100 Characters</span>
          </md-field>
          <md-field :class="getValidationClass('longDesc')">
            <label>Beschreibung</label>
            <md-input v-model="form.longDesc"></md-input>
          </md-field>

          <md-field :class="getValidationClass('status')">
            <label>Status</label>
            <md-select placeholder="Status" name="status" id="status" v-model="form.status">
              <md-option value="IDEA">Idea</md-option>
              <md-option value="TODONEXT">ToDo Next</md-option>
              <md-option value="DOING">Doing</md-option>
              <md-option value="INREVIEW">In Review</md-option>
              <md-option value="DONE">Done</md-option>
            </md-select>
          </md-field>

          <md-datepicker v-model="form.deadline" :class="getValidationClass('deadline')" :md-disabled-dates="disabledDates">
            <label>Fälligkeit</label>
          </md-datepicker>

          <md-autocomplete v-model="form.contactMail" :md-options="emails" :class="getValidationClass('contactMail')">
            <label>Kontakt</label>
            <template slot="md-autocomplete-item" slot-scope="{ item, term }">
              <md-highlight-text :md-term="term">{{ item }}</md-highlight-text>
            </template>

            <template slot="md-autocomplete-empty" slot-scope="{ term }">
              No email address matching "{{ term }}" were found.
            </template>
          </md-autocomplete>

          <md-field :class="getValidationClass('url')">
            <label>URL</label>
            <md-input v-model="form.url"></md-input>
            <span class="md-helper-text">URL zu einem Papier / Dokument / Referenz</span>
          </md-field>
        </md-card-content>
        <md-card-actions>
          <md-button type="submit" class="md-primary">Save</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>
<script>
import DataService from "@/services/DataService";
import {validationMixin} from "vuelidate";
import {email, maxLength, required} from "vuelidate/lib/validators";
import dateformat from "dateformat";

export default {
  name: "EditTask",
  mixins: [validationMixin],
  props: {
    task: Object
  },
  data() {
    return {
      emails: [],
      form: {
        id: null,
        title: null,
        shortDesc: null,
        longDesc: null,
        status: null,
        deadline: null,
        contactMail: null,
        url: null
      },
      disabledDates: date => {
        return date < new Date()
      }
    };
  },
  methods: {
    getTask() {
      this.task = DataService.getTaskById(this.$route.params.id)
          .then(response => {
            console.log(response.data)
            this.form.id = response.data.id;
            this.form.title = response.data.title;
            this.form.shortDesc = response.data.shortDesc;
            this.form.longDesc = response.data.longDesc;
            this.form.status = response.data.status;
            this.form.contactMail = response.data.contactMail;
            this.form.deadline = new Date(response.data.deadline);
            this.form.url = response.data.url;
          })
          .catch(e => {
            console.error(e);
          });
    },
    getEmails() {
      DataService.getTasks().then(response => {
        this.tasks = response.data;
        for(const row in this.tasks) {
          this.emails.push(this.tasks[row]['contactMail']);
        }
      });
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName]

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        }
      }
    },
    validateTask () {
      this.$v.$touch()
      this.task.id = this.form.id
      this.task.title = this.form.title;
      this.task.shortDesc = this.form.shortDesc;
      this.task.longDesc = this.form.longDesc;
      this.task.status = this.form.status;
      this.task.contactMail = this.form.contactMail;
      this.task.deadline = dateformat(this.form.deadline, "dd-mm-yyyy HH:MM:ss");
      this.task.url = this.form.url;
      console.log(this.task);
      if (!this.$v.$invalid) {
        DataService.editTask(this.task).then(response => {
          console.log(response)
        })
      }
    }
  },
  mounted() {
    this.getTask(this.$route.params.id);
  },
  validations: {
    form: {
      title: {
        required
      },
      shortDesc: {
        required,
        maxLength: maxLength(100)
      },
      longDesc: {
        required
      },
      status: {
        required
      },
      deadline: {
        required
      },
      url: {
        required
      },
      contactMail: {
        required,
        email
      }
    }
  }
}
</script>

<style scoped>

</style>