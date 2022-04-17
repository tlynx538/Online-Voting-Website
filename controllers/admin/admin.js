const db = require('../../knex/knex')
const homePage = (req,res) => {
    res.render('../views/admin/home');
}
const seed = async (req,res) => {
    try 
    {
        for(var i=1;i<10;i++)
        {
            area_code_name_var = String.fromCharCode(i+64) + String.fromCharCode(i+64) + i.toString() + i.toString(); //AA11 -> II99
            await db('area_codes').insert({ area_code_id: i, area_code_name: area_code_name_var});
            console.log("inserting " + i +' '+area_code_name_var);
        }

        res.send("Data has been seeded")

    }
    catch(err)
    {
        res.send("An error has occured:" + err);
    }
}
module.exports = {homePage,seed};