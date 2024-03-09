const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();


mongoose.connect('mongodb://localhost:27017/componentsDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const componentSchema = new mongoose.Schema({
  content: String,
  id: {
    type: Number,
    required: true
  }
});

const Component = mongoose.model('Component', componentSchema);



app.use(bodyParser.json());


let updateCount = 0;
let addCount = 0;

app.put('/api/components/update', async (req, res) => {
  try {

    const { content, id } = req.body;

    await Component.findOneAndUpdate({ id }, { content });

    updateCount++;

    res.status(201).json({ updateCount: updateCount, message: 'Component updated successfully' });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});
app.post('/api/components/add', async (req, res) => {
  try {

    const { content } = req.body;

    const count = await Component.find().count();
    const data = {
      content: content,
      id: count + 1
    }
    const newComponent = new Component(data);
    await newComponent.save();


    addCount++;

    res.status(201).json({ addCount: addCount, message: 'Component added successfully' });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

app.get('/api/components', async (req, res) => {

  try {
    const data = await Component.find();
    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

});

app.get('/api/components/count', (req, res) => {
  try {

    res.json({ addCount, updateCount });
  } catch (error) {

    res.status(500).json({ error: error.message });
  }
});

app.get('/',(req,res)=>{
  try {
    res.status(200).json({message:"hello"})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));