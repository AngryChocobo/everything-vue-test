<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <button @click="changeColor">改变颜色</button>
    <p>{{ currentColor }}</p>

    <button @click="deleteLastRow">删除最后一行</button>
    <p v-if="rowData">行数：{{ rowData.length }}</p>
    <button v-on:click="onBtStopEditing()">stop ()</button>
    <div>
      pageSize: <input v-model="pageSize" />

      《 page: <input v-model="page" />
      》

      <button v-on:click="jumpToPage()">jumpToPage ()</button>
      <button v-on:click="changePageSize()">changePageSize ()</button>
    </div>

    <div style="height: 100%; margin-top: 30px">
      <ag-grid-vue
        style="width: 600px; height: 300px"
        class="ag-theme-alpine"
        :columnDefs="columnDefs"
        @grid-ready="onGridReady"
        @cell-clicked="onCellClicked"
        :defaultColDef="defaultColDef"
        :rowData="rowData"
        :grid-options="gridOptions"
        :enableCellChangeFlash="true"
        :pagination-page-size="pageSize"
        :pagination="true"
        :suppress-pagination-panel="true"
        :suppress-scroll-on-new-data="true"
        @cellEditingStopped="onCellEditingStopped"
      ></ag-grid-vue>
    </div>
    <div class="wrapper">
      <nav>
        <RouterLink to="/" data-cy="routerlink-home">Home</RouterLink>
        <RouterLink to="/antdv" data-cy="routerlink-antdv">antdv</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script lang="ts">
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridVue } from "ag-grid-vue3";
import { CellClickedEvent } from "ag-grid-community";
import "ag-grid-enterprise";

import ColourCellRenderer from "./colourCellRendererVue.vue";

const colors = ["Red", "Green", "Blue"];

const data = Array.from(Array(20).keys()).map((val, index) => ({
  color1: colors[index % 3],
  color2: colors[index % 3],
  color3: colors[index % 3],
  description: index,
}));

export default {
  components: {
    "ag-grid-vue": AgGridVue,
    ColourCellRenderer,
  },
  data: function () {
    const gridApi: any = null;
    return {
      colorIndex: 0,
      columnDefs: [
        {
          headerName: "Text Editor",
          field: "color1",
          cellRenderer: "ColourCellRenderer",
          cellEditor: "agTextCellEditor",
          width: "400px",
        },
        {
          headerName: "Select Editor",
          field: "color2",
          cellRenderer: "ColourCellRenderer",
          cellEditor: "agSelectCellEditor",
          cellEditorParams: { values: colors },
          width: "200px",
        },
        {
          headerName: "Rich Select Editor",
          field: "color3",
          cellRenderer: "ColourCellRenderer",
          cellEditor: "agRichSelectCellEditor",
          cellEditorPopup: true,
          cellEditorParams: {
            values: colors,
            cellRenderer: "ColourCellRenderer",
          },
          width: "200px",
        },
        {
          headerName: "Large Text Editor",
          field: "description",
          // cellEditorPopup: true,
          cellEditor: "agLargeTextCellEditor",
          flex: 2,
          width: "200px",
        },
      ],
      gridApi,
      columnApi: null,
      defaultColDef: {
        flex: 1,
        resizable: true,
        editable: true,
      },
      rowData: [] as typeof data,
      gridOptions: {},
      pageSize: 5,
      page: 0,
    };
  },
  created() {
    this.rowData = data;
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
      setTimeout(() => {
        // this.gridApi.setRowData(this.rowData);
        // this.colorIndex++;
        // this.colorIndex = this.colorIndex % 3;
        this.rowData[0].color1 = this.currentColor;
        debugger;
        // this.gridApi.sizeColumnsToFit();
      }, 3000);
    },

    onCellClicked(e: CellClickedEvent) {
      // debugger;
    },

    changeColor() {
      this.colorIndex++;
      this.colorIndex = this.colorIndex % 3;
      this.rowData[0].color1 = this.currentColor;
      if (this.gridApi) {
        this.gridApi.refreshCells();
      }
    },
    deleteLastRow() {
      this.rowData.pop();
    },
    onBtStopEditing() {
      this.gridApi.stopEditing();
    },
    onCellEditingStopped(event: any) {
      // store.commit('setEditingHighPerformanceSubtableCell', {
      // 	subTableId: props.instance.id,
      // 	rowIndex: event.rowIndex,
      // 	colField: (event as any).colDef.field,
      // })
    },

    onBtFirst() {
      this.gridApi.paginationGoToFirstPage();
    },
    onBtLast() {
      this.gridApi.paginationGoToLastPage();
    },
    onBtNext() {
      this.gridApi.paginationGoToNextPage();
    },
    onBtPrevious() {
      this.gridApi.paginationGoToPreviousPage();
    },
    onBtPageFive() {
      // we say page 4, as the first page is zero
      this.gridApi.paginationGoToPage(4);
    },
    jumpToPage() {
      // we say page 49, as the first page is zero
      this.gridApi.paginationGoToPage(Number(this.page));
    },
    changePageSize() {
      // we say page 49, as the first page is zero
      this.gridApi.paginationSetPageSize(Number(this.pageSize));
    },
  },

  computed: {
    currentColor() {
      return colors[this.colorIndex];
    },
  },

  mounted() {
    // const id = setInterval(() => {
    //   if (this.rowData.length) {
    //     this.rowData.pop();
    //     nextTick(() => {
    //       const aa = this.gridApi;
    //       const go: any = this.gridOptions;
    //       go.api.setRowData(go.rowData);
    //     });
    //     // debugger;
    //     // this.gridApi.refreshCells({
    //     //   force: true,
    //     //   suppressFlash: true,
    //     // });
    //     // this.gridOptions.api.setRowData(this.gridOptions.rowData)
    //   } else {
    //     clearInterval(id);
    //   }
    // }, 500);
  },
};
</script>

<style scoped></style>
