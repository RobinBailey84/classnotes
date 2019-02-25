import React, { Component } from "react";
import CommentList from "../components/CommentList";

class CommentBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [
        { id: 1,
          author: "Brendan Eich",
          text: "Always bet on JavaScript."
        },
        { id: 2,
          author: "Reg Braithwaite",
          text: "The strength of JavaScript is that you can do anything. The weakness is that you will."
        }
      ]
    };
  }

  render() {
    return (
      <div className="comment-box">
        <h2>Comments</h2>
        <CommentList data={this.state.data} />
      </div>
    );
  }
}

export default CommentBox;
