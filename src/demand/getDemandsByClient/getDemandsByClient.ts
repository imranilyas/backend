import { APIGatewayProxyEvent } from 'aws-lambda';
import { HTTPResponse } from '../../global/objects';
import client from '../../global/postgres';
const text = 'SELECT * FROM clientdemand WHERE (clientid = $1)';

// written by BWK
export default async function handler(event: APIGatewayProxyEvent) {
    // Double-checks that neither pathParameters nor clientId are undefined
    //  If undefined, reject with code 400
    if (!event.pathParameters || !event.pathParameters.clientId) {
        return new HTTPResponse(400, "Invalid path parameters")
    }
    const demandClient = (event.pathParameters.clientId)

    const demandData = [demandClient];
    let res;

    // Attempts to retrieve rows using clientId.
    try {
        res = await client.query(text, demandData)
    } catch (err) {
        console.log(err);
        return new HTTPResponse(400, "Unable to Query the information")
    }

    // If all went well, returns everything that the query retrieved
    console.log(res.rows);
    return new HTTPResponse(200, res.rows)
};