const issues = [
    {id: 1, status: 'New', owner: 'Raven', effort: 5, 
    created: new Date('2021-02-12'), due: undefined, 
    title: 'Error on console when clicking Add'},
    {id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, 
    created: new Date('2021-02-12'), due: new Date('2021-02-26'), 
    title: 'Missing bottom border on panel'},
];


class IssueRow extends React.Component {
    render() {
        const issue = this.props.issue;
        return (
            <tr>
                <td>{issue.id}</td>
                <td>{issue.status}</td>
                <td>{issue.owner}</td>
                <td>{issue.effort}</td>
                <td>{issue.created.toDateString()}</td>
                <td>{issue.due ? issue.due.toDateString() : ''}</td>
                <td>{issue.title}</td>
            </tr>
        )
    }
}

class IssueFilter extends React.Component {
    render() {
        return(
            <div>This is the placeholder for Issue Filers.</div>
        );
    }
}

class IssueTable extends React.Component {
    render() {
        const issueRows = issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);
        return(
            <table className="bordered-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Status</th>
                        <th>Owner</th>
                        <th>Created</th>
                        <th>Effort</th>
                        <th>Due Date</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {issueRows}
                </tbody>
            </table>
        );
    }
}

class IssueAdd extends React.Component {
    render() {
        return(
            <div>This is the placeholder for a form to add a new issue.</div>
        );
    }
}

class IssueList extends React.Component {
    render() {
        return(
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable />
                <hr />
                <IssueAdd />
            </React.Fragment>
        );
    }
}

const issueTrackerElem = document.getElementById('issuetracker');
ReactDOM.render( <IssueList />, issueTrackerElem);