const db = require('../../knex/knex');
const bcrypt = require('bcrypt');
const salt = bcrypt.genSaltSync(13);


const getSignUp = async (req,res) => {
    const party_details = await retrieveAllPartyNames();
    const area_details = await retrieveAllAreaCodes();
    res.render('../views/candidates/sign_up',{party: party_details,area:area_details});
}

const postSignUp = async(req,res) => {  
    console.log("reached here");
    try 
    {
        console.log("inside try block");
        let hash = bcrypt.hashSync(req.body.pass_word,salt);
        console.log(hash);
        const results = await db('candidate').insert({
            candidate_fname: req.body.candidate_fname,
            candidate_lname: req.body.candidate_lname,
            candidate_username: req.body.user_name,
            candidate_password: hash,
            candidate_age: req.body.candidate_age,
            candidate_party_id: req.body.candidate_party_id,
            candidate_address: req.body.candidate_address,
            candidate_area_code_id: req.body.candidate_area_code_id,
            candidate_phone:  req.body.candidate_phone,
            candidate_sex: req.body.candidate_sex,
            is_eligible: true 
        }).returning("*");
        console.log(results);
        res.render('../views/index.pug',{message: "User Created Successfully"});
    }
    catch(err)
    {
        res.send("An error has occurred"+'\n'+err);
        console.log(err);
    }
}

const postSignIn = async(req,res) => {
    console.log(req.body);
    console.log("reached here 1");
    flag = true;
    const userDetails = await retrieveUserDetails();
    console.log(req.body.candidatePassword);
    for(var element in userDetails)
    {
        if(userDetails[element].candidate_username == req.body.candidateUserName)
        {
            let result = bcrypt.compareSync(req.body.candidatePassword,userDetails[element].candidate_password)
            console.log(result);
            if(bcrypt.compareSync(req.body.candidatePassword,userDetails[element].candidate_password))
            {
                console.log("reached here 2");
                flag = false;
                req.session.user = userDetails[element].candidate_id;
                res.render('../views/candidates/candidate_page',{candidate_fname:userDetails[element].candidate_fname,candidate_lname:userDetails[element].candidate_lname});
            }
        }
    }
    if(flag)
    {
            console.log("reached here 3");
            res.status(403).render('../views/index.pug',{errors: "Username or Password seems to be incorrect, please check once."});
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
module.exports = {getSignUp,postSignUp,postSignIn,logout};

const retrieveAllPartyNames = async (req,res) => {
    const party_details = await db('party').select('party_id','party_name');
    return party_details;
}

const retrieveAllAreaCodes = async(req,res) => {
    const area_code_details = await db('area_codes').select('area_code_id','area_code_name');
    return area_code_details;
}

const retrieveUserDetails = async(req,res) => {
    const userDetails = await db('candidate').select('candidate_id','candidate_username','candidate_password','candidate_fname','candidate_lname');
    return userDetails;
}