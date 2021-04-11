/* eslint "no-alert": "off" */
const dateRegex = new RegExp('^\\d\\d\\d\\d-\\d\\d-\\d\\d');

function jsonDateReviewer(key, value) {
  if (dateRegex.test(value)) {
    return new Date(value);
  }
  return value;
}

async function graphQLFetch(query, variables = {}) {
  try {
    const respose = await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });

    const body = await respose.text();
    const result = JSON.parse(body, jsonDateReviewer);

    if (result.errors) {
      const error = result.errors[0];
      if (error.extensions.code === 'BAD_USER_INPUT') {
        const details = error.extensions.exception.errors.join('\n');
        alert(`${error.message}:\n ${details}`);
      } else {
        alert(`${error.extensions.code}:\n ${error.message}`);
      }
    }
    return result.data;
  } catch (e) {
    alert(`Error in sending data to server: ${e.message}`);
    return null;
  }
}

export default graphQLFetch;
