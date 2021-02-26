const {User, Board} = require('../models');
const { rawAttributes } = require('../models/hashtag');
const Hashtag = require('../models/hashtag');
const { Op } = require('sequelize');

const getBoards = (async( req, res, next )=>{
    const { hashtag : query, limit, offset} = req.query;
    if(!query){
        return res.json('queryNotExisted');
    }
    try{
        const hashtags = query.match(/[^\s%]*/g);
        console.log(`hashtag = ${hashtags[0]} ${hashtags[1]} ${hashtags[2]}`);
        const temp = hashtags.map(tag => tag.slice(0));
        console.log(` temp : ${temp}`);
        const result = await Promise.all(       //result에는 해시태그들의 promise들이 담기게 됨
            hashtags.map(tag =>{
                return Hashtag.findOne({ where : { Content : tag.slice(1)}});
            })
        )
        console.log( ` result : ${result}`)
        let posts = [];
        posts.push(result.map(tag =>{
            return tag.slice(1).getBoards();
        }))
        return res.json(posts);
    }catch(error){
        console.error(error);
        return next(error);
    }
});

const getHashTages = (async( req,res,next ) =>{
    try{
        const hashtags = await Hashtag.findAll({attributes : ['Content']});
        return res.json(hashtags);
    }catch(e){
        console.error(e);
        return next(e);
    }
})

const getSearch = (async(req,res,next)=>{
    const { limit, offset, searchString } = req.query;
    try{
        let posts =[];
        posts = await Board.findAll({ 
            where :
            { [Op.or] :[{bbsTitle : { [Op.like]: "%" + searchString + "%" }}, 
              {bbsContent : { [Op.like]: "%" + searchString + "%"}}]} })
        if(posts.length == 1) res.json({ state : empty });
        res.json(posts);
    }catch(e){
        console.error(e);
        return next(e);
    }
})

module.exports = {getBoards, getHashTages, getSearch};