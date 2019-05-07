import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { confirmDialog, hideDialog } from '../../redux/modules/confirmDialog';

const ConfirmDialog = ({
  title,
  contentText,
  isOpen,
  hideDialog,
  confirmDialog,
}) => (
  <div>
    <Dialog
      open={isOpen}
      onClose={() => hideDialog()}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {contentText}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => hideDialog()} color="primary">
          Disagree
        </Button>
        <Button onClick={() => confirmDialog()} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);

ConfirmDialog.defaultProps = {
  title: 'Are you agree?',
  contentText: null,
};

const mapStateToProps = state => ({
  isOpen: state.confirmDialog.isOpen,
});

const dispatchStateToProps = dispatch =>
  bindActionCreators(
    {
      hideDialog,
      confirmDialog,
    },
    dispatch
  );
export default connect(
  mapStateToProps,
  dispatchStateToProps
)(ConfirmDialog);
