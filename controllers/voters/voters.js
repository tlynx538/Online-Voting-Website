const db = require('../../knex/knex');
var area_code_local;
const getSignUp = async(req,res) => {
    const area_details = await retrieveAllAreaCodes();
    res.render('../views/voters/sign_up',{area:area_details});
}
const postSignUp = async(req,res) => {
    try 
    {
        const results = await db('voter').insert({
            voter_fname: req.body.voter_fname,
            voter_lname: req.body.voter_lname,
            voter_age: req.body.voter_age,
            voter_address: req.body.voter_address,
            voter_area_code_id: req.body.voter_area_code_id,
            voter_phone:  req.body.voter_phone,
            voter_sex: req.body.voter_sex,
            has_voted : false 
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
const getVote = async(req,res) => {
    // retrieve candidate id [v]
    console.log(req.params.candidate_id);
    console.log(req.session.user);
    // add vote to voting record [v]
    // needs try/catch
    const results = await db('voting_record').insert({
        time_of_vote: new Date(),
        voter_id : req.session.user,
        candidate_id : req.params.candidate_id
    }).returning('*');
    // update has_voted in voter
    const result2 = await db('voter').where({voter_id: req.session.user}).update({has_voted: true});
    console.log(result2);
    // redirect to already voted page or error.pug 
    res.render('../views/voters/error.pug');
}
const signIn = async(req,res) => {
    console.log(req.body);
    const userDetails = await retrieveVoterDetails();
    const candidateDetails = await retrieveAllCandidates();
    for(var element in userDetails)
    {
        if(userDetails[element].voter_username == req.body.voterUserName)
        {
            if(userDetails[element].voter_password == req.body.voterPassword)
            {
                req.session.user = userDetails[element].voter_id;
                area_code_local = await retrieveAreaCodebyId(userDetails[element].voter_area_code_id);
                if(await hasVoted(req.session.user))
                    res.render('../views/voters/error.pug');
                else 
                {
                    console.log("candidate details: ");
                    console.log(candidateDetails);
                    res.render('../views/voters/voting_page',{area_code_name: area_code_local, candidate_details: candidateDetails});
                }
            }
            else 
            {
                res.status(403).render('../views/index.pug',{errors: "Username or Password seems to be incorrect, please check once."});
            }
        }
        else 
            res.render('../views/index.pug');
    }
}

const logout = (req,res) => {
    req.session.destroy((err)=>{
        if(err)
        {
          console.log(err);
        }
        else 
        {           
          res.redirect('/');
        }
      });
}

module.exports = {getSignUp,signIn, postSignUp,getVote,logout};

const retrieveAreaCodebyId = async(area_code_id) => {
    const area_code = await db('area_codes').select('area_code_id','area_code_name').where('area_code_id',area_code_id);
    return area_code[0].area_code_name;
}
const retrieveAllAreaCodes = async() => {
    const area_code_details = await db('area_codes').select('area_code_id','area_code_name');
    return area_code_details[0].area_code_name;
}

const retrieveVoterDetails = async() => {
    const userDetails = await db('voter').select('voter_id','voter_username','voter_password','voter_fname','voter_lname','voter_area_code_id');
    return userDetails;
}

const retrieveAllCandidates = async() => {
    const candidates = await db('candidate').join('party','candidate.candidate_party_id','=','party.party_id').select('candidate.candidate_id','candidate.candidate_fname','candidate.candidate_lname','party.party_name').where('allow_vote',true);
    return candidates;
}


const hasVoted = async(voter_id) => {
    const voting_details = await db('voter').select('voter_id','has_voted').where('voter_id',voter_id);
    if(voting_details[0].has_voted == false)
        return false; 
    else 
        return true;
}