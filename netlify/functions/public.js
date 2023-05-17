const handler = async function () {
  return {
    statusCode: 200,
    body: process.env.PUBLIC_KEY,
  }
}

module.exports = { handler }
