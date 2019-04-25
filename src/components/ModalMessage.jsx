import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { closeModal } from '../actions/modal';
import { withStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
  closeButton: {
    float: 'right',
  },
});

const ModalMessage = ({ classes, isOpen, title, message, closeModal }) => {
  return (
    <div>
      <Modal open={isOpen} onClose={() => closeModal()}>
        <div className={classes.modal}>
          <Typography variant="h6" id="modal-title" color={'secondary'}>
            {title}
          </Typography>
          <Typography variant="subtitle1">{message}</Typography>
          <Button className={classes.closeButton} onClick={() => closeModal()}>
            Close
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = state => ({
  isOpen: state.modal.isOpen,
  title: state.modal.title,
  message: state.modal.message,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeModal,
    },
    dispatch
  );

export default withStyles(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ModalMessage)
);
