import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PropTypes from 'prop-types';

const byCounts = (a, b) => (a.counts < b.counts ? 1 : -1);

function StatesTable(props) {
  const { states } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>State</TableCell>
          <TableCell align="right">Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {states.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.id}
            </TableCell>
            <TableCell align="right">{row.counts}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

function TransitionTable(props) {
  const { links } = props;
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Source</TableCell>
          <TableCell>Target</TableCell>
          <TableCell align="right">Count</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {links.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.source}
            </TableCell>
            <TableCell>{row.target}</TableCell>
            <TableCell align="right">{row.counts}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default function TransitionGraphDetails(props) {
  const { nodes, links } = props;
  const sortedNodes = nodes.sort(byCounts);
  const sortedLinks = links.sort(byCounts);
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => setValue(newValue);

  return (
    <div className="transition-graph-details">
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange}>
          <Tab label="States" />
          <Tab label="Transitions" />
        </Tabs>
      </AppBar>
      {value === 0 && <StatesTable states={sortedNodes} />}
      {value === 1 && <TransitionTable links={sortedLinks} />}
    </div>
  );
}
