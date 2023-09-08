const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");

async function getInsult() {
  const { Items } = await db
    .scan({
      TableName: "insults",
    })
    .promise();

  return Items;
}

exports.handler = async (event, context) => {
  try {
    const insults = await getInsult();

    return sendResponse(200, { success: true, insults: insults });
  } catch (error) {
    console.log(error);
    return sendResponse(500, {
      success: false,
      error: "Could not get insults",
    });
  }
};
