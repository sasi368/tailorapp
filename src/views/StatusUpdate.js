 import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';


export default class StatusUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ['OrderId', 'CustomerName', 'Service', 'Track'],
      DataTable: [
        ['0001', 'sasi', '3', '4'],
        ['0002', 'lokeshwaran', 'c', 'd'],
        ['0003', 'ramashraja', '3', '4'],
        ['0004', 'sivakumar', 'c', 'd'],
        ['0005', 'sakthi', '3', '4']
      ]
    }
  }

  render() {
    const state = this.state;
    return (
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1, borderColor: '#ffa1d2'}}>
          <Row data={state.HeadTable} style={styles.HeadStyle} textStyle={styles.TableText}/>
          <Rows data={state.DataTable} textStyle={styles.TableText}/>
        </Table>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff' 
  },
  HeadStyle: { 
    height: 80,
    alignContent: "center",
    backgroundColor: '#ffe0f0'
  },
  TableText: { 
    margin: 10
  }
});