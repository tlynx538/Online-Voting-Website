const db = require('../../knex/knex');
var localSessionId;
const getSignUp = async (req,res) => {
    const party_details = await retrieveAllPartyNames();
    const area_details = await retrieveAllAreaCodes();
    res.render('../views/candidates/sign_up',{party: party_details,area:area_details});
}

const postSignUp = async(req,res) => {
    try 
    {
        const results = await db('candidate').insert({
            candidate_fname: req.body.candidate_fname,
            candidate_lname: req.body.candidate_lname,
            candidate_age: req.body.candidate_age,
            candidate_party_id: req.body.candidate_party_id,
            candidate_address: req.body.candidate_address,
            candidate_area_code_id: req.body.candidate_area_code_id,
            candidate_phone:  req.body.candidate_phone,
            candidate_sex: req.body.candidate_sex
        }).returning("*");
        console.log(results);
    }
    catch(err)
    {
        res.send("An error has occurred"+'\n'+err);
        console.log(err);
    }
    res.send("Data submitted successfully");
}

const postSignIn = async(req,res) => {
    console.log(req.body);
    const userDetails = await retrieveUserDetails();
    for(var element in userDetails)
    {
        if(userDetails[element].candidate_username == req.body.candidateUserName)
        {
            if(userDetails[element].candidate_password == req.body.candidatePassword)
            {
                res.render('../views/candidates/candidate_page',{candidate_fname:userDetails[element].candidate_fname,candidate_lname:userDetails[element].candidate_lname});
            }
            else 
            {
                res.render('../views/index.pug');
            }
        }
        else 
            res.render('../views/index.pug');
    }
}

module.exports = {getSignUp,postSignUp,postSignIn};


const retrieveAllPartyNames = async (req,res) => {
    const party_details = await db('party').select('party_id','party_name');
    return party_details;
}

const retrieveAllAreaCodes = async(req,res) => {
    const area_code_details = await db('area_codes').select('area_code_id','area_code_name');
    return area_code_details;
}

const retrieveUserDetails = async(req,res) => {
    const userDetails = await db('candidate').select('candidate_username','candidate_password','candidate_fname','candidate_lname');
    return userDetails;
}