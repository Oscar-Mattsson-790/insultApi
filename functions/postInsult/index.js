const { sendResponse, sendError } = require("../../responses/index");
const { db } = require("../../services/db");
const { nanoid } = require("nanoid");

async function postInsult(insult, play) {
  const newInsult = {
    id: nanoid(),
    insult: insult,
    play: play,
  };

  const params = {
    TableName: "insults",
    Item: newInsult,
  };

  await db.put(params).promise();

  return newInsult;
}

exports.handler = async (event, context) => {
  try {
    const requestBody = JSON.parse(event.body);

    if (!requestBody.insult || !requestBody.play) {
      return sendResponse(400, {
        success: false,
        message: "Both insult and play fields are required",
      });
    }

    const savedInsult = await postInsult(requestBody.insult, requestBody.play);

    return sendResponse(200, { success: true, insult: savedInsult });
  } catch (error) {
    console.log(error);
    return sendResponse(500, {
      success: false,
      message: "Could not save insult",
    });
  }
};
