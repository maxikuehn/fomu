const { schedule } = require("@netlify/functions")
const { PrismaClient } = require("@prisma/client")

const handler = async function (event, context) {
  const prisma = new PrismaClient()
  console.log("Received event:", event)

  return {
    statusCode: 200,
  }
}

exports.handler = schedule("@hourly", handler)
