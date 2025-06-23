const express = require('express');
const PORT = process.env.PORT | 3000
const app = express();

app.use(express.json());


let cars = [
    { id: 1, model: 'Toyota Camry', owner: 'Айбек' },
    { id: 2, model: 'Hyundai Sonata', owner: 'Аружан' },
    { id: 3, model: 'Kia Sportage', owner: 'Нұржан' }
];


app.get('/api/cars', (req, res) => {
    const param = req.query;
    let retValues = [...cars];
    if (param.model) {
        const filteredCars = cars.filter(c => c.model.toLowerCase().includes(param.model.toLowerCase()));
        if (filteredCars.length > 0) {
            retValues = filteredCars;
        }
        else {
            return res.status(404).json({ message: 'Cannot find the car with the given model' });
        }
    }
    if (param.owner) {
        const filteredCars = cars.filter(c => c.owner.toLowerCase().includes(param.owner.toLowerCase()));
        if (filteredCars.length > 0) {
            retValues = filteredCars;
        }
        else {
            return res.status(404).json({ message: 'Cannot find the car with the given owner' });
        }
    }
    if (param.sort) {
        console.log(param.sort);
        console.log(retValues);
        if (param.sort == 'asc') {
            retValues.sort((a, b) => a.id - b.id);
        }
        else {
            retValues.sort((a,b)=> b.id - a.id);
        }
    }
    return res.status(200).json(retValues);
});

app.get('/api/cars/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const car = cars.find(c => c.id == id);
    if (car) {
        return res.status(201).json(car);
    }
    else {
        return res.status(404).json({ message: 'This id is not defined' });
    }
});

app.post('/api/cars', (req, res) => {
    const { model, owner } = req.body;
    if (!model || !owner) {
        return res.status(400).json({ message: 'Please provide both model and owner' });
    }
    const id = cars[cars.length - 1].id + 1;
    const newCar = { id, model, owner };
    cars.push(newCar);
    return res.status(201).json("Created successfully");
});

app.listen(PORT, () => {
    console.log(`Server run on ${PORT}`);
});