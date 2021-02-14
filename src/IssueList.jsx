const initialIssues = [
    {id: 1, status: 'New', owner: 'Raven', effort: 5, 
    created: new Date('2021-02-12'), due: undefined, 
    title: 'Error on console when clicking Add'},
    {id: 2, status: 'Assigned', owner: 'Eddie', effort: 14, 
    created: new Date('2021-02-12'), due: new Date('2021-02-26'), 
    title: 'Missing bottom border on panel'},
];


function IssueRow(props) {
    const issue = props.issue;
    console.log(issue);
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

class IssueFilter extends React.Component {
    render() {
        return(
            <div>This is the placeholder for Issue Filers.</div>
        );
    }
}

function IssueTable(props) {
    const issueRows = props.issues.map(issue => <IssueRow key={issue.id} issue={issue}/>);
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
            status: 'New',
        }
        this.props.createIssue(issue);
        form.owner.value = "";
        form.title.value = "";
    }
    render() {
        return(
            <form name="issueAdd" onSubmit={this.handleSubmit}>
                Add an issue below <br />
                Owner: <input type="text" name="owner" placeholder="Owner"/>
                <br />
                Title: <input type="text" name="title" placeholder="Title"/>
                <br />
                <button>Add</button>
            </form>
        );
    }
}

class IssueList extends React.Component {
    constructor() {
        super();
        this.state = { issues: [] };
        this.createIssue = this.createIssue.bind(this);
    }
    loadData() {
        setTimeout(() => {
            this.setState({ issues: initialIssues });
        }, 500);
    }
    componentDidMount() {
        this.loadData();
    }
    createIssue(issue) {
        issue.id = this.state.issues.length+1;
        issue.created = new Date();
        const newIssueList = this.state.issues.slice();
        newIssueList.push(issue);
        this.setState({ issues: newIssueList });
    }
    render() {
        return(
            <React.Fragment>
                <h1>Issue Tracker</h1>
                <IssueFilter />
                <hr />
                <IssueTable issues={this.state.issues}/>
                <hr />
                <IssueAdd createIssue={this.createIssue}/>
            </React.Fragment>
        );
    }
}

const issueTrackerElem = document.getElementById('issuetracker');
ReactDOM.render( <IssueList />, issueTrackerElem);