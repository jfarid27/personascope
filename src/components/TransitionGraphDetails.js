import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PropTypes from 'prop-types';

const byCounts = (a, b) => (a.counts < b.counts ? 1 : -1);

export default function TransitionGraphDetails(props) {
  const { nodes, links } = props;
  const sortedNodes = nodes.sort(byCounts);
  const sortedLinks = links.sort(byCounts);
  return (
    <div className='transition-graph-details'>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>State</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedNodes.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.counts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Source</TableCell>
            <TableCell>Target</TableCell>
            <TableCell align="right">Count</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLinks.map(row => (
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
    </div>
  );
}
