<template>
<div class="main container">
  <div id="optionsContainer" class="row">
    <form class="row">
      <div class="form-group col col-4" id="filter">
        <label for="statusSelect">Status Filter</label>
        <select class="form-select" id="statusSelect" v-model="filter">
          <option value=null disabled selected>select...</option>
          <option value="IDEA">Idea</option>
          <option value="TODONEXT">ToDo Next</option>
          <option value="DOING">Doing</option>
          <option value="INREVIEW">In Review</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <div class="form-group col col-4" id="sorting">
        <label for="sort">Sort by</label>
        <select class="form-select" id="sort" v-model="sort">
          <option value=null disabled selected>select...</option>
          <option value="deadline">Deadline</option>
          <option value="status">Status</option>
        </select>
      </div>
      <div class="col col-2">
        <button class="btn btn-primary" @click="applyFilters">Apply</button>
        <button class="btn btn-secondary" @click="clear">Clear</button>
      </div>
    </form>
  </div>
  <div id="tableContainer" class="md-content">
    <table id="dataTable" class="table table-hover">
    </table>
  </div>
</div>
</template>

<script>
import DataService from "@/services/DataService";
import $ from 'jquery'
import dateformat from "dateformat";
export default {
  name: "Main",
  data() {
    return {
      tasks: [],
      sort: null,
      filter: null
    }
  },
  methods: {
    getData() {
      DataService.getTasks().then(response => {
        this.tasks = response.data;
        this.generateTable();
      })
    },
    // eslint-disable-next-line no-unused-vars
    getDataSortedAndFiltered(sort, filter) {
      if(sort != null && filter != null) {
        DataService.getTasksSortedAndFiltered(sort, filter).then(response => {
          this.tasks = response.data;
        })
      } else if(sort === null) {
        DataService.getTasksFiltered(filter).then(response => {
          this.tasks = response.data;
        })
      } else {
        DataService.getTasksSorted(sort).then(response => {
          this.tasks = response.data;
        })
      }
      this.generateTable();
    },
    generateTable() {
      const table = document.getElementById("dataTable");
      table.innerHTML = "";
      let tr;
      let th;
      let tableCell;
      let hiddenRow;
      let details;
      let body;
      const nextMonth = new Date().setDate(new Date().getDate() + 30);
      const nextWeek = new Date().setDate(new Date().getDate() + 7);

      console.log(this.tasks);


      for (const row in this.tasks) {
        let id = this.tasks[row]['id'];
        tr = table.insertRow(-1);
        tr.setAttribute("data-toggle","collapse");
        tr.setAttribute("data-target","#detailsTask"+row);
        hiddenRow = table.insertRow(-1);

        hiddenRow.className = "p";
        details = hiddenRow.insertCell(-1);
        details.setAttribute("colspan","6");
        details.className = "hiddenRow";
        details.style.display = "none";
        body = document.createElement("div");
        body.className = "accordion-body collapse p-3 md-card";
        body.id = "detailsTask"+row;
        body.appendChild(document.createElement("div")).outerHTML="<div class='md-card-content'>"+this.tasks[row]["longDesc"]+"</div>";
        let buttonContainer = body.appendChild(document.createElement("md-card-actions"))
        let link = buttonContainer.appendChild(document.createElement("a"));
        let editButton = document.createElement("button");
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML="Delete Task";
        editButton.innerHTML="Edit Task";
        editButton.className="btn-primary btn-sm";
        deleteButton.className="btn-sm btn-danger delete-button";
        deleteButton.addEventListener("click", function () {
          if (confirm("Are you sure?")) {
            DataService.deleteTask(id);
            window.location.reload();
          } else {
            console.log("Deletion of task "+id+" aborted");
          }
        });
        editButton.setAttribute('type', 'button');
        buttonContainer.appendChild(deleteButton);
        link.setAttribute('href','#/edit/'+this.tasks[row]['id']);
        link.appendChild(editButton);

        details.appendChild(body);

        const deadline = new Date(this.tasks[row]["deadline"]);

        if(deadline < nextWeek && this.tasks[row]["status"] !== "DONE") {
          tr.className = "accordion-toggle bg-danger";
        } else if(deadline < nextMonth && this.tasks[row]["status"] !== "DONE") {
          tr.className = "accordion-toggle bg-warning";
        } else if(this.tasks[row]["status"] === "DONE") {
          tr.className = "accordion-toggle bg-success";
        } else {
          tr.className = "accordion-toggle bg-secondary";
        }

        for (const cell in this.tasks[row]) {
          if(cell === "longDesc" || cell === "id")
            continue; //skip

          tableCell = tr.insertCell(-1);
          if(cell === "deadline")
            tableCell.innerHTML = dateformat(deadline, "dd.mm.yyyy");
          else
            tableCell.innerHTML = this.tasks[row][cell];
        }
      }
      const thead = table.createTHead();

      tr = thead.insertRow(0);

      for (const header in this.tasks[0]) {
        if(header === "longDesc" || header === "id")
          continue;
        th = document.createElement("th");
        th.innerHTML = header;
        tr.appendChild(th);
      }
      $('.accordion-toggle').click(function(){
        $('.hiddenRow').hide();
        $('.hiddenRow').find('.accordion-body').addClass('collapse');
        $(this).next('tr').find('.hiddenRow').show();
        $(this).next('tr').find('.hiddenRow').find('.accordion-body').removeClass('collapse');
      });
    },
    applyFilters() {
      if(this.sort && this.filter) {
        DataService.getTasksSortedAndFiltered(this.sort, this.filter).then(response => {
          this.tasks = response.data;
          this.generateTable();
        })
      } else if(this.sort) {
        DataService.getTasksSorted(this.sort).then(response => {
          this.tasks = response.data;
          this.generateTable();
        })
      } else if(this.filter) {
        DataService.getTasksFiltered(this.filter).then(response => {
          this.tasks = response.data;
          this.generateTable();
        })
      }
    },
    clear() {
      this.filter = null;
      this.sort = null;
      this.getData();
    }
  },
  mounted(){
    this.getData();
  }
}
</script>

<style scoped>
  #tableContainer {
    align-items: center;
    display: flex;
    justify-content: center;
  }
  #optionsContainer {
    margin-bottom: 10px;
  }
  .form-group {
    display: inline-flex;
  }
  .form-group label {
    align-self: center;
    width: 50%;
  }
  div button {
    margin: 2px 5px;
    align-self: center;
  }
</style>
