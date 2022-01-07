<template>
<div class="main">
  <div id="optionsContainer">
    <form>
      <div class="form-group">
        <label for="statusSelect">Status by</label>
        <select class="form-control" id="statusSelect">
          <option value=null></option>
          <option value="IDEA">Idea</option>
          <option value="TODONEXT">ToDo Next</option>
          <option value="DOING">Doing</option>
          <option value="INREVIEW">In Review</option>
          <option value="DONE">Done</option>
        </select>
      </div>
      <div class="form-group">
        <label for="sort">Sort by</label>
        <select class="form-control" id="sort">
          <option value=null></option>
          <option value="deadline">Deadline</option>
          <option value="status">Status</option>
        </select>
      </div>
      <md-button class="btn btn-primary md-button">Apply</md-button>
      <md-button class="btn btn-secondary md-button">Clear</md-button>
    </form>
  </div>
  <div id="tableContainer">
    <table id="dataTable" class="table md-table "></table>
  </div>
</div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "Main",
  data() {
    return {
      tasks: []
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
      var table = document.getElementById("dataTable");
      var tr;
      var th;
      var tableCell;
      table.innerHTML = "";
      tr = table.insertRow(-1);
      for (const header in this.tasks[0]) {
        th = document.createElement("th");
        th.innerHTML = header;
        tr.appendChild(th);
      }
      console.log(this.tasks);
      for (const row in this.tasks) {
        console.log(row);
        tr = table.insertRow(-1);
        switch(this.tasks[row]["status"]) {
          case "IDEA":
            tr.className = ".bg-info";
            break;
          case "TODONEXT":
            tr.className = ".bg-warning";
            break;
          case "DOING":
            tr.className = ".bg-danger";
            break;
          case "DONE":
            tr.className = ".bg-success";
            break;
          case "INREVIEW":
            tr.className = ".bg-secondary";
            break;
          default:
            break;
        }
        for (const cell in this.tasks[row]) {
          console.log(cell);
          tableCell = tr.insertCell(-1);
          tableCell.innerHTML = this.tasks[row][cell];
        }
      }
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
  #optionsContainer div {
    display: inline-flex;
    width: 45%;
  }
  #optionsContainer  {
    padding: 0;
    margin-bottom: 20px;
  }
  #optionsContainer div label {
    width: fit-content;
    margin-top: 3px;
    margin-right: 15px;
  }
  #optionsContainer button {
    margin: 2px 5px;
  }
  select {
    width: 30%;
  }
</style>