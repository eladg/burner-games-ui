import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-flexbox-grid';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this._isDrawReady = this._isDrawReady.bind(this);
  }

  _isDrawReady() {
    return (this.props.categories != undefined)
  }

  categoryNameMap(name) {
    switch(name) {
      case "leave_no_trace":
        return "חשל״ש";
      case "media_rules":
        return "תקשורת"
      case "safe_zone":
        return "גופים והתמצאות באירוע"
      case "principles":
        return "עשרת העקרונות"
      case "survival_guide":
        return "מדריך הישרדות"
      default:
        throw new error("unknown category name");
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