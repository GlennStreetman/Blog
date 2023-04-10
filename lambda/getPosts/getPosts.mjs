import { DynamoDB } from "@aws-sdk/client-dynamodb";

const dynamo = new DynamoDB

export const handler = async (event, context) => {
    //remember to migrate all changes to cloudformation template. Code is inlined as part of template
    let body;
    let statusCode = '200';
    const headers = {
        'Content-Type': 'application/json',
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers" : 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
        "Access-Control-Allow-Credentials": 'true'
    };

    try {
        const postID = JSON.parse(event.body)?.postId
        let getQuery = `SELECT *
        FROM "${process.env.dbname}"
        WHERE postid = '${postID}'`
        console.log('getQuery', getQuery)
        let msg = await dynamo.executeStatement({Statement: getQuery});
        console.log(msg)
        body = JSON.stringify(msg.Items)
        
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
