import express, { NextFunction, Request, Response } from 'express'
import morgan from 'morgan';
import path from 'path';
import petRoutes from './routes/petRoutes';
import { db } from './models';

const app = express();

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, '../src/public')));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, "../src/views"));
app.set('view options', {layout: 'layout' });

app.use('/pet', petRoutes);
app.use('/', petRoutes);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render('error', {
        message: "That is not a valid URL."
    });
});

db.sync().then(() => {
    console.info("The circle is complete!")
});

app.listen(3000);