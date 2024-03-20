import {test as teardown } from '@playwright/test';
import * as fs from 'fs';

const authFile = 'playwright/.auth/user.json'

teardown('DeleteAuthFile', async ({ }) => {
    //use Node.js filesystem to delete the user auth file
    fs.unlink(authFile, (err) => {
        console.error('Auth file deletion failed');
        return;
    });
});