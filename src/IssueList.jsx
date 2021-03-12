const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviewer(key, value) {
    if(dateRegex.test(value)){
        return new Date(value);
    }
    return value;
}

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
            due: new Date(new Date().getTime() + 1000*60*60*24*10),
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
    async loadData() {
        const query =  `query {
            issueList {
                id title status owner
                created effort due
            }
        }
        `;

        const respose = await fetch('/graphql',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });

        const body = await respose.text();
        const result = JSON.parse(body, jsonDateReviewer);
        this.setState({ issues: result.data.issueList });

    }
    componentDidMount() {
        this.loadData();
    }
    async createIssue(issue) {
        const query = `mutation issueAdd($issue: IssueInputs!) {
                issueAdd(issue: $issue){
                    id
                }
            }`;

        const respose = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, variables: {issue} })
        });
        this.loadData();
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