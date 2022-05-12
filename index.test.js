const {sequelize} = require('./db');
const {Band, Musician,Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    })
    test('can create a Musician', async () => {
        const testMusician = await Musician.create({name: 'John'})
        expect(testMusician.name).toBe('John');
      })

    test('can create a Band', async () => {
const testBand =  await Band.create({name:'Beetles', genre: 'Rock'})
        expect(testBand.name).toBe('Beetles');
    })
    test('can create a Band', async () => {
        const testBand =  await Band.create({name:'Beetles', genre: 'Rock'})
        expect(testBand.genre).toBe('Rock');
         })

    test('Band can have Musiciansssss', async function(){
        const Beetles = await Band.create({name:'Beetles', genre: 'Rock'});
        const ringo = await Musician.create({name:'Ringo', instrument:'Drums'});
        const paul = await Musician.create({name:'Paul', instrument:'Bass Guitar'});
        const john = await Musician.create({name:'John', instrument:'Guitar'});

        await Beetles.addMusician(ringo)
        await Beetles.addMusician(paul)
        await Beetles.addMusician(john)

        const musicians = await Beetles.getMusicians();

        expect(musicians.length).toBe(3)
        expect(musicians[0]instanceof Musician).toBeTruthy
    })

    test('Association', async function(){

        expect(Musician.belongsTo(Band)).toBeTruthy
    })

    test('Find all Bands', async function(){
        const BSB = await Band.create({name:'Backstreet Boys', genre: 'Rock'});
        find = Band.findAll();
        expect(BSB instanceof Band).toBeTruthy

    })

    test('Can add songs to band', async function(){
        const Beetles = await Band.create({name:'Beetles', genre: 'Rock'});
        //create musicians
        const ringo = await Musician.create({name:'Ringo', instrument:'Drums'});
        const paul = await Musician.create({name:'Paul', instrument:'Bass Guitar'});
        const john = await Musician.create({name:'John', instrument:'Guitar'});
        //add them to the band
        await Beetles.addMusician(ringo)
        await Beetles.addMusician(paul)
        await Beetles.addMusician(john)
        //create 2 songs
        const jude = await Song.create({title: 'Hey Jude', year: 1968});
        const life = await Song.create({title: 'In My Life', year: 1965})
        //add songs
        await Beetles.addSong(jude)
        await Beetles.addSong(life)

        const songs = await Beetles.getSongs();
        const musicians= await Beetles.getMusicians()

        expect(songs.length).toBe(2)
    })

    test('Eager Load Musician', async function(){
        const Beetles = await Band.create({name:'Beetles', genre: 'Rock'});
        //create musicians
        const ringo = await Musician.create({name:'Ringo', instrument:'Drums'});
        const paul = await Musician.create({name:'Paul', instrument:'Bass Guitar'});
        const john = await Musician.create({name:'John', instrument:'Guitar'});
        //add them to the band
        await Beetles.addMusician(ringo)
        await Beetles.addMusician(paul)
        await Beetles.addMusician(john)

       const musicians = await Band.findAll({
           include: [{model: Musician}]
       })
    })

    test('Eager Load Song', async function(){
        const Beetles = await Band.create({name:'Beetles', genre: 'Rock'});
        //create musicians
        const ringo = await Musician.create({name:'Ringo', instrument:'Drums'});
        const paul = await Musician.create({name:'Paul', instrument:'Bass Guitar'});
        const john = await Musician.create({name:'John', instrument:'Guitar'});
        //add them to the band
        await Beetles.addMusician(ringo)
        await Beetles.addMusician(paul)
        await Beetles.addMusician(john)
        //create 2 songs
        const jude = await Song.create({title: 'Hey Jude', year: 1968});
        const life = await Song.create({title: 'In My Life', year: 1965})
        //add songs
        await Beetles.addSong(jude)
        await Beetles.addSong(life)

        const songs = await Beetles.getSongs();
        const musicians= await Beetles.getMusicians()

// eager load
        const songsTitles = await Band.findAll({
            include: [{model: Song}]
        })
    })
})