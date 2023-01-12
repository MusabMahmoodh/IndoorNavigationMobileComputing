import {View, Text} from 'react-native';
import React from 'react';
import {DataTable} from 'react-native-paper';

export default function DataRow() {
  return (
    <DataTable.Row>
      <DataTable.Cell>Frozen yogurt</DataTable.Cell>
      <DataTable.Cell numeric>159</DataTable.Cell>
      <DataTable.Cell numeric>6.0</DataTable.Cell>
    </DataTable.Row>
  );
}
