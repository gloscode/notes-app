import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import mongoose from 'mongoose'
import Notes from './models/Notes.js'
import cors from 'cors';
const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8080;

mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", (error)=> console.error(error));
db.on("open", ()=> console.log("Connected to Database"));

app.get("/", async (req, res) => {
    try {
        const notes = await Notes.find()

        res.json(notes)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.get("/search", async (req, res) => {
    const query = req.query.query
    const reg = new RegExp(`${query}`, "i")

    try {
        const notes = await Notes.find({
            $or: [
                { title: { $regex: reg } }
            ]
        })

        res.json(notes)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

app.post("/", async (req, res)=>{
    const note = new Notes({
        title: req.body.title,
        description: req.body.description
    })

    try {
        const newNote = note.save()
        res.status(201).json(newNote)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.get("/:id", getNoteById, async (req, res)=>{
    res.json(res.note)
})

app.patch("/:id", getNoteById, async (req, res)=>{
    if (req.body.title != null){
        res.note.title = req.body.title
    }
    if (req.body.description != null){
        res.note.description = req.body.description
    }

    try {
        const updatedNote = res.note.save()
        res.json(updatedNote)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
})

app.delete("/:id", getNoteById, async (req, res)=>{
    try {
        await res.note.remove();
        res.json({message: "Deleted!"})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

async function getNoteById(req, res, next){
    let note;

    try {
        note = await Notes.findById(req.params.id)
        if (note == null){
            return res.status(404).json({message: "Not Found"})
        }

    } catch (error) {
        return res.status(500).json({error: error.message})
    }

    res.note = note
    next()
}

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})