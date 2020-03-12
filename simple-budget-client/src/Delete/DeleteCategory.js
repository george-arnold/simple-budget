import React, { Component } from 'react';
import './DeleteCategory.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import config from '../config';
import BudgetContext from '../BudgetContext'

class DeleteCategory extends Component {
  static contextType = BudgetContext;

  handleDeleteCategory = event => {
    event.preventDefault();
    const categoryId = this.props.id;
    fetch(`${config.API_ENDPOINT}/transactions/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
        // Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) return res.json().then(e => Promise.reject(e));
        return res.json();
      })
      .then(() => {
        this.context.deleteCategory(categoryId);
      })
      .catch(error => {
        console.error({ error });
      });
  };
  render() {
    return (
      <div>
        <button className="Trash" onClick={this.handleDeleteCategory}>
          {' '}
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

export default DeleteCategory;
