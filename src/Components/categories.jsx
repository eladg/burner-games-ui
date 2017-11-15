import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';
import config from '../config';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this._isDrawReady = this._isDrawReady.bind(this);
  }

  _isDrawReady() {
    return (this.props.categories != undefined)
  }

  categoryNameMap(name) {
    if ( 'categories_name_map' in config && name in config.categories_name_map ) {
      return config.categories_name_map[name];
    } else {
      throw new Error("unknown category name: " + name);
    }
  }

  render() {
    if (!this._isDrawReady()) {
      return(<div></div>);
    }

    const categoryItems = this.props.categories.map((category) =>
      <h1 className="category" key={category.category_id} >{this.categoryNameMap(category.name)}</h1>
    );

    return(
      <div className="categories-wrapper">
        {categoryItems}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    current_category: state.current_category,
    language: state.game.language,
  }
}
const mapDispatchToProps = (dispatch) => { return { dispatch } };

export default connect(mapStateToProps, mapDispatchToProps)(Categories);