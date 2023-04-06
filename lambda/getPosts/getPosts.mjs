import { DynamoDB } from "@aws-sdk/client-dynamodb";

const dynamo = new DynamoDB

export const handler = async (event, context) => {
    //remember to migrate all changes to cloudformation template. Code is inlined as part of template
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
    };

    try {
        const parseBody = JSON.parse(event.body)
        const postID = parseBody.postID || false 
        let getQuery = `SELECT *
        FROM ${process.env.dbname} 
        WHERE postid = '${postID}'`
        console.log('getQuery', getQuery)
        let msg = await dynamo.executeStatement({Statement: getQuery});
        body = msg.Items
        } 
    catch(err) {
        console.log('--didnt work--', err)
    }

    return {
        statusCode,
        body,
        headers,
    };
};
