import React from 'react'

const IssueEdit = ({ match }) => {
    const { id } = match.params;
    return (
        <>
            <h2>{`This is a placeholder for editing issues ${id}`}</h2>
        </>
    )
}

export default IssueEdit
