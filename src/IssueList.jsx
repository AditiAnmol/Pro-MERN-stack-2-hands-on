class IssueRow extends React.Component {
    render() {
        const style = this.props.rowStyle;
        return (
            <tr>
                <td style={style}>{this.props.issue_id}</td>
                <td style={style}>{this.props.children}</td>
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
        const rowStyle = { border: "1px solid silver", padding: 4 };
        return(
            <table style={{borderCollapse: "collapse"}}>
                <thead>
                    <tr>
                        <th style={rowStyle}>ID</th>
                        <th style={rowStyle}>Title</th>
                    </tr>
                </thead>
                <tbody>
                    <IssueRow rowStyle={rowStyle} issue_id={1}>Error on console when clicking <i>Add</i></IssueRow>
                    <IssueRow rowStyle={rowStyle} issue_id={2}>Missing <b>bottom</b> border on panel</IssueRow>
                </tbody>
                {/* <div>This is the placeholder for table of issues.</div> */}
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