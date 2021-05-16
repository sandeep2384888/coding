const express = require('express');
const Director = require('../models/director');
const Film = require('../models/movies');
const route = express.Router();


route.get('/director', async (req, res) => {
    try {

        const directors = await Director.find({});
        res.json(directors);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.post('/director', async (req, res) => {
    try {
        directorName = req.body.directorName;
        console.log(directorName);
        Director.findOne({ directorName }).exec((err, userCheck) => {
            if (userCheck) {
                return res.json({ feedBack: "exist" });
            }
            else {
                let director = new Director(req.body);
                director.save();
                return res.json({ feedBack: "sucess" });
            }
        });
    }
    catch {
        return res.json({ error: "error" })
    }
});
route.post('/film', async (req, res) => {
    try {
        directorName = req.body.directorName;
        console.log(directorName);
        Director.findOne({ directorName }).exec((err, userCheck) => {
            if (userCheck) {
                movieName = req.body.movieName;
                Film.findOne({ movieName: movieName }).exec((err, u2) => {
                    if (u2) {
                        return res.json({ feedBack: "exist" })
                    }
                    else {
                        let film = new Film(req.body);
                        film.save();
                        return res.json({ feedBack: "success" });
                    }
                })

                //return res.json({ feedBack: "exist" });
            }
            else {
                res.json({ error: "director not exit" });
            }

        });
    }
    catch {
        res.json({ error: "error" })
    }
});
route.get('/film', async (req, res) => {
    try {

        const film = await Film.find({});
        res.json(film);
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.delete('/film/:movieName', async (req, res) => {
    try {
        const movieName = req.params.movieName;
        console.log(movieName);
        const findingOne = await Film.deleteOne({ movieName: movieName });
        res.json("done");
    }
    catch (err) {
        res.json("Errooror");
    }
});

route.get('/film/delete/:movieName', async (req, res) => {
    try {
        const movieName = req.params.movieName;
        console.log(movieName);
        const find = await Film.findOne({ movieName: movieName });
        if(find!=null){
        return res.json(find);
        }
        else
        {
            return res.json({feedBack:"movie not found"});  
        }
    }
    catch (err) {
        res.json("Errooror");
    }
});

route.put('/director/:directorName', async (req, res) => {
    try {
        const directorName = req.params.directorName;
        console.log(directorName);
       const check=await Director.findOne({directorName:directorName})
       if(check!=null)
       {
        const findingOne = await Director.updateOne({ directorName: directorName }, { $set: { age: req.body.age } });
        const findingTwo = await Director.updateOne({ directorName: directorName }, { $set: { awardCount: req.body.awardCount } });
        return res.json("done");
       }
       else
       {
           return res.json("error");
       }
    }
    catch (err) {
        res.json("Errooror");
    }
});

route.get('/director/:name', async (req, res) => {
    try {
        directorName = req.params.name
        console.log(directorName);
        const directors = await Director.findOne({ directorName: directorName });
        if (directors != null) {
            return res.json(directors)
        }
        else {
            return res.json({ feedBack: "director not found" });
        }
    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});

route.get('/film/:name', async (req, res) => {
    try {
        directorName = req.params.name
        const directors = await Film.find({ directorName: directorName });
        if (directors!= null) {
            return res.json(directors)
        }
        else {
            return res.json({ feedBack: "director not found" });
        }
    }
    catch (err) {
        return res.status(500).json({ err: "director not found" });
    }
});


route.get('/film/movie/:name', async (req, res) => {
    try {
        movieName = req.params.name
        console.log(movieName);
        const films = await Film.findOne({ movieName: movieName });
        if (films == null) {
            return res.json({ feedBack: "not Found" });
        }
        else {
            //res.json(films)
            console.log(films.directorName);
            const directorName = films.directorName;
            const directors = await Director.find({ directorName: directorName });
            return res.json(directors);
        }

    }
    catch (err) {
        res.status(500).json({ err: err.message });
    }
});





module.exports = route;