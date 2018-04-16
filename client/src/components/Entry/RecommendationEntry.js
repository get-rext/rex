import React, { Component } from 'react';

class RecommendationEntry extends Component {
  render() {
    return (
      <form>
        <div>
          Recommended by:
          <input type="text" name="recommender" />
        </div>
        <div>
          Comments:
          <input type="text" name="comments" />
        </div>
        <div>
          <input type="submit" value="Save" />
        </div>
      </form>
    );
  }
}

export default RecommendationEntry;
