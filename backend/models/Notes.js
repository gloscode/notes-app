import mongoose from "mongoose"

const notesSchema = new mongoose.Schema({ 
    title:  {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    noteDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

export default mongoose.model('Notes', notesSchema);