/* globals React */

class IssueAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.issueAdd;
    const issue = {
      owner: form.owner.value,
      title: form.title.value,
      due: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 10),
    };
    const { createIssue } = this.props;
    createIssue(issue);
    form.owner.value = '';
    form.title.value = '';
  }

  render() {
    return (
      <form name="issueAdd" onSubmit={this.handleSubmit}>
        Add an issue below
        {' '}
        <br />
        Owner:
        {' '}
        <input type="text" name="owner" placeholder="Owner" />
        <br />
        Title:
        {' '}
        <input type="text" name="title" placeholder="Title" />
        <br />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default IssueAdd;
