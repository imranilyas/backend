import client from '../../global/postgres'
const text = 'INSERT INTO batch (batchsize, curriculumid, enddate, startdate, trainerid, clientid, confirmed)' +
    ' VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';

export interface createBatches {
    body: {
        batchSize: number;
        // batchId: number; will be done through the database, user does not provide
        curriculumId: number; //we provide, perhaps may change this, like name
        endDate: number;
        startDate: number;
        trainerId: number; //we provide, perhaps may change this, like name
        clientId: number; //we provide, perhaps may change this, like name
        confirmed: boolean;
    }
}



export default async function createBatch(event: createBatches) {

    await client.connect();
    let whatever = [event.body.batchSize, event.body.curriculumId, event.body.endDate, event.body.startDate,
    event.body.trainerId, event.body.clientId, event.body.confirmed];

    const res = await client.query(text, whatever)
    console.log(res.rows[0].message)
    await client.end()
};