/*
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in the
 * Software without restriction, including without limitation the rights to use, copy,
 * modify, merge, publish, distribute, sublicense, and/or sell copies of the Software,
 * and to permit persons to whom the Software is furnished to do so, subject to the
 * following conditions:
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
 * CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
 * OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import {
  Button, ButtonGroup, Grid, Paper,
  Table, TableBody, TableContainer, TableCell, TableHead, TableRow, withStyles
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import * as actions from "../actions/Member";
import MemberForm from "./MemberForm";

const styles = theme => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem"
    }
  },
  paper: {
    marginBottom: theme.spacing(5),
    marginTop: theme.spacing(5),
    padding: theme.spacing(2)
  }
})

const MemberList = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0)

  useEffect(() => {
    props.listMembers()
  })

  const { addToast } = useToasts()

  const onDelete = id => {
    if (window.confirm('Are you sure to delete this member?'))
      props.deleteMember(id, () => addToast("Deleted successfully!", { appearance: 'info' }))
  }

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item md>
          <MemberForm {...({ currentId, setCurrentId })} />
        </Grid>
        <Grid item md>
          <TableContainer>
            <Table size="small">
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Member Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  props.Members.map((record, index) => {
                    return (<TableRow key={index} hover>
                      <TableCell>{record.name}</TableCell>
                      <TableCell>{record.emailAddress}</TableCell>
                      <TableCell>{record.phoneNumber}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button><EditIcon color="primary"
                            onClick={() => { setCurrentId(record.id) }} /></Button>
                          <Button><DeleteIcon color="secondary"
                            onClick={() => onDelete(record.id)} /></Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>)
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
}

const actionMappings = {
  deleteMember: actions.Delete,
  listMembers: actions.List
};

const stateMappings = state => ({
  Members: state.Member.list
});

export default connect(stateMappings, actionMappings)(withStyles(styles)(MemberList));