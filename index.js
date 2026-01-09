const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine','ejs');

const blogs =[];

app.get('/', (req,res) => {
    res.render("index", {blogs});
});


app.post('/blogs', (req,res) => {
    const {title, content} = req.body;
    const newBlog = { id: blogs.length + 1, title, content};
    blogs.push(newBlog);
   res.redirect('/');
});

app.get('/blog/:id', (req,res) => {
    const blog = blogs.find(b => b.id === parseInt(req.params.id));
    if(blog) {
        res.render('blog', {blog});
    }
    else{
        res.status(404).send("Blog Not Found");
    }
});

app.listen(3000,() => {
    console.log("server is working");
});