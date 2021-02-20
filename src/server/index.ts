import path from 'path';
import express from 'express';

const expressApp = express();


expressApp.use(express.static('../../public'));

expressApp.get('*', (req, res) =>{

})