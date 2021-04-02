<!-- xlsx.js (C) 2013-present  SheetJS -- http://sheetjs.com -->
<template>
  <div @drop="_drop" @dragenter="_suppress" @dragover="_suppress">
    <div class="row">
      <div class="col-xs-12">
        <form class="form-inline">
          <div class="form-group">
            <label for="file">Spreadsheet</label>
            <input type="file" class="form-control" id="file" :accept="SheetJSFT" @change="_change"/>
          </div>
        </form>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <button :disabled="data.length ? false : true" class="btn btn-success" @click="_export">Export</button>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="table-responsive">
          <table class="table table-striped" cellspacing="0" cellpadding="0" border="1">
            <thead>
            <tr>
              <th v-for="c in cols" :key="c.key">{{c.name}}</th>
            </tr>



            </thead>

            <tbody>
            <tr v-for="(r, key) in data" :key="key">
              <td v-for="c in cols" :key="c.key"  :rowspan="[r[c.key + 'rowspan']]" v-if="r[c.key]"> {{ c.key + ': '  + r[c.key] }}</td>
            </tr>
            </tbody>

          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import XLSX from 'xlsx';
  import jsonData from '../assets/json/data1.json';
  // import jsonData from '../assets/json/new2.json';

  console.log('mylog', XLSX);
  console.log('mylog', jsonData);



  const make_cols = refstr => Array(XLSX.utils.decode_range(refstr).e.c + 1).fill(0).map((x, i) => ({
    name: XLSX.utils.encode_col(i),
    key: i
  }));

  const _SheetJSFT = [
    "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
  ].map(function (x) {
    return "." + x;
  }).join(",");
  export default {
    data() {
      return {
        data: jsonData,
        cols: [
          {name: "序号", key: 'sortNo'},
          {name: "name", key: 'name'},
          {name: "costNum", key: 'costNum'},
          {name: "elementId", key: 'elementId'},
          {name: "remark", key: 'remark'},
        ],
        SheetJSFT: _SheetJSFT
      };
    },
    methods: {
      _suppress(evt) {
        evt.stopPropagation();
        evt.preventDefault();
      },
      _drop(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        const files = evt.dataTransfer.files;
        if (files && files[0]) this._file(files[0]);
      },
      _change(evt) {
        const files = evt.target.files;
        if (files && files[0]) this._file(files[0]);
      },
      _export(evt) {
        debugger;
        /* convert state to workbook */
        const ws = XLSX.utils.aoa_to_sheet(this.data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate file and send to client */
        XLSX.writeFile(wb, "sheetjs.xlsx");
      },
      _file(file) {
        /* Boilerplate to set up FileReader */
        const reader = new FileReader();
        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, {type: 'binary'});
          /* Get first worksheet */
          const wsname = wb.SheetNames[0];
          const ws = wb.Sheets[wsname];
          /* Convert array of arrays */
          const data = XLSX.utils.sheet_to_json(ws, {header: 1});
          /* Update state */
          this.data = data;
          this.cols = make_cols(ws['!ref']);
        };
        reader.readAsBinaryString(file);
      }
    }
  };
</script>
