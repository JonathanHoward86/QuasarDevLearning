<template>
  <div style="margin-top: 20px">
    <q-input type="file" outlined label="Upload Excel" @input="readExcel" />

    <!-- Display error if present -->
    <div v-if="error" class="q-mt-md text-negative">{{ error }}</div>

    <q-table
      v-if="tableRows.length > 0"
      :rows="tableRows"
      :columns="tableColumns"
      row-key="name"
    />
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      tableRows: [],
      tableColumns: [],
      error: "", // Add this for error messages
    };
  },
  methods: {
    readExcel(event) {
      const file = event.target.files[0];

      // File type check
      if (
        !file ||
        ![
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
        ].includes(file.type)
      ) {
        this.error = "Only .xlsx or .xls file formats are allowed.";
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "binary" });

          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];

          const rows = XLSX.utils.sheet_to_json(sheet);
          console.log("Parsed Rows:", rows); // Log the parsed rows

          if (rows.length) {
            this.tableRows = rows;

            this.tableColumns = Object.keys(rows[0]).map((key) => ({
              name: key,
              required: true,
              label: key,
              align: "left",
              field: key, // Directly use key as field name
            }));
          }
        } catch (err) {
          console.error("Error reading the file:", err);
        }
      };

      reader.onerror = function (event) {
        console.error(
          "File could not be read! Code " + event.target.error.code
        );
      };

      reader.readAsBinaryString(file);
    },
  },
};
</script>
