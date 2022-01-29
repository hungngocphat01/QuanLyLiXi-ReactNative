import {
  StyleSheet,
  ScrollView,
  View
} from 'react-native';

import { Table, Row, Rows } from 'react-native-table-component';

import { useSelector } from "react-redux";

export default function ReportScreen(props) {
  const recordList = useSelector(state => state.records);
  const categoryList = useSelector(state => state.categories);
  const nCategories = categoryList.length;

  // Create a counting matrix
  /*        GROUP1    GROUP2    GROUP3    (SUM)
      DAY1    x         x         x         x
      DAY2    x         x         x         x
      DAY3    x         x         x         x
      (SUM)   x         x         x         X
  */

  // Group by day first, then by category
  const counter = {};

  for (const record of recordList) {
    let { category, date, money } = record;
    // Only keep day and month, omit year
    date = date.split("/").slice(0, 2).join("/");

    if (date in counter) {
      if (category in counter[date]) {
        counter[date][category] += money;
      } else {
        counter[date][category] = money;
      }
    } else {
      counter[date] = {};
      counter[date][category] = money;
    }
  }
  console.log(JSON.stringify(counter));

  // Create category -> index mapper
  const categoryIndexMapper = {};
  let index = 1;
  for (const category of categoryList) {
    categoryIndexMapper[category] = index++;
  }
  // Generate data table
  const headerRow = ["", ...categoryList, "SUM"];
  const dataTable = [];

  console.log(categoryIndexMapper);

  // Each row = each day
  for (const [date, rowObject] of Object.entries(counter)) {
    const rowData = new Array(nCategories + 2).fill(0);
    rowData[0] = date;
    // Each column = each category
    for (const [category, money] of Object.entries(rowObject)) {
      const categoryIdx = categoryIndexMapper[category];
      rowData[categoryIdx] = money;
    }
    dataTable.push(rowData);
  }
  const nRows = dataTable.length;

  // Add SUM for each column
  dataTable.push(new Array(nCategories + 1).fill(""));
  dataTable[nRows][0] = "SUM";
  for (let i = 1; i < nCategories + 2; i++) {
    let categorySum = 0;
    for (let j = 0; j < nRows; j++) {
      categorySum += dataTable[j][i];
    }
    dataTable[nRows][i] = categorySum;
  }

  // Add SUM for each row
  for (let i = 0; i < nRows + 1; i++) {
    let rowSum = 0;
    for (let j = 1; j < nCategories + 1; j++) {
      rowSum += dataTable[i][j];
    }
    dataTable[i][nCategories + 1] = rowSum;
  }

  console.log(dataTable);
  
  return (
    <View style={styles.container}>
      <View>
        <Table borderStyle={styles.borderStyle}>
          <Row data={headerRow} style={styles.header} textStyle={styles.headerText}/>
          <Rows data={dataTable} style={styles.datarows} textStyle={styles.dataRowsText}/>
        </Table>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "lightslategrey",
    minHeight: 30
  },
  headerText: {
    fontWeight: "bold",
    textAlign: "center"
  },
  borderStyle: {
    borderWidth: 1
  },
  container: {
    flex: 1,
    padding: 10,
  },
  datarows: {
    minHeight: 30
  },
  dataRowsText: {
    textAlign: "center"
  }
});