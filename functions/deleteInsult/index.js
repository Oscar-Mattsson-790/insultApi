const { sendResponse } = require("../../responses/index");
const { db } = require("../../services/db");

async function deleteInsult(id) {
  const params = {
    TableName: "insults",
    Key: { id: id },
  };

  await db.delete(params).promise();
}

exports.handler = async (event, context) => {
  try {
    const id = event.pathParameters.id;

    await deleteInsult(id);

    return sendResponse(200, {
      success: true,
      message: "Insult deleted successfully.",
    });
  } catch (error) {
    console.log(error);
    return sendResponse(500, {
      success: false,
      message: "Could not delete insult",
    });
  }
};
