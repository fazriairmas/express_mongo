const express = require('express')
const mongoose = require('mongoose')

const { Schema, model } = mongoose
const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
// connect ke mongodb
mongoose
    .connect('mongodb://localhost:27017/rest-api', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(_ => console.log('Connected to DB'))
    .catch(err => console.log(err))

//buat chema
const articleSchema = new Schema(
    {
        title: String,
        author: String,
        content: String,

    },
    { timestamps: true, versionKey:false},
)

const Article = model('Article', articleSchema)

app.get('/articles', async(req, res) => {
    const articles = await Article.find()
    res.status(200).json(articles)
})

app.post('/articles', async (req, res) => {
    const { title, author, content } = req.body

    const article = await Article.create({ title, author, content})
    res.status(201).json(Article)
})

app.listen(PORT, _ => console.log(`Server runs on PORT: ${PORT}`))
