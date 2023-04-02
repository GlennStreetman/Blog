import { DynamoDBClient, BatchExecuteStatementCommand } from "@aws-sdk/client-dynamodb"

const dynamo = new DynamoDB

export const handler= async (event, context) => {
    //remember to migrate all changes to cloudformation template. Code is inlined as part of template
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        console.log('event', event)

        console.log('POST', event.body)
        const parseBody = JSON.parse(event.body)
        const date = new Date().toISOString().slice(0,19)
        const user = parseBody.user || false //this needs to be calced from user credentials
        let message = parseBody?.message || false
        const post = parseBody?.post || false
        console.log('test', post, user, message)
        let insStatement = `INSERT INTO "blogposts" value {'postname': '${post}', 'postdate': '${date}', 'message': '${message}', 'user': '${user}'}`
        const client = new DynamoDBClient({ region: "us-east-2" });
        console.log('insert', insStatement)
        const data = await client.send(command);
        console.log(data)
        } 
    catch {
        console.log('--didnt work--')
    }

    return {
        statusCode,
        body,
        headers,
    };
};
