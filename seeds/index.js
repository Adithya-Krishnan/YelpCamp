const mongoose=require('mongoose');
const cities = require('./cities')
const campground = require('../models/campground')
const {places,descriptors} = require('./seedHelpers')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', ()=> {
  console.log("db connected");
});
const sample = array => array[Math.floor(Math.random()*array.length)];

const seedDB = async()=>{
    await campground.deleteMany({})
    for(let i=0;i<50;i++){
        const random1000= Math.floor(Math.random()*1000)
        const price=Math.floor(Math.random()*20)+10
        const camp = new campground({
            author:'60cb70e5c60ab529cc364bae',
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
           
            images: {
                
                url: 'https://res.cloudinary.com/ddbr7sogu/image/upload/v1624258902/YelpCamp/zutp0n6myw8mvwmjybfc.jpg',
                filename: 'YelpCamp/zutp0n6myw8mvwmjybfc'
              },
          
            description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sint, officiis, deleniti harum voluptates, ratione vel accusamus nobis pariatur consequuntur optio laborum tempora error repudiandae dolor quidem consectetur quibusdam non beatae!',
            price,
            geometry: {  coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude,
               ],
             type: 'Point' },
        })
        await camp.save();

    }};

seedDB().then(() => {
        mongoose.connection.close()
    })