import request from 'supertest';
import { app } from '../app';

import createConnection from '../database';

describe('Survey', () => {
    beforeAll(async() =>{
        const connection = await createConnection();
        await connection.runMigrations();
    });
    
    it('Should be able to create a new survey', async () => {
        const response = await request(app).post("/survey").send({
            title: "Title Example",
            description: "Description Example"
        });
    
        expect(response.status).toBe(201);
    });

    it('Should be able to get all surveys', async () => {
        await request(app).post("/survey").send({
            title: "Title Example2",
            description: "Description Example2"
        });

        const response = await request(app).get("/survey");

        expect(response.body.length).toBe(2);
    });
    
    
});
