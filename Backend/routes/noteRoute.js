const express=require('express');
const Note= require('../Models/Note.js');
const router=express.Router();

router.post('/notes', async (req,res)=>{
    const {title,content} =req.body;

    const newNote= new Note({
        title,
        content,
    });

    try{
        await newNote.save();
        res.status(201).json(newNote);
    }
    catch(error){
        res.status(500).json({message:"Failed to create note", error});
    }
});

router.get('/notes',async(req,res)=>{
    try{
        const notes=await Note.find();
        res.status(200).json(notes);
    }
    catch(error){
        res.status(500).json({ message: 'Failed to fetch notes', error });
    }
})


router.get('/notes/:id', async(req,res)=>{
    try{
        const note=await Note.findById(req.params.id);
        if(!note){
            return res.status(404).json({message:'Note not found'});
        }
        res.status(200).json(note);
    }
    catch(error){
        res.status(500).json({ message: 'Failed to fetch note', error });
    }
})

// Express route example for PUT /api/notes/:id
router.put('/notes/:id', async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }  // Return the updated note
        );
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }

        res.status(200).json(updatedNote);  // Return the updated note as response
    } catch (error) {
        console.error('Error updating note:', error);  // Log the full error
        res.status(500).json({ message: 'Error updating note', error });
    }
});





router.delete('/notes/:id', async(req,res)=>{
    try{
        const deleteNote=await Note.findByIdAndDelete(req.params.id);
        if(!deleteNote){
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({message:'Note deleted successfully'});
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete note', error });
    }
})
module.exports=router;

