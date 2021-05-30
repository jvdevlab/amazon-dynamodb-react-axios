const aws = require("aws-sdk");
aws.config.update({ region: "us-east-1" });

const dynamo = new aws.DynamoDB.DocumentClient();

const routes = {
  "/api/data": dataRoute,
};

exports.handler = function (event, context, callback) {
  try {
    console.log("Received event:", JSON.stringify(event, null, 2));
    if (routes[event.path]) {
      return routes[event.path](event, context, callback);
    } else {
      return error(`Invalid URL: ${event.path}`, callback);
    }
  } catch (err) {
    return error(err, callback);
  }
};

function dataRoute(event, context, callback) {
  if (event.httpMethod === "POST") {
    let body = event.body;
    if (event.isBase64Encoded) {
      body = Buffer.from(event.body, "base64").toString();
    }

    try {
      body = JSON.parse(body);
    } catch (err) {
      return error(err, callback);
    }

    const operation = body.operation;

    if (body.tableName) {
      body.payload.TableName = body.tableName;
    }

    const payload = body.payload;
    const handler = (err, data) => dynamoCall(err, data, callback);

    switch (operation) {
      case "put":
        dynamo.put(payload, handler);
        break;
      case "get":
        dynamo.get(payload, handler);
        break;
      case "update":
        dynamo.update(payload, handler);
        break;
      case "delete":
        dynamo.delete(payload, handler);
        break;
      case "scan":
        dynamo.scan(payload, handler);
        break;
      default:
        error(`Unknown operation: ${operation}`, callback);
    }
  } else {
    return error(`Unsupported HTTP method: ${event.httpMethod}`, callback);
  }
}

function dynamoCall(err, data, callback) {
  if (err) {
    return error(err, callback);
  } else {
    return success(JSON.stringify(data), callback);
  }
}

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "http://localhost:3000",
};

function success(body, callback, isBase64Encoded = false) {
  callback(null, {
    statusCode: 200,
    isBase64Encoded: isBase64Encoded,
    body: body,
    headers: headers,
  });
}

function error(err, callback) {
  console.error(err);

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ error: err }),
    headers: headers,
  });
}
