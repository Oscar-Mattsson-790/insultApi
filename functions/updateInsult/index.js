const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");

async function updateInsult(id, insult, play) {
  const params = {
    TableName: "insults",
    Key: { id: id },
    UpdateExpression: "SET insult = :i, play = :p",
    ExpressionAttributeValues: {
      ":i": insult,
      ":p": play,
    },
    ReturnValues: "UPDATED_NEW",
  };

  const result = await db.update(params).promise();

  return result.Attributes;
}

exports.handler = async (event, context) => {
  try {
    const id = event.pathParameters.id;
    const requestBody = JSON.parse(event.body);

    if (!requestBody.insult || !requestBody.play) {
      return sendResponse(400, {
        success: false,
        message: "Both insult and play fields are required",
      });
    }

    const updatedInsult = await updateInsult(
      id,
      requestBody.insult,
      requestBody.play
    );

    return sendResponse(200, { success: true, insult: updatedInsult });
  } catch (error) {
    console.log(error);
    return sendResponse(500, {
      success: false,
      message: "Could not update insult",
    });
  }
};
