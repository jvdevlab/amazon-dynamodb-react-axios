## Blog Post

:scroll: A more detailed description of this project and a code walk-through can be found on my [blog](https://jvdevlab.com/blog/aws/dynamodb/react-axios).

## Description

This [GitHub project](https://github.com/jvdevlab/amazon-dynamodb-react-axios) shows how to access [Amazon DynamoDB](https://aws.amazon.com/dynamodb/) from [React](https://reactjs.org/) application using [Axios](https://github.com/axios/axios) HTTP client.

The backend is provisioned using [AWS SAM](https://aws.amazon.com/serverless/sam/) and consists of:

- An [Amazon API Gateway](https://aws.amazon.com/api-gateway/) that acts as a proxy to a serverless function.
- A [Node.js](https://nodejs.org/en/) based [AWS Lambda](https://aws.amazon.com/lambda/) function that performs basic CRUD operations on Amazon DynamoDB using [AWS SDK](https://aws.amazon.com/sdk-for-javascript/).
- An Amazon DynamoDB table.

The React based frontend application uses Axios HTTP client to connect to Amazon API Gateway. A few additional libraries ([Material-UI](https://material-ui.com/), [react-json-view](https://github.com/mac-s-g/react-json-view), [react-loading-overlay](https://github.com/derrickpelletier/react-loading-overlay)) are used to improve user experience.

## Setup

- Install [Docker](https://docs.docker.com/get-docker/).
- Clone the repo.
- Rename `.env.local` to `.env`.
- If your AWS security credentials are **not** in `~/.aws`, then adjust the bind mapping in `docker-compose.yml`.
- Update S3_BUCKET variable in the `.env` file with your s3 bucket name. AWS SAM needs it to upload the template and serverless function code.
- To deploy the backend to AWS run:

```bash
docker compose up backend
```

- To get configuration data run:

```bash
docker compose up describe
```

- Copy the above command's output into corresponding variables inside the `.env` file.

## Demo

- To start the frontend application run:

```bash
docker compose up frontend
```

- Open the app <http://localhost:3000>
- Verify that you can perform CRUD operations.

## Cleanup

- To delete the backend from AWS run:

```bash
docker compose up clean
docker compose down
```
