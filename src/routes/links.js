const express = require('express');
const router = express.Router();
const pool = require (`../database`);
const {isLoggendIn} = require('../lib/auth');

 router.get('/add',isLoggendIn, (req, res)=>{
     res.render('links/add');
 });

 router.post('/add',isLoggendIn, async (req,res)=>{
    const {title, url, description } = req.body;
    const newlinks={
        title,
        url, 
        description,
        user_id: req.user.id
    };
    await pool.query ('INSERT INTO links set ?', [newlinks]);
    req.flash('success', 'links saved succesfully');
    res.redirect('/links');
  });

 router.get('/',isLoggendIn, async (req, res )=>{
   const links= await pool.query( 'SELECT * FROM links WHERE user_id=?',[req.user.id]);
   res.render('links/lists', {links});
  });
 
 router.get('/delete/:id', isLoggendIn, async (req, res)=>{
     const {id}= req.params;
     await pool.query ('DELETE FROM links WHERE ID = ?', [id]);
     req.flash('success', 'Links removed succesfully');
     res.redirect('/links');
  });
router.get('/edit/:id', isLoggendIn, async (req,res)=>{
    const {id}= req.params;
    const links= await pool.query ('SELECT * FROM links WHERE ID= ?', [id]);
    res.render('links/edit', {link: links[0]});
  });
  router.post('/edit/:id', isLoggendIn, async (req,res)=>{
    const {id}= req.params;
    const {title, description, url}= req.body;
    const newlinks={
      title,
      description,
      url
    };
    await pool.query('UPDATE links set ? WHERE id= ?', [newlinks, id]);
    req.flash('success', 'Links Updated succesfully');
    res.redirect('/links');
  });
module.exports= router;