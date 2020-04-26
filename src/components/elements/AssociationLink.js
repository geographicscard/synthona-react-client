import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  hideModal,
  markNodeView,
  deleteAssociationLink,
  removeFromAssociationList,
} from '../../redux/actions';
import { Link } from 'react-router-dom';
import './AssociationLinkList.less';

class AssociationLink extends Component {
  handleDeleteAssociation = () => {
    var modalNodeId = this.props.modalNodeId;
    var linkedNode = this.props.association.id;
    if (this.props.activeNode) {
      // store the active node
      var activeNode = this.props.activeNode.id;
    }
    // if both have values go ahead and delete the association
    if (modalNodeId && linkedNode) {
      this.props.deleteAssociationLink(modalNodeId, linkedNode);
      // handle removal from association list page
      if (activeNode && activeNode !== modalNodeId) {
        this.props.removeFromAssociationList(modalNodeId);
        this.props.hideModal();
      } else {
        this.props.removeFromAssociationList(linkedNode);
      }
    }
  };

  // render card types
  renderAssociationLink = (association) => {
    switch (association.type) {
      case 'text':
        return (
          <li className='association-list-item'>
            <button onClick={(e) => this.handleDeleteAssociation()}>x</button>
            <Link
              to={`/edit/text/${association.id}`}
              onClick={(e) => this.props.hideModal()}
              replace
              target='_blank'
            >
              {association.name}
            </Link>
          </li>
        );
      case 'image':
        return (
          <li className='association-list-item'>
            <button onClick={(e) => this.handleDeleteAssociation()}>x</button>
            <Link
              to={`/associations/${association.id}`}
              onClick={(e) => this.props.hideModal()}
              replace
              target='_blank'
            >
              {association.name}
            </Link>
          </li>
        );
      case 'url':
        return (
          <li className='association-list-item'>
            <button onClick={(e) => this.handleDeleteAssociation()}>x</button>
            <a
              href={association.summary}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => this.props.hideModal()}
              style={{ wordBreak: 'break-all' }}
            >
              {association.name}
            </a>
          </li>
        );
      case 'collection':
        return (
          <li className='association-list-item'>
            <button onClick={(e) => this.handleDeleteAssociation()}>x</button>
            <Link
              to={`/associations/${association.id}`}
              onClick={(e) => {
                this.props.markNodeView(this.props.association.id);
                this.props.hideModal();
              }}
              replace
              target='_blank'
            >
              {association.name}
            </Link>
          </li>
        );
      default:
        return;
    }
  };

  render() {
    return <div>{this.renderAssociationLink(this.props.association)}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    modalNodeId: state.modals.modalInfo.content.id,
    activeNode: state.nodes.activeNode,
  };
};

export default connect(mapStateToProps, {
  hideModal,
  markNodeView,
  deleteAssociationLink,
  removeFromAssociationList,
})(AssociationLink);