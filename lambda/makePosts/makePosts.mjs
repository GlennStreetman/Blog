import { DynamoDB } from "@aws-sdk/client-dynamodb";

const dynamo = new DynamoDB

export const handler= async (event, context) => {
    //remember to migrate all changes to cloudformation template. Code is inlined as part of template
    let body;
    let statusCode = 200;
    const headers = {
        'Content-Type' : 'application/json',
        "Access-Control-Allow-Methods" : "OPTIONS,POST,GET",
        "Access-Control-Allow-Headers" : "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Credentials" : true,
        "Access-Control-Allow-Origin" : "*"
    };

    try {

        console.log('POST', event.body, typeof event.body)
        const convertBody = JSON.parse(event.body)
        console.log('BODY', convertBody, typeof convertBody, convertBody?.comment)
        const date = new Date().toISOString().slice(0,19)
            console.log('processing update')
            const user = convertBody.user
            let comment = convertBody.comment
            const post = convertBody?.post
            console.log('test', post, user, comment)
            let insStatement = `INSERT INTO "${process.env.dbname}" value {'postid': '${post}', 'postdate': '${date}', 'message': '${comment}', 'user': '${user}'}`
            console.log('insert', insStatement)
            let msg = await dynamo.executeStatement({Statement: insStatement});
            console.log(msg)
            body=JSON.stringify({msg: 'success' })
            console.log('status code', statusCode, 'headers', headers, 'body', body)
        } 
    catch(err) {
        console.log('--didnt work--', err)
        body=JSON.stringify({msg: 'problem processing comment'})
    }
    console.log('finished')
    return {
        statusCode,
        body,
        headers,
    };
};
